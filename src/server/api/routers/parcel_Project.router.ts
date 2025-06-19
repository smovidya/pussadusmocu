import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  getAllParcelProject,
  markBorrowingAsDelivered,
  rejectBooking,
  rejectBorrowing,
  returnParcelToStock,
  updateStatusBorrowingToInUse,
  updateStatusPendingToBorrowing,
} from "../services/parcel-project.service";

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
        return await getAllParcelProject(ctx, input.student_id);
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
      try {
        await updateStatusBorrowingToInUse(
          ctx,
          input.student_id,
          input.project_id,
        );
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update status to INUSE",
          cause: error,
        });
      }
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
      try {
        return await updateStatusPendingToBorrowing(
          ctx,
          input.parcel_project_id,
          input.description,
        );
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update status to BORROWING",
          cause: error,
        });
      }
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
      try {
        await rejectBooking(ctx, input.parcel_project_id, input.description);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to reject booking",
          cause: error,
        });
      }
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
      try {
        await returnParcelToStock(
          ctx,
          input.parcel_project_id,
          input.parcel_return,
        );
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to return parcel to stock",
          cause: error,
        });
      }
    }),

  /**
   * Reject a parcel project borrowing request.
   *
   * @param {Object} input - Input object.
   * @param {string} input.parcel_project_id - The ID of the parcel project.
   * @param {number} input.parcel_return - The amount of parcel to return.
   * @returns {Promise<void>} A promise that resolves when the rejection is complete.
   */
  rejectBorrowing: publicProcedure
    .input(
      z.object({
        parcel_project_id: z.string(),
        parcel_return: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await rejectBorrowing(
          ctx,
          input.parcel_project_id,
          input.parcel_return,
        );
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to reject borrowing",
          cause: error,
        });
      }
    }),


  markAsDelivered: publicProcedure
    .input(
      z.object({
        parcel_project_id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await markBorrowingAsDelivered(
          ctx,
          input.parcel_project_id,
        );
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to reject borrowing",
          cause: error,
        });
      }

    })
});
