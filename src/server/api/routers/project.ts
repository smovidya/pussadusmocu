import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

/**
 * TRPC Router for handling project-related operations.
 */
export const projectRouter = createTRPCRouter({
  /**
   * Get all projects that are in progress.
   *
   * @returns {Promise<Object[]>} List of in-progress projects.
   * @throws {TRPCError} If there is an error fetching the projects.
   */
  getProject: publicProcedure.query(async ({ ctx }) => {
    try {
      const parcels = await ctx.db.project.findMany({
        where: {
          status: "INPROGRESS",
        },
      });
      return parcels;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch parcels",
        cause: error,
      });
    }
  }),

  /**
   * Get projects by student ID.
   *
   * @param {Object} input - Input object.
   * @param {string} input.student_id - The ID of the student to fetch projects for.
   * @returns {Promise<Object[]>} List of in-progress projects for the student.
   */
  getProjectByStudent: publicProcedure
    .input(
      z.object({
        student_id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const student = await ctx.db.student.findFirst({
        where: {
          student_id: input.student_id,
        },
      });
      if (student?.isAdmin) {
        return await ctx.db.project.findMany({
          where: {
            status: "INPROGRESS",
          },
        });
      }
      return await ctx.db.project.findMany({
        where: {
          students: {
            some: {
              student_id: input.student_id,
            },
          },
          status: "INPROGRESS",
        },
      });
    }),

  /**
   * Register a student to a project.
   *
   * @param {Object} input - Input object.
   * @param {string} input.student_id - The ID of the student to register.
   * @param {string} input.project_id - The ID of the project to register the student for.
   * @returns {Promise<Object>} The created project-student relationship.
   */
  registerProject: publicProcedure
    .input(
      z.object({
        student_id: z.string(),
        project_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await ctx.db.project_Student.create({
        data: {
          project_id: input.project_id,
          student_id: input.student_id,
        },
      });
    }),
});
