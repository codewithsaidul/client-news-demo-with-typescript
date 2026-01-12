import { Draft } from "@/models/news.draft.models";
import { connectDB } from "@/utils/connectDB";
import { verifyRoles } from "@/utils/verifyRoles";
import { revalidatePath, revalidateTag } from "next/cache";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const auth = verifyRoles(req, ["superadmin", "editor"]);
    if (auth) return auth;

    // get news data from client side
    const data = await req.json();

    // connected with mongodb database
    await connectDB();

    const draftData = {
      ...data,
      status: "unpublished",
    };

    // insert news data on db
    const result = await Draft.insertOne(draftData);

    if (result) {
      revalidateTag("draft-list", "default");
      revalidatePath("/");

      // --- রি-ভ্যালিডেশন লজিক এখানেই শুরু ---

      // ধাপ ২: সফলভাবে সেভ হওয়ার পর, রি-ভ্যালিডেশন ট্রিগার করুন
      if (result) {
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
      }
      // --- রি-ভ্যালিডেশন লজিক এখানেই শেষ ---

      return NextResponse.json(
        { acknowledged: true, data: result },
        { status: 200 }
      ); // ✅ send full data
    } else {
      return NextResponse.json(
        { acknowledged: false, data: null },
        { status: 500 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
