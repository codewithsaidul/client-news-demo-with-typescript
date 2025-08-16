import { Newsletter } from "@/models/newsletter.modals";
import "@/models/users.models";
import { connectDB } from "@/utils/connectDB";
import { verifyRoles } from "@/utils/verifyRoles";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const auth = verifyRoles(req, ["superadmin", "editor"]);
    if (auth) return auth;

    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page") || "1");
    const limit = Number(url.searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;


    console.log({ page, limit, skip })

    // connecting with mongodb
    await connectDB();

    const result = await Newsletter.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const publishedCount = await Newsletter.countDocuments();

    return NextResponse.json(
      {
        data: result,
        pagination: {
          total: publishedCount,
          page,
          limit,
          published: publishedCount,
          totalPages: Math.ceil(publishedCount / limit),
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      {
        status: 500,
      }
    );
  }
};
