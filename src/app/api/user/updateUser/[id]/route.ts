import User from "@/models/users.models";
import { connectDB } from "@/utils/connectDB";
import { verifyRoles } from "@/utils/verifyRoles";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";


type TParams = Promise<{ id: string }>;


export const PATCH = async (
  req: NextRequest,
  { params }: { params: TParams }
) => {
  try {
    const auth = verifyRoles(req, ["superadmin"]);
    if (auth) return auth;

    // get news data from client side
    const updateData = await req.json();

    const { id } = await  params;
    const query = { _id: new ObjectId(id) };

    // connected with mongodb database
    await connectDB();

    const updateDoc = {
      $set: updateData,
    };

    // iupdate user info on db
    const result = await User.updateOne(query, updateDoc);

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
