import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.has("student_id");
  if (!cookie) {
    return NextResponse.rewrite("/login");
  }

  return NextResponse.rewrite(request.url);
}

export const config = {
  matcher: "/users/:path*",
};
