import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async () => {
  const cookieStore = await cookies();
  cookieStore.set("token", "", {
    httpOnly: true, // It's good practice to be explicit with httpOnly
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0, // Setting maxAge to 0 effectively deletes the cookie
  });

  return NextResponse.json({ message: "Logged out" }, { status: 200 });
};
