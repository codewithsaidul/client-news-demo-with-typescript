import { News } from "@/models/news.models";
import { TDeleteUserContext } from "@/types/server";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: TDeleteUserContext) => {
  try {


     const { slug } = await params

    // connected with mongodb database
    await connectDB();
    const query = { slug: slug}

    // insert news data on db
    const result = await News.findOne(query);

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
