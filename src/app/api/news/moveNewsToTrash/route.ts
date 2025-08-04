import { News } from "@/models/news.models";
import { TrashNews } from "@/models/news.trash.models";
import { connectDB } from "@/utils/connectDB";
import { verifyRoles } from "@/utils/verifyRoles";
import mongoose from "mongoose";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await mongoose.startSession();
  try {
    const auth = verifyRoles(req, ["superadmin", "editor"]);
    if (auth) return auth;

    const { selectedIds } = await req.json();

    // connected with mongodb database
    await connectDB();
    // ================== Transaction Start ==================
    // ১. ট্রানজেকশন শুরু করুন
    await session.startTransaction();

    const newsToTrash = await News.find({ _id: { $in: selectedIds } }).session(
      session
    );

    if (newsToTrash.length !== selectedIds.length) {
      throw new Error("One or more news items were not found.");
    }

    // ২. ট্র্যাশ ডকুমেন্টের জন্য ডেটা প্রস্তুত করা (এখানে মূল পরিবর্তন)
    const trashedDocs = newsToTrash.map((doc) => {
      const docObject = doc.toObject();
      return {
        ...docObject,
        originalId: docObject._id, // মূল _id-কে originalId হিসেবে সেট করা
        _id: undefined, // Mongoose-কে একটি নতুন _id তৈরি করতে বলা
      };
    });

    // ৩. প্রস্তুত করা নিউজগুলোকে `Trash` কালেকশনে ইনসার্ট করা
    await TrashNews.insertMany(trashedDocs, { session });

    // ৪. মূল `News` কালেকশন থেকে নিউজগুলোকে ডিলিট করা
    await News.deleteMany({ _id: { $in: selectedIds } }).session(session);

    // ৫. ট্রানজেকশন কমিট করা
    await session.commitTransaction();

    revalidateTag("news-list");
    revalidatePath("/");

    // --- রি-ভ্যালিডেশন লজিক এখানেই শুরু ---

    // ধাপ ২: সফলভাবে সেভ হওয়ার পর, রি-ভ্যালিডেশন ট্রিগার করুন
    const domain = process.env.NEXT_PUBLIC_BASE_URL;

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
    // --- রি-ভ্যালিডেশন লজিক এখানেই শেষ ---

    return NextResponse.json(
      {
        success: true,
        message: `${selectedIds.length} news item's moved to trash successfully.`,
      },
      { status: 200 }
    );
  } catch (error) {
    // ৮. কোনো ইরোর হলে ট্রানজেকশন বাতিল করুন
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    let errorMessage = "Something went wrong";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  } finally {
    // ৯. সবশেষে সেশনটি বন্ধ করুন
    await session.endSession();
  }
};
