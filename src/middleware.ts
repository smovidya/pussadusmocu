import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { decrypt } from "./utils/function";
import { type UserData } from "./utils/constant";

export async function middleware(request: NextRequest) {
  try {
    const cookie = request.cookies.get("student_id")?.value;

    if (process.env.NODE_ENV === "development") {
      return NextResponse.rewrite(request.url);
    }

    if (!cookie) {
      console.log("No cookie found");
      return NextResponse.rewrite("https://pussadusmocu.vercel.app/login");
    }

    const decryptedCookie = await decrypt(cookie);
    if (!decryptedCookie) {
      console.log("Decryption failed or invalid cookie");
      return Response.redirect(new URL("/login", request.url));
    }

    const ouid = (decryptedCookie as unknown as UserData).ouid;

    if (ouid.length !== 10 || !ouid.endsWith("23")) {
      console.log(`Invalid OUID: ${ouid}`);
      return Response.redirect(new URL("/login", request.url));
    }
    
    return NextResponse.rewrite(request.url);
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Middleware error: ${error.message}`);
    } else {
      console.log("Middleware error");
    }
    return Response.redirect(new URL("/404", request.url));
  }
}

export const config = {
  matcher: ["/users/:path*", "/admin/:path*", "/api/trpc/:path*"],
};
