import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./verifyToken";

export const verifyRoles = (req: NextRequest, allowedRoles: string[]) => {
  const cookieToken = req.cookies.get("token")?.value;

  if (!cookieToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const result = verifyToken(cookieToken);

  if (!result.valid) {
    return NextResponse.json({ message: "Invalid Token" }, { status: 403 });
  }



  if (result.valid && result.decoded && typeof result.decoded !== "string") {
    const role = result.decoded.role as string | undefined;

    if (!role || !allowedRoles.includes(role)) {
      return NextResponse.json(
        { message: `Forbidden: Only [${allowedRoles.join(", ")}] allowed` },
        { status: 403 }
      );
    }
  }

  return null; // null means token is valid
};
