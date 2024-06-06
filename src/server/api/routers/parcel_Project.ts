import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { string, z } from "zod";
import { TRPCError } from "@trpc/server";
import { BORROWING_STATUS } from "@prisma/client";

export const Parcel_projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const parcels = await ctx.db.parcel_Project.findMany({
        include: {
          project: true,
          parcel: true,
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
  updatestatus: publicProcedure
    .input(
      z.object({
        project_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.$transaction(async (tx) => {
        console.log("inbackend");
        await tx.parcel_Project.updateMany({
          where: {
            project_id: input.project_id, // Use project_id directly
          },
          data: {
            status: BORROWING_STATUS.INUSE,
          },
        });
      });
    }),
});
