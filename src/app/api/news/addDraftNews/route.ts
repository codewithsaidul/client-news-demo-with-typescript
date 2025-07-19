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
      status: "unpublished"
    }

    // insert news data on db
    const result = await Draft.insertOne(draftData);


    if (result) {
      revalidateTag("draft-list");
      revalidatePath("/");
      return NextResponse.json({ acknowledged: true, data: result }, { status: 200 }); // ✅ send full data
    } else {
      return NextResponse.json({ acknowledged: false, data: null }, { status: 500 });
    }
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
