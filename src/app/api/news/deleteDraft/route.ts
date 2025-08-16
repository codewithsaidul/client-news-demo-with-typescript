import { Draft } from "@/models/news.draft.models";
import { connectDB } from "@/utils/connectDB";
import { verifyRoles } from "@/utils/verifyRoles";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  try {
    const auth = verifyRoles(req, ["superadmin", "editor"]);
    if (auth) return auth;

    const { selectedIds } = await req.json();

    // connected with mongodb database
    await connectDB();
    // ================== Transaction Start ==================

    const permDelete = await Draft.find({ _id: { $in: selectedIds } });

    if (permDelete.length !== selectedIds.length) {
      throw new Error("One or more draft news items were not found.");
    }

    // ৪. মূল `Trash` কালেকশন থেকে নিউজগুলোকে ডিলিট করা
    await Draft.deleteMany({ _id: { $in: selectedIds } });

    return NextResponse.json(
      {
        success: true,
        message: `Drafted News has been deleted successfully.`,
        data: null,
      },
      { status: 200 }
    );
  } catch (error) {
    let errorMessage = "Something went wrong";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
};
