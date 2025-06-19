import { redirect } from "next/navigation";
import { getCurrentUser } from "~/lib/getCurrentUser";

export default async function Home() {
  const student = await getCurrentUser();
  if (student) {
    redirect("/users/home");
  }

  redirect("/login");
}
