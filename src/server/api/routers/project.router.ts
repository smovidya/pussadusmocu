import {
  adminOnlyProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  getAllInProgressProject,
  getProjectByStudentId,
  registerProject,
} from "../services/project.service";
import { Owner } from "@prisma/client";

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
   * Set the status of a project.
   */
  setProjectStatus: adminOnlyProcedure
    .input(
      z.object({
        projectId: z.string(),
        status: z.enum(["NOTSTART", "INPROGRESS", "COMPLETE", "EVALUATE"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { projectId, status } = input;

      // Validate project ID and status
      if (!projectId || !status) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Project ID and status are required",
        });
      }

      // Update the project status in the database
      try {
        const updatedProject = await ctx.db.project.update({
          where: { project_id: projectId },
          data: { status },
        });
        return updatedProject;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update project status",
          cause: error,
        });
      }
    }),

  /**
   * Set the published status of a project.
   */
  setProjectPublished: adminOnlyProcedure
    .input(
      z.object({
        projectId: z.string(),
        isPublished: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { projectId, isPublished } = input;
      // Validate project ID and published status
      if (!projectId || typeof isPublished !== "boolean") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Project ID and published status are required",
        });
      }
      // Update the project published status in the database
      try {
        const updatedProject = await ctx.db.project.update({
          where: { project_id: projectId },
          data: { published: isPublished },
        });
        return updatedProject;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update project published status",
          cause: error,
        });
      }
    }),

  getAllProjects: adminOnlyProcedure.query(async ({ ctx }) => {
    try {
      // Fetch all projects from the database
      const projects = await ctx.db.project.findMany({
        include: {
          parcels: true,
          students: true,
        },
      });
      return projects;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch all projects",
        cause: error,
      });
    }
  }),

  setProjectOwner: adminOnlyProcedure
    .input(
      z.object({
        projectId: z.string(),
        owner: z.enum(Object.values(Owner) as [string, ...string[]]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { projectId, owner } = input;
      // Validate project ID and owner ID
      if (!projectId || !owner) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Project ID and owner ID are required",
        });
      }
      // Update the project owner in the database
      try {
        const updatedProject = await ctx.db.project.update({
          where: { project_id: projectId },
          data: {
            owner: owner as Owner,
          },
        });
        return updatedProject;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update project owner",
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
