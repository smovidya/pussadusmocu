import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  getAllInProgressProject,
  getProjectByStudentId,
  registerProject,
} from "../services/project.service";

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
      return getAllInProgressProject(ctx);
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
      return getProjectByStudentId(ctx, input.student_id);
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
      return registerProject(ctx, input.student_id, input.project_id);
    }),
});
