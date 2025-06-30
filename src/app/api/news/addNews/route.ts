import { News } from "@/models/news.models";
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

    // insert news data on db
    const result = await News.insertOne(data);

    if (result.acknowledged) {
      revalidateTag("news-list");
      revalidatePath("/");
      return NextResponse.json({ acknowledged: true, data }, { status: 200 }); // ✅ send full data
    } else {
      return NextResponse.json({ acknowledged: false }, { status: 500 });
    }
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
