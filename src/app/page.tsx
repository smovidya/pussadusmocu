import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const encryptedCookie = getCookie("student_id", { cookies });
  if (encryptedCookie) {
    redirect("/users/home");
  }

  redirect("/login");
}
