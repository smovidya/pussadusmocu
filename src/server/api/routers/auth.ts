import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
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
