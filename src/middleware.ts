import { type Student } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import { decrypt } from "./lib/function";

export async function middleware(request: NextRequest) {
  return NextResponse.rewrite("https://pussadu.vidyachula.org");

  // try {
  //   const cookie = request.cookies.get("student_id")?.value;

  //   if (process.env.NODE_ENV === "development") {
  //     return NextResponse.rewrite(request.url);
  //   }

  //   if (!cookie) {
  //     console.log("No cookie found");
  //     return NextResponse.rewrite("https://pussadusmocu.vercel.app/login");
  //   }

  //   const decryptedCookie = await decrypt(cookie);
  //   if (!decryptedCookie) {
  //     console.log("Decryption failed or invalid cookie");
  //     return Response.redirect(new URL("/login", request.url));
  //   }

  //   const student = decryptedCookie as Student;

  //   if (
  //     student.student_id.length !== 10 ||
  //     !student.student_id.endsWith("23")
  //   ) {
  //     console.log(`Invalid OUID: ${student.student_id}`);
  //     return Response.redirect(new URL("/login", request.url));
  //   }

  //   if (!student.isAdmin && request.nextUrl.pathname.startsWith("/admin")) {
  //     return Response.redirect(new URL("/users/home", request.url));
  //   }

  //   return NextResponse.rewrite(request.url);
  // } catch (error) {
  //   if (error instanceof Error) {
  //     console.log(`Middleware error: ${error.message}`);
  //   } else {
  //     console.log("Middleware error");
  //   }
  //   return Response.redirect(new URL("/404", request.url));
  // }
}

export const config = {
  matcher: ["/users/:path*", "/admin/:path*", "/api/trpc/:path*"],
};
