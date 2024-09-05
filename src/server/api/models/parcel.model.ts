import { z } from "zod";
import {
  ParcelDepartmentSchema,
  ParcelGroupSchema,
  ParcelTypeSchema,
} from "~/lib/constant";

/**
 * Zod schema for validating parcel data.
 */
export const BookingDtoSchema = z.object({
  student_id: z.string(),
  parcel_id: z.string(),
  project_id: z.string(),
  amount: z.number(),
  description: z.string(),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
});

export const ParcelDtoSchema = z.object({
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
});

/**
 * Type representing the validated calendar event data.
 */
export type BookingDto = z.infer<typeof BookingDtoSchema>;
export type ParcelDto = z.infer<typeof ParcelDtoSchema>;
