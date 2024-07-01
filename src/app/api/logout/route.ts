import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  const cookieStore = cookies();

  cookieStore.delete("student_id");

  return NextResponse.redirect(
    "https://account.it.chula.ac.th/html/logout?serviceName=PUSSADU-SUCU&service=https://pussadusmocu.vercel.app/login",
  );
}
