import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { decrypt } from "./utils/function";
import { type UserData } from "./utils/constant";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("student_id")?.value;
  const encryptionCookie = decrypt(cookie ?? "") as unknown as UserData;
  console.log(encryptionCookie);
  if (encryptionCookie || process.env.NODE_ENV === "development") {
    // return NextResponse.rewrite(request.url);
    return NextResponse.json(encryptionCookie);
  }

  return NextResponse.rewrite("https://pussadusmocu.vercel.app/login");
}

export const config = {
  matcher: ["/users/:path*", "/admin/:path*"],
};
