import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.has("student_id");
  console.log("COOKIE", cookie);
  if (!cookie) {
    return NextResponse.redirect("/login");
  }

  return NextResponse.json(cookie);
}

export const config = {
  matcher: "/users/cart",
};
