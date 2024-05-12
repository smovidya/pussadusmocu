import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const ParcelGroupSchema = z.enum([
  "OFFICE",
  "ELECTRONIC",
  "HOME",
  "BUILDING",
  "FUEL",
  "MEDICAL_SCI",
  "ADS",
  "MUSICAL",
  "CLOTHING",
  "COMPUTER",
]);

const ParcelTypeSchema = z.enum(["NORMAL", "DURABLE"]);

export const parcelRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const parcel = await ctx.db.parcel.findMany();
    return parcel;
  }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        group: ParcelGroupSchema,
        type: ParcelTypeSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.parcel.create({
        data: {
          parcel_id: input.name,
          title: input.name,
          description: input.name,
          image_url: input.name,
          group: input.group,
          type: input.type,
        },
      });
    }),
});
