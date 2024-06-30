import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  ParcelDepartmentSchema,
  ParcelGroupSchema,
  ParcelTypeSchema,
} from "~/utils/constant";
import { BORROWING_STATUS } from "@prisma/client";

export const parcelRouter = createTRPCRouter({
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

  getRemain: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.parcel.findMany({
      where: {
        NOT: {
          amount: 0,
          available: false,
        },
      },
    });
  }),

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
      });
    }),

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
