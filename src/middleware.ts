import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { decrypt } from "./utils/function";
import { encryptionKey } from "./utils/constant";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("student_id");
  const decrypt_cookie = decrypt(cookie?.value ?? "", encryptionKey);

  // if (
  //   (decrypt_cookie.length === 10 && decrypt_cookie.endsWith("23")) ||
  //   process.env.NODE_ENV === "development"
  // ) {
  //   return NextResponse.rewrite(request.url);
  // }

  // return NextResponse.rewrite("https://pussadusmocu.vercel.app/login");
  return NextResponse.json(decrypt_cookie);
}

export const config = {
  matcher: ["/users/:path*", "/admin/:path*"],
};
