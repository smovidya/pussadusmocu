import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  getProject: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.project.findMany();
  }),
});
