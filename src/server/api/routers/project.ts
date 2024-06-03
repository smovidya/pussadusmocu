import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
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
  getProjectByStudent: publicProcedure
    .input(
      z.object({
        student_id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
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
