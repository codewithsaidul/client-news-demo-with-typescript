import { News } from "@/models/news.models";
import { TrashNews } from "@/models/news.trash.models";
import { connectDB } from "@/utils/connectDB";
import { verifyRoles } from "@/utils/verifyRoles";
import mongoose from "mongoose";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  // ১. সেশনটি try ব্লকের বাইরে শুরু করুন
  const session = await mongoose.startSession();

  try {
    const auth = verifyRoles(req, ["superadmin", "editor"]);
    if (auth) return auth;

    const { selectedIds } = await req.json();

    if (!selectedIds || selectedIds.length === 0) {
      throw new Error("No items selected for restoration.");
    }

    // ডাটাবেসের সাথে সংযোগ স্থাপন
    await connectDB();

    // ================== Transaction Start ==================
    // ২. ট্রানজেকশন শুরু করুন
    await session.startTransaction();

    // ৩. ট্র্যাশ কালেকশন থেকে আইডি দিয়ে নিউজগুলো খুঁজে বের করুন
    const newsToRestore = await TrashNews.find({
      _id: { $in: selectedIds },
    }).session(session);

    if (newsToRestore.length !== selectedIds.length) {
      throw new Error("One or more news items were not found in the trash.");
    }

    // ৪. মূল 'News' কালেকশনে ফিরিয়ে আনার জন্য ডেটা প্রস্তুত করুন
    const restoredDocs = newsToRestore.map((doc) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, originalId, ...rest } = doc.toObject();
      return {
        ...rest, // বাকি সব ডেটা অপরিবর্তিত থাকবে
        _id: originalId, // মূল আইডি-কে _id হিসেবে সেট করা হচ্ছে
      };
    });

    // ৫. প্রস্তুত করা নিউজগুলোকে মূল 'News' কালেকশনে ইনসার্ট করুন
    await News.insertMany(restoredDocs, { session });

    // ৬. সফলভাবে Restore করার পর 'TrashNews' কালেকশন থেকে নিউজগুলো ডিলিট করুন
    await TrashNews.deleteMany({
      _id: { $in: selectedIds },
    }).session(session);

    // ৭. ট্রানজেকশন কমিট করুন
    await session.commitTransaction();
    // ================== Transaction End ==================

    revalidateTag("news-list");
    revalidateTag("trash-news-list"); // ট্র্যাশ লিস্টও রিভ্যালিডেট করুন
    revalidatePath("/");

    return NextResponse.json(
      {
        success: true,
        message: `${restoredDocs.length} news item(s) restored successfully.`,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      // ৮. কোনো ইরোর হলে ট্রানজেকশন বাতিল করুন
      if (session.inTransaction()) {
        await session.abortTransaction();
      }

      console.error("Restore failed:", error);
      return NextResponse.json(
        { success: false, error: "Restore failed.", message: error.message },
        { status: 500 }
      );
    }
  } finally {
    // ৯. সবশেষে সেশনটি বন্ধ করুন
    await session.endSession();
  }
};
