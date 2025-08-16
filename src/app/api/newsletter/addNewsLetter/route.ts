import { Newsletter } from "@/models/newsletter.modals";
import { connectDB } from "@/utils/connectDB";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // get news data from client side
    const data = await req.json();

    const isAlreadySubscribed = await Newsletter.findOne({ email: data.email })

    if (isAlreadySubscribed) {
      throw new Error("You're already subscribed")
    }

    // connected with mongodb database
    await connectDB();

    // insert newsletter data on db
    const result = await Newsletter.create(data);

    return NextResponse.json(
      { success: true, message: "Subscribed Successfull", data: result },
      { status: 200 }
    ); // ✅ send full data
  } catch (error) {
    let errorMessage = "Something went wrong";

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
};
