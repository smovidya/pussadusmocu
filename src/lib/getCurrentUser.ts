import { type Student } from "@prisma/client";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { decrypt } from "~/lib/function";
import { api } from "~/trpc/server";

/**
 * Server-side utility to get the current user from encrypted cookie
 * @returns Promise<Student | null> - The current student or null if not found
 */
export async function getCurrentUser(): Promise<Student | null> {
  try {
    const encryptedCookie = getCookie("student_id", { cookies }) ?? "";

    const student_id = await decrypt(encryptedCookie);
    console.log({
      student_id,
      encryptedCookie,
    });
    if (!student_id) {
      return null;
    }

    const student =
      process.env.NODE_ENV === "development"
        ? await api.auth.getUser({
            student_id: student_id as string,
          })
        : (student_id as Student);

    return student;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}
