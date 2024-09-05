import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { BookingDtoSchema, ParcelDtoSchema } from "../models/parcel.model";
import {
  bookingParcel,
  createParcel,
  deleteParcel,
  editParcel,
  getAllParcel,
  getParcelById,
  getParcelReaminByStudentId,
} from "../services/parcel.service";

/**
 * TRPC Router for handling parcel-related operations.
 */
export const parcelRouter = createTRPCRouter({
  /**
   * Get all parcels.
   *
   * @returns {Promise<Object[]>} List of all parcels.
   */
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return getAllParcel(ctx);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch parcels",
        cause: error,
      });
    }
  }),

  /**
   * Get all remaining parcels that are available.
   *
   * @returns {Promise<Object[]>} List of available parcels.
   */
  getRemain: publicProcedure
    .input(
      z.object({
        student_id: z.string(),
        project_id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return getParcelReaminByStudentId(
        ctx,
        input.project_id,
        input.student_id,
      );
    }),

  /**
   * Get parcel by ID.
   *
   * @param {Object} input - Input object.
   * @param {string} input.parcel_id - The ID of the parcel to fetch.
   * @returns {Promise<Object>} The parcel information.
   * @throws {TRPCError} If the parcel is not found or an error occurs.
   */
  getById: publicProcedure
    .input(
      z.object({
        parcel_id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const parcel = await getParcelById(ctx, input.parcel_id);
        if (!parcel) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Parcel not found",
          });
        }
        return parcel;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch parcel",
          cause: error,
        });
      }
    }),

  /**
   * Book a parcel.
   *
   * @param {Object} input - Input object.
   * @param {string} input.student_id - The student ID.
   * @param {string} input.parcel_id - The parcel ID.
   * @param {string} input.project_id - The project ID.
   * @param {number} input.amount - The amount of parcel to book.
   * @param {string} input.description - Description of the booking.
   * @param {Date} [input.startDate] - The start date of the booking.
   * @param {Date} [input.endDate] - The end date of the booking.
   * @returns {Promise<void>}
   * @throws {Error} If the requested amount exceeds the available amount.
   */
  booking: publicProcedure
    .input(BookingDtoSchema)
    .mutation(async ({ ctx, input }) => {
      return bookingParcel(ctx, input);
    }),

  /**
   * Create a new parcel.
   *
   * @param {Object} input - Input object.
   * @param {string} input.name - Name of the parcel.
   * @param {string} input.description - Description of the parcel.
   * @param {string} input.id - ID of the parcel.
   * @param {string} input.image_url - URL of the parcel image.
   * @param {string} input.unit - Unit of the parcel.
   * @param {number} input.amount - Amount of the parcel.
   * @param {ParcelDepartmentSchema} input.department - Department of the parcel.
   * @param {ParcelGroupSchema} input.group - Group of the parcel.
   * @param {ParcelTypeSchema} input.type - Type of the parcel.
   * @param {boolean} input.available - Availability of the parcel.
   * @returns {Promise<Object>} The created parcel.
   * @throws {TRPCError} If there is an error creating the parcel.
   */
  create: publicProcedure
    .input(ParcelDtoSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return createParcel(ctx, input);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create parcel parcel_id may be existed",
          cause: error,
        });
      }
    }),

  /**
   * Edit an existing parcel.
   *
   * @param {Object} input - Input object.
   * @param {string} input.name - Name of the parcel.
   * @param {string} input.description - Description of the parcel.
   * @param {string} input.id - ID of the parcel.
   * @param {string} input.image_url - URL of the parcel image.
   * @param {string} input.unit - Unit of the parcel.
   * @param {number} input.amount - Amount of the parcel.
   * @param {ParcelDepartmentSchema} input.department - Department of the parcel.
   * @param {ParcelGroupSchema} input.group - Group of the parcel.
   * @param {ParcelTypeSchema} input.type - Type of the parcel.
   * @param {boolean} input.available - Availability of the parcel.
   * @returns {Promise<Object>} The updated parcel.
   * @throws {TRPCError} If the parcel is not found or there is an error updating the parcel.
   */
  edit: publicProcedure
    .input(ParcelDtoSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return editParcel(ctx, input);
      } catch (error) {
        if (error instanceof TRPCError) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Parcel not found",
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update parcel",
          cause: error,
        });
      }
    }),

  /**
   * Delete a parcel.
   *
   * @param {Object} input - Input object.
   * @param {string} input.parcel_id - The ID of the parcel to delete.
   * @returns {Promise<void>}
   * @throws {TRPCError} If the parcel is not found or there is an error deleting the parcel.
   */
  delete: publicProcedure
    .input(
      z.object({
        parcel_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return deleteParcel(ctx, input.parcel_id);
      } catch (error) {
        if (error instanceof TRPCError) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Parcel not found",
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete parcel",
          cause: error,
        });
      }
    }),
});
