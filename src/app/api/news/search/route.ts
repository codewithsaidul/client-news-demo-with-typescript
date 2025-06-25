import { News } from "@/models/news.models";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const search = url.searchParams.get("s") || "none";
    const limit = 10;
    const skip = (page - 1) * limit;

    const query: { [key: string]: unknown} = {};

    if (search !== "none") {
      query.title = { $regex: search, $options: "i" }; // case-insensitive search on title
    }

    // connecting with mongodb
    await connectDB();
    const result = await News.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);

    const total = await News.countDocuments(query);

    return NextResponse.json(
      {
        data: result,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
