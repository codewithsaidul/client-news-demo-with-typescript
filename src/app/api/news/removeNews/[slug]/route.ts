import { News } from "@/models/news.models";
import { TDeleteUserContext } from "@/types/server";
import { connectDB } from "@/utils/connectDB";
import { verifyRoles } from "@/utils/verifyRoles";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }: TDeleteUserContext) => {
  try {
    const auth = verifyRoles(req, ["superadmin", "editor"]);
    if (auth) return auth;

    const { slug } = params;

    // connected with mongodb database
    await connectDB();
    const query = { slug: slug};

    // insert news data on db
    const result = await News.deleteOne(query);

    revalidateTag("news-list")
    revalidatePath("/")

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
