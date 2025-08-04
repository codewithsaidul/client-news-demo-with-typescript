import { News } from "@/models/news.models";
import { connectDB } from "@/utils/connectDB";
import { verifyRoles } from "@/utils/verifyRoles";
import { NextRequest, NextResponse } from "next/server";

type TParams = Promise<{ id: string }>;


export const PATCH = async (
  req: NextRequest,
  { params }: { params: TParams }
) => {
  try {
    const auth = verifyRoles(req, ["superadmin", "editor"]);
    if (auth) return auth;

    // get news data from client side
    const updateData = await req.json();

    const { id } = await params;

    // connected with mongodb database
    await connectDB();

    const updateDoc = {
      $set: updateData,
    };

    // insert news data on db
    const result = await News.findByIdAndUpdate(id, updateDoc, {
      new: true,
      runValidators: true,
    });


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

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
