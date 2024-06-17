import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.has("student_id");
  if (cookie || process.env.NODE_ENV === "development") {
    return NextResponse.rewrite(request.url);
  }

  return NextResponse.rewrite("https://pussadusmocu.vercel.app/login");
}

export const config = {
  matcher: ["/users/:path*", "/admin/:path*"],
};
