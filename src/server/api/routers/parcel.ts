import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  LINE_TOKEN,
  ParcelDepartmentSchema,
  ParcelGroupSchema,
  ParcelTypeSchema,
} from "~/utils/constant";
import { BORROWING_STATUS, PARCEL_TYPE } from "@prisma/client";

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
      const parcels = await ctx.db.parcel.findMany();
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
      const { student_id: studentId, project_id: projectId } = input;

      // Check if the student is in the project with ID `0000000000`.
      const isStudentInProject = await ctx.db.project_Student.findFirst({
        where: {
          project_id: "0000000000",
          student_id: studentId,
        },
      });

      // Check if the student is an admin.
      const isAdmin = await ctx.db.student.findFirst({
        where: {
          student_id: studentId,
          isAdmin: true,
        },
      });

      return await ctx.db.parcel.findMany({
        where:
          (isStudentInProject ?? isAdmin)
            ? { available: true, type: PARCEL_TYPE.KEY }
            : projectId === "0000000000"
              ? { available: true, type: PARCEL_TYPE.KEY }
              : {
                  available: true,
                  NOT: {
                    type: "KEY",
                  },
                },
      });
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
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const parcel = await ctx.db.parcel.findFirst({
          where: {
            parcel_id: input.parcel_id,
          },
        });
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
    .input(
      z.object({
        student_id: z.string(),
        parcel_id: z.string(),
        project_id: z.string(),
        amount: z.number(),
        description: z.string(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.$transaction(async (tx) => {
        const parcel = await tx.parcel.findFirst({
          where: {
            parcel_id: input.parcel_id,
          },
        });
        const amount = parcel?.amount ?? 0;
        if (input.amount > amount) {
          throw new Error("Requested amount exceeds available amount");
        }
        await tx.parcel_Project.create({
          data: {
            student_id: input.student_id,
            parcel_id: input.parcel_id,
            project_id: input.project_id,
            amount: input.amount,
            description: input.description,
            startDate: input.startDate,
            endDate: input.endDate,
            status: BORROWING_STATUS.PENDING,
          },
        });
        await tx.parcel.update({
          where: {
            parcel_id: input.parcel_id,
          },
          data: {
            amount: amount - input.amount,
          },
        });
        const student_name = await tx.student.findFirst({
          where: { student_id: input.student_id },
        });
        const text =
          "\n🧑‍🤝‍🧑 ชื่อผู้ยืม: " +
          student_name?.name +
          "\n" +
          "🤮 วันที่ยืม: " +
          input.startDate?.toDateString();
        const message = new FormData();
        message.append("message", text);
        message.append("stickerPackageId", "446");
        message.append("stickerId", "2006");
        await fetch("https://notify-api.line.me/api/notify", {
          method: "post",
          body: message,
          headers: {
            Authorization: "Bearer " + LINE_TOKEN,
          },
        });
      });
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
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string(),
        id: z.string().min(10),
        image_url: z.string(),
        unit: z.string(),
        amount: z.number().positive(),
        department: ParcelDepartmentSchema,
        group: ParcelGroupSchema,
        type: ParcelTypeSchema,
        available: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const newParcel = await ctx.db.parcel.create({
          data: {
            parcel_id: input.id.toUpperCase(),
            title: input.name,
            description: input.description,
            image_url: input.image_url,
            group: input.group,
            unit: input.unit,
            type: input.type,
            department: input.department,
            amount: input.amount,
            available: input.available,
          },
        });
        return newParcel;
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
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string(),
        id: z.string().min(10),
        image_url: z.string(),
        unit: z.string(),
        amount: z.number().positive(),
        department: ParcelDepartmentSchema,
        group: ParcelGroupSchema,
        type: ParcelTypeSchema,
        available: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const updatedParcel = await ctx.db.parcel.update({
          where: {
            parcel_id: input.id,
          },
          data: {
            title: input.name,
            description: input.description,
            amount: input.amount,
            image_url: input.image_url,
            available: input.available,
            department: input.department,
            group: input.group,
            type: input.type,
            unit: input.unit,
          },
        });
        return updatedParcel;
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
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return ctx.db.$transaction(async (tx) => {
          await tx.parcel_Project.deleteMany({
            where: {
              parcel_id: input.parcel_id,
              NOT: {
                status: "INUSE",
              },
            },
          });
          await tx.parcel.delete({
            where: {
              parcel_id: input.parcel_id,
            },
          });
        });
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
