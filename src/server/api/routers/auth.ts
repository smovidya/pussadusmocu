import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
    .input(z.object({ student_id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.student.findFirst({
        where: {
          student_id: input.student_id,
        },
      });
    }),
});
