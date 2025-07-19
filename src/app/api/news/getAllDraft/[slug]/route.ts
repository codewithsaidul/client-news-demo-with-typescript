import { Draft } from "@/models/news.draft.models";
import { TDeleteUserContext } from "@/types/server";
import { connectDB } from "@/utils/connectDB";
import { verifyRoles } from "@/utils/verifyRoles";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: TDeleteUserContext) => {
  try {
    const auth = verifyRoles(req, ["superadmin", "editor"]);
    if (auth) return auth;

    const { slug } = await params;


    // connected with mongodb database
    await connectDB();
    const query = { slug: slug };

    // insert news data on db
    const result = await Draft.findOne(query);

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
