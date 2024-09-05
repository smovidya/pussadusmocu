import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { StudentDtoSchema } from "../models/auth.model";
import { getUser } from "../services/auth.service";

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
});
