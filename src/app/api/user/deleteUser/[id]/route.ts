import User from "@/models/users.models";
import { ITokenPayload, TDeleteUserContext } from "@/types/server";
import { connectDB } from "@/utils/connectDB";
import { verifyRoles } from "@/utils/verifyRoles";
import { verifyToken } from "@/utils/verifyToken";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: TDeleteUserContext
) => {
  try {
    // ✅ Only superadmins can delete users
    const auth = verifyRoles(req, ["superadmin"]);
    if (auth) return auth;

    // ✅ Get token from cookies
    const cookieToken = req.cookies.get("token")?.value;

    if (!cookieToken) {
      return NextResponse.json(
        { message: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    // This part will be changed
    const tokenResult = verifyToken(cookieToken);

    if (!tokenResult.valid) {
      return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    }

    // FIX: Add a type guard to ensure the decoded token is a valid object
    if (
      typeof tokenResult.decoded !== "object" ||
      tokenResult.decoded === null
    ) {
      return NextResponse.json(
        { message: "Invalid token payload" },
        { status: 401 }
      );
    }

    // After the guard, TypeScript knows 'decoded' is an object.
    // We can now safely access the email property.
    const requesterEmail = (tokenResult.decoded as ITokenPayload).email;

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Please Provide a User Id" },
        { status: 400 }
      );
    }
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const query = { _id: new ObjectId(id) };

    // ✅ Connect to DB
    await connectDB();
    const user = await User.findOne(query);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // ✅ Prevent deleting self
    if (user.email === requesterEmail) {
      return NextResponse.json(
        { message: "You can't delete yourself" },
        { status: 400 }
      );
    }

    // ✅ Prevent deleting last superadmin
    if (user.role === "superadmin") {
      const superAdminCount = await User.countDocuments({ role: "superadmin" });
      if (superAdminCount <= 1) {
        return NextResponse.json(
          { message: "At least 1 Super Admin is required" },
          { status: 400 }
        );
      }
    }

    // ✅ Delete the user
    const result = User.deleteOne(query);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("User Delete Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
