import {
  adminOnlyProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  deleteProject,
  getAllInProgressProject,
  getProjectByStudentId,
  registerProject,
  removeStudentFromProject,
} from "../services/project.service";
import { Owner } from "@prisma/client";
import { StudentSchema } from "../models/auth.model";
import { ProjectSchema } from "../models/project.model";

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
        orderBy: {
          createdAt: "desc",
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

  addProjectAndStudents: adminOnlyProcedure
    .input(
      z.object({
        users: z.array(StudentSchema),
        project: ProjectSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { users, project } = input;
      // check project ID
      const existingProject = await ctx.db.project.findUnique({
        where: { project_id: project.id },
      });
      if (existingProject) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "มีโปรเจคที่รหัสนี้อยู่แล้ว",
        });
      }
      // Create the project
      const newProject = await ctx.db.project.create({
        data: {
          title: project.name,
          status: project.status,
          owner: project.owner,
          published: project.published,
        },
      });

      const studentIds = await Promise.all(
        users.map((s) =>
          ctx.db.student.upsert({
            where: { student_id: s.student_id },
            update: {
              name: s.name,
              email: s.email,
              department: s.department,
              isAdmin: s.isAdmin,
              line_id: s.line_id,
            },
            create: {
              student_id: s.student_id,
              name: s.name,
              email: s.email ?? `${s.student_id}@student.chula.ac.th`,
              department: s.department,
              isAdmin: s.isAdmin,
              line_id: s.line_id ?? "",
            },
          }),
        ),
      );

      // Add students to the project
      await ctx.db.project_Student.createMany({
        data: studentIds.map((student) => ({
          project_id: newProject.project_id,
          student_id: student.student_id,
        })),
      });

      return {
        project: newProject,
        students: studentIds,
      };
    }),
  getProjectById: adminOnlyProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { projectId } = input;
      // Fetch the project by ID
      try {
        const project = await ctx.db.project.findUnique({
          where: { project_id: projectId },
          include: {
            parcels: true,
            students: true,
          },
        });
        if (!project) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Project not found",
          });
        }
        return project;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch project by ID",
          cause: error,
        });
      }
    }),
  getStudentsByProjectId: adminOnlyProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { projectId } = input;
      try {
        const students = await ctx.db.project_Student.findMany({
          where: { project_id: projectId },
          include: {
            student: true,
          },
        });
        return students;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch students by project ID",
          cause: error,
        });
      }
    }),
  addStudentToProject: adminOnlyProcedure
    .input(
      z.object({
        projectId: z.string(),
        student: StudentSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { projectId, student } = input;

      // Check if the project exists
      const project = await ctx.db.project.findUnique({
        where: { project_id: projectId },
      });
      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      // Upsert the student in the database
      const studentId = await ctx.db.student.upsert({
        where: { student_id: student.student_id },
        update: {
          name: student.name,
          email: student.email ?? `${student.student_id}@student.chula.ac.th`,
          department: student.department,
          isAdmin: student.isAdmin,
          line_id: student.line_id ?? "",
        },
        create: {
          student_id: student.student_id,
          name: student.name,
          email: student.email ?? `${student.student_id}@student.chula.ac.th`,
          department: student.department,
          isAdmin: student.isAdmin,
          line_id: student.line_id ?? "",
        },
      });

      // Add the student to the project
      try {
        const existingProjectStudent = await ctx.db.project_Student.findFirst({
          where: {
            project_id: projectId,
            student_id: studentId.student_id,
          },
        });
        if (existingProjectStudent) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Student is already added to this project",
          });
        }
        const newProjectStudent = await ctx.db.project_Student.create({
          data: {
            project_id: projectId,
            student_id: studentId.student_id,
          },
        });

        return newProjectStudent;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add student to project",
          cause: error,
        });
      }
    }),
  removeProject: adminOnlyProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { projectId } = input;
      // Validate project ID
      if (!projectId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Project ID is required",
        });
      }
      // Delete the project from the database
      try {
        return await deleteProject(ctx, projectId);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to delete project: ${error.message}`,
          cause: error,
        });
      }
    }),
  removeStudentFromProject: adminOnlyProcedure
    .input(
      z.object({
        projectId: z.string(),
        studentId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { projectId, studentId } = input;
      // Validate project ID and student ID
      if (!projectId || !studentId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Project ID and student ID are required",
        });
      }
      // Remove the student from the project
      try {
        return await removeStudentFromProject(ctx, projectId, studentId);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to remove student from project",
          cause: error,
        });
      }
    }),
});
