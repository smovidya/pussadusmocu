import { z } from "zod";

/**
 * Zod schema for validating calendar event data.
 */
export const EventDtoSchema = z.object({
  summary: z.string(),
  description: z.string(),
  start: z.object({
    date: z.string(),
    timezone: z.string(),
  }),
  end: z.object({
    date: z.string(),
    timezone: z.string(),
  }),
});

/**
 * Type representing the validated calendar event data.
 */
export type EventDto = z.infer<typeof EventDtoSchema>;
