import { Newsletter } from "@/models/newsletter.modals";
import { connectDB } from "@/utils/connectDB";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // get news data from client side
    const data = await req.json();

    console.log(data)

    // connected with mongodb database
    await connectDB();

    // insert newsletter data on db
    const result = await Newsletter.create(data);

    if (result) {
      return NextResponse.json({ success: true, message: "Subscribed Successfull", data: result }, { status: 200 }); // ✅ send full data
    } else {
      return NextResponse.json({ success: false }, { status: 500 });
    }
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
