import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("student_id");
  if (!cookie?.value) {
    return NextResponse.redirect("/login");
  }

  return NextResponse.redirect(request.url);
}

export const config = {
  matcher: "/users/:path*",
};
