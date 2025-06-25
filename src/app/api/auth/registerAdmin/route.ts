import User from "@/models/users.models";
import { connectDB } from "@/utils/connectDB";
import { verifyRoles } from "@/utils/verifyRoles";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const auth = verifyRoles(req, ["superadmin"]);
    if (auth) return auth;

    const userInfo = await req.json();

    await connectDB();


    const user =  await User.create(userInfo);

    return NextResponse.json(
      { message: "User registered successfully", user },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("User creation failed:", error);

    // Checking email duplication
    if (error && typeof error === "object" && "code" in error) {
      if (error.code === 11000) {
        return NextResponse.json(
          { message: "Email already exists. Please use a different email." },
          { status: 409 }
        );
      }
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
};
