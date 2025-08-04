import { Draft } from "@/models/news.draft.models";
import { News } from "@/models/news.models";
import { connectDB } from "@/utils/connectDB";
import { verifyRoles } from "@/utils/verifyRoles";
import mongoose from "mongoose";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";


type TParams = Promise<{ id: string }>;

export const POST = async (
  req: NextRequest,
  { params }: { params: TParams }
) => {
  // ১. সেশনটি try ব্লকের বাইরে শুরু করুন
  const session = await mongoose.startSession();

  try {
    const auth = verifyRoles(req, ["superadmin", "editor"]);
    if (auth) return auth;

    const { id } = await params;
    const newsData = await req.json();

    // ডাটাবেসের সাথে সংযোগ স্থাপন
    await connectDB();

    // ================== Transaction Start ==================
    // ২. ট্রানজেকশন শুরু করুন
    await session.startTransaction();

    // ৩. ট্র্যাশ কালেকশন থেকে আইডি দিয়ে নিউজগুলো খুঁজে বের করুন
    const draftNews = await Draft.findById(id).session(session);

    if (!draftNews) {
      throw new Error("This draft news not found");
    }

    const updatedDoc = {
      ...newsData,
      status: "published",
    };

    // ৫. প্রস্তুত করা নিউজগুলোকে মূল 'News' কালেকশনে ইনসার্ট করুন
    const result = await News.insertOne(updatedDoc, { session });

    // ৬. সফলভাবে Restore করার পর 'TrashNews' কালেকশন থেকে নিউজগুলো ডিলিট করুন
    await Draft.findByIdAndDelete(id).session(session);

    // ৭. ট্রানজেকশন কমিট করুন
    await session.commitTransaction();
    // ================== Transaction End ==================

    revalidateTag("news-list");
    revalidateTag("draft-list"); // ট্র্যাশ লিস্টও রিভ্যালিডেট করুন
    revalidatePath("/");

     // --- রি-ভ্যালিডেশন লজিক এখানেই শুরু ---

      // ধাপ ২: সফলভাবে সেভ হওয়ার পর, রি-ভ্যালিডেশন ট্রিগার করুন
      if (result) {
        const domain = process.env.NEXT_BASE_URL

        const revalidationUrl = `${domain}/api/revalidate`;
        const secret = process.env.REVALIDATION_TOKEN;

        // রি-ভ্যালিডেট করার জন্য fetch রিকোয়েস্ট
        const revalidationResponse = await fetch(revalidationUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-vercel-reval-secret": secret || "",
          },
          body: JSON.stringify({
            path: "/", // হোমপেজ রি-ভ্যালিডেট করুন
            // আপনি চাইলে আরও পাথ যোগ করতে পারেন, যেমন: '/news'
          }),
        });

        if (!revalidationResponse.ok) {
          const errorData = await revalidationResponse.json();
          console.error("Failed to revalidate path:", errorData);
        } else {
          const successData = await revalidationResponse.json();
          console.log("Path revalidated successfully:", successData);
        }
      }
      // --- রি-ভ্যালিডেশন লজিক এখানেই শেষ ---

    return NextResponse.json(
      {
        success: true,
        message: `News has been added successfully`,
        data: result,
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
