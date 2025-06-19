import { decrypt } from "~/lib/function";
import { publicProcedure } from "./trpc";
import { api } from "~/trpc/server";
import { Student } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const adminOnlyProcedure = publicProcedure.use(async (opts) => {
  const encryptedCookie = opts.ctx.request.cookies.get("student_id")?.value;
  const student_id_from_cookie = await decrypt(encryptedCookie ?? "");
  const student =
    process.env.NODE_ENV === "development"
      ? await api.auth.getUser({
          student_id: student_id_from_cookie as string,
        })
      : (student_id_from_cookie as Student);

  if (!student?.isAdmin) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "not admin",
    });
  }

  return opts.next({});
});
