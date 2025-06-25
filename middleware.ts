// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// export function middleware(req) {
//   const token = req.cookies.get("token")?.value;

//   // Allow public routes without token
//   if (
//     req.nextUrl.pathname.startsWith("/login") ||
//     req.nextUrl.pathname.startsWith("/api/auth") ||
//     req.nextUrl.pathname === "/"
//   ) {
//     return NextResponse.next();
//   }

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   try {
//     jwt.verify(token, process.env.JWT_SECRET);
//     return NextResponse.next();
//   } catch {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }


console.log("Middleware file loaded");

export function middleware(req: any) {
  console.log("Middleware triggered for:", req.nextUrl.pathname);
  return new Response("Middleware is running!");
}

