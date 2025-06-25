import User from "@/models/users.models";
import { connectDB } from "@/utils/connectDB";
import { verifyRoles } from "@/utils/verifyRoles";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const auth = verifyRoles(req, ["superadmin"]);
    if (auth) return auth;

    await connectDB();
    const user = await User.find({}, { projection: { _id: 1, name: 1, email: 1, role: 1, createdAt: 1 } })

    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (err) {
    console.error("Registration error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
};
