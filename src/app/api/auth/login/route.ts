import User from "@/models/users.models";
import { connectDB } from "@/utils/connectDB";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET; // Add this in your .env.local

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    await connectDB();
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 401,
      });
    }

    console.log(typeof user.password)

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return new Response(JSON.stringify({ message: "Invalid password" }), {
        status: 401,
      });
    }

    // Add this check at the very beginning
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined in the environment variables.");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Set cookie using `next/headers`
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return new Response(JSON.stringify({ message: "Login successful" }), {
      status: 200,
    });
  } catch (err) {
    console.error("Registration error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
};
