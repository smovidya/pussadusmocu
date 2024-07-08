import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { BORROWING_STATUS } from "@prisma/client";

/**
 * TRPC Router for handling parcel project operations.
 */
export const Parcel_projectRouter = createTRPCRouter({
  /**
   * Get all parcel projects, optionally filtered by student ID.
   *
   * @param {Object} input - Input object.
   * @param {string} [input.student_id] - Optional student ID to filter the parcels.
   * @returns {Promise<Array>} The list of parcel projects.
   * @throws {TRPCError} When the fetch operation fails.
   */
  getAll: publicProcedure
    .input(
      z.object({
        student_id: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const parcels = await ctx.db.parcel_Project.findMany({
          where: input.student_id
            ? { student_id: input.student_id }
            : undefined,
          include: {
            project: true,
            parcel: true,
            student: true,
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
   * Update the status of a parcel project to 'INUSE'.
   *
   * @param {Object} input - Input object.
   * @param {string} input.project_id - The ID of the project.
   * @param {string} input.student_id - The ID of the student.
   * @returns {Promise<void>} A promise that resolves when the update is complete.
   */
  updatestatus: publicProcedure
    .input(
      z.object({
        project_id: z.string(),
        student_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.$transaction(async (tx) => {
        await tx.parcel_Project.updateMany({
          where: {
            student_id: input.student_id,
            project_id: input.project_id,
            status: BORROWING_STATUS.BORROWING,
          },
          data: {
            status: BORROWING_STATUS.INUSE,
          },
        });
      });
    }),

  /**
   * Update the status of a parcel project to 'BORROWING' with an admin description.
   *
   * @param {Object} input - Input object.
   * @param {string} input.parcel_project_id - The ID of the parcel project.
   * @param {string} input.description - The admin description to update.
   * @returns {Promise<Object>} The updated parcel project.
   */
  updateChecking: publicProcedure
    .input(
      z.object({
        parcel_project_id: z.string(),
        description: z.string(),
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
          description_admin: input.description,
        },
      });
    }),

  /**
   * Reject a parcel project booking with a description.
   *
   * @param {Object} input - Input object.
   * @param {string} input.parcel_project_id - The ID of the parcel project.
   * @param {string} input.description - The admin description to update.
   * @returns {Promise<void>} A promise that resolves when the rejection is complete.
   */
  rejectBooking: publicProcedure
    .input(
      z.object({
        parcel_project_id: z.string(),
        description: z.string(),
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
            id: input.parcel_project_id,
          },
          data: {
            status: BORROWING_STATUS.REJECT,
            description_admin: input.description,
          },
        });
        const current_amount = parcel?.parcel.amount ?? 0;
        const booking = parcel?.amount ?? 0;
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

  /**
   * Return a parcel project and update the stock amount.
   *
   * @param {Object} input - Input object.
   * @param {string} input.parcel_project_id - The ID of the parcel project.
   * @param {number} input.parcel_return - The amount of parcel to return.
   * @returns {Promise<void>} A promise that resolves when the return is complete.
   */
  returnParcel: publicProcedure
    .input(
      z.object({
        parcel_project_id: z.string(),
        parcel_return: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
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
            id: input.parcel_project_id,
          },
          data: {
            status: BORROWING_STATUS.RETURN,
          },
        });
        const currentAmount = parcel?.parcel.amount ?? 0;
        const returnAmount = input.parcel_return;
        const toStock = currentAmount + returnAmount;
        await tx.parcel.update({
          where: {
            parcel_id: parcel?.parcel_id,
          },
          data: {
            amount: toStock,
          },
        });
      });
    }),
});
