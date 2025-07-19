import { News } from "@/models/news.models";
import { TDeleteUserContext } from "@/types/server";
import { connectDB } from "@/utils/connectDB";
import { verifyRoles } from "@/utils/verifyRoles";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: TDeleteUserContext) => {
  try {
    const auth = verifyRoles(req, ["superadmin", "editor"]);
    if (auth) return auth;

    // get news data from client side
    const updateData = await req.json();

    const { id } = await params;



    // connected with mongodb database
    await connectDB();


    const updateDoc = {
      $set: updateData
    };




    // insert news data on db
    const result = await News.findByIdAndUpdate(id, updateDoc, {
      new: true,
      runValidators: true
    });

    return NextResponse.json({ success: true, data: result}, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
