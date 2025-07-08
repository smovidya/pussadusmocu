import {
  adminOnlyProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { StudentDtoSchema } from "../models/auth.model";
import { getUser } from "../services/auth.service";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { Department } from "@prisma/client";

/**
 * TRPC Router for handling authentication-related operations.
 */
export const authRouter = createTRPCRouter({
  /**
   * Get user information based on student ID.
   *
   * @param {Object} input - Input object.
   * @param {string} input.student_id - The student ID to search for.
   * @returns {Promise<Object|null>} The student information if found, otherwise null.
   */
  getUser: publicProcedure
    .input(StudentDtoSchema)
    .query(async ({ ctx, input }) => {
      return getUser(ctx, input);
    }),

  addUser: adminOnlyProcedure
    .input(
      z.object({
        student_id: z.string(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        department: z
          .enum(Object.values(Department) as [string, ...string[]])
          .optional(),
        isAdmin: z.boolean().optional(),
        line_id: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { student_id, name, department, email, isAdmin, line_id } = input;

      const existingUser = await ctx.db.student.findUnique({
        where: { student_id },
      });
      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `User with student_id ${student_id} already exists.`,
        });
      }
      const newUser = await ctx.db.student.create({
        data: {
          student_id,
          name,
          email: email ?? "",
          department: (department ?? "SMO") as Department,
          isAdmin: isAdmin ?? false,
          line_id: line_id ?? "",
        },
      });
      return newUser;
    }),
});
