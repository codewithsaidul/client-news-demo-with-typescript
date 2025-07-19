import { Draft } from "@/models/news.draft.models";
import { ParamsServer } from "@/types/server";
import { connectDB } from "@/utils/connectDB";
import { verifyRoles } from "@/utils/verifyRoles";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const auth = verifyRoles(req, ["superadmin", "editor"]);
    if (auth) return auth;

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const authorEmail = url.searchParams.get("authorEmail") || "none";
    const limit = 20;
    const skip = (page - 1) * limit;

    const query: ParamsServer = {};

    // with author email
    if (authorEmail !== "none") {
      query["author.email"] = authorEmail;
    }

    // connecting with mongodb
    await connectDB();

    const result = await Draft.find(query)
      .populate("author")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Draft.countDocuments(query);

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
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      {
        status: 500,
      }
    );
  }
};
