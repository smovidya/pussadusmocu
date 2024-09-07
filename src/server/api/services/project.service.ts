import { Status } from "@prisma/client";
import { type Ctx } from "../models/database.model";

/**
 * Fetches all projects with a status of "IN PROGRESS".
 *
 * @param {Ctx} ctx - The context containing the Prisma database client.
 */
export const getAllInProgressProject = async (ctx: Ctx) => {
  return await ctx.db.project.findMany({
    where: {
      status: Status.INPROGRESS,
    },
  });
};

/**
 * Fetches projects associated with a specific student. If the student is an admin, returns all projects in progress.
 *
 * @param {Ctx} ctx - The context containing the Prisma database client.
 * @param {string} student_id - The ID of the student.
 */
export const getProjectByStudentId = async (ctx: Ctx, student_id: string) => {
  const student = await ctx.db.student.findFirst({
    where: {
      student_id: student_id,
    },
  });
  if (student?.isAdmin) {
    return await ctx.db.project.findMany({
      where: {
        status: Status.INPROGRESS,
      },
    });
  }
  return await ctx.db.project.findMany({
    where: {
      students: {
        some: {
          student_id: student_id,
        },
      },
      status: Status.INPROGRESS,
    },
  });
};

/**
 * Registers a student for a project by creating an entry in the project_Student table.
 *
 * @param {Ctx} ctx - The context containing the Prisma database client.
 * @param {string} student_id - The ID of the student to register.
 * @param {string} project_id - The ID of the project to register the student for.
 */
export const registerProject = async (
  ctx: Ctx,
  student_id: string,
  project_id: string,
) => {
  return await ctx.db.project_Student.create({
    data: {
      student_id: student_id,
      project_id: project_id,
    },
  });
};
