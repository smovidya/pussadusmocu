import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  ParcelDepartmentSchema,
  ParcelGroupSchema,
  ParcelTypeSchema,
} from "~/utils/constant";

export const parcelRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const parcel = await ctx.db.parcel.findMany();
    return parcel;
  }),
  getById: publicProcedure
    .input(
      z.object({
        parcel_id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.parcel.findFirst({
        where: {
          parcel_id: input.parcel_id,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string(),
        id: z.string().min(10),
        image_url: z.string(),
        amount: z.number().positive(),
        department: ParcelDepartmentSchema,
        group: ParcelGroupSchema,
        type: ParcelTypeSchema,
        available: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.parcel.create({
        data: {
          parcel_id: input.id,
          title: input.name,
          description: input.description,
          image_url: input.image_url,
          group: input.group,
          type: input.type,
          department: input.department,
          amount: input.amount,
          available: input.available,
        },
      });
    }),
  edit: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string(),
        id: z.string().min(10),
        image_url: z.string(),
        amount: z.number().positive(),
        department: ParcelDepartmentSchema,
        group: ParcelGroupSchema,
        type: ParcelTypeSchema,
        available: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      return await ctx.db.parcel.update({
        where: {
          parcel_id : input.id
        },
        data:{
          title: input.name,
          description: input.description,
          amount: input.amount,
          image_url: input.image_url,
          available: input.available,
          department: input.department,
          group: input.group,
          type: input.type,
        }
      })
    }),
});
