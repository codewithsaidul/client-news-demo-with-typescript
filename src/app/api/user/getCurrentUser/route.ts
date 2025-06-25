import User from "@/models/users.models";
import { ITokenPayload } from "@/types/server";
import { connectDB } from "@/utils/connectDB";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const cookieToken = req.cookies.get("token")?.value;

  if (!cookieToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const tokenResult = verifyToken(cookieToken);

  if (!tokenResult.valid) {
    return NextResponse.json({ message: "Invalid Token" }, { status: 403 });
  }

  await connectDB();

  const projection: { [key: string]: number} = {
  _id: 1,
  name: 1,
  email: 1,
  role: 1,
  updatedAt: 1,
};

// projection object থেকে string বানাও
const fields = Object.keys(projection)
  .filter((key) => projection[key]) // যেগুলা 1 সেট করা
  .join(" "); // "name email role"

  const result = await User.findOne(
      { email: { $eq: (tokenResult.decoded as ITokenPayload).email } },
    ).select(fields);

  return NextResponse.json(result, { status: 200 });
};
