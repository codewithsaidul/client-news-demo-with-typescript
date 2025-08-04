import { Draft } from "@/models/news.draft.models";
import { connectDB } from "@/utils/connectDB";
import { verifyRoles } from "@/utils/verifyRoles";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  try {
    const auth = verifyRoles(req, ["superadmin", "editor"]);
    if (auth) return auth;

    const { selectedIds } = await req.json();

    // connected with mongodb database
    await connectDB();
    // ================== Transaction Start ==================

    const permDelete = await Draft.find({ _id: { $in: selectedIds } });

    if (permDelete.length !== selectedIds.length) {
      throw new Error("One or more draft news items were not found.");
    }

    // ৪. মূল `Trash` কালেকশন থেকে নিউজগুলোকে ডিলিট করা
    await Draft.deleteMany({ _id: { $in: selectedIds } });

    revalidateTag("draft-list");
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
        message: `Drafted News has been deleted successfully.`,
        data: null,
      },
      { status: 200 }
    );
  } catch (error) {
    let errorMessage = "Something went wrong";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
};
