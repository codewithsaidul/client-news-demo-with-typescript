import { News } from "@/models/news.models";
import "@/models/users.models";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

type TParams = Promise<{ slug: string }>;

export async function GET(req: NextRequest, { params }: { params: TParams }) {
  try {
    const { slug } = await params;

    // connected with mongodb database
    await connectDB();
    const query = { slug: slug };

    // insert news data on db
    const result = await News.findOne(query).populate("author");

    // const user = await User.findById(result.author);

    // console.log(user)

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
