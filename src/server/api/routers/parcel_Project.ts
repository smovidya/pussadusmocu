import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
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
        await tx.parcel_Project.updateMany({
          where: {
            project_id: input.project_id, // Use project_id directly
            status: BORROWING_STATUS.BORROWING,
          },
          data: {
            status: BORROWING_STATUS.INUSE,
          },
        });
      });
    }),
  updateChecking: publicProcedure
    .input(
      z.object({
        parcel_project_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await ctx.db.parcel_Project.update({
        where: {
          id: input.parcel_project_id,
        },
        data: {
          status: BORROWING_STATUS.BORROWING,
        },
      });
    }),

  rejectBooking: publicProcedure
    .input(
      z.object({
        parcel_project_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await ctx.db.$transaction(async (tx) => {
        const parcel = await tx.parcel_Project.findFirst({
          where: {
            id: input.parcel_project_id,
          },
          include: {
            parcel: true,
          },
        });
        await tx.parcel_Project.updateMany({
          where: {
            id: input.parcel_project_id, // Use project_id directly
          },
          data: {
            status: BORROWING_STATUS.REJECT,
          },
        });
        const current_amount = parcel?.parcel.amount ?? 0;
        const booking = parcel?.amount ?? 0 ;
        const total = current_amount + booking;
        await tx.parcel.update({
          where: {
            parcel_id: parcel?.parcel_id,
          },
          data: {
            amount: total,
          },
        });
      });
    }),
});
