import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { EventDtoSchema } from "../models/calendar.model";
import { createEvent } from "../services/calendar.service";

/**
 * TRPC Router for handling calendar-related operations.
 */
export const calendarRouter = createTRPCRouter({
  /**
   * Creates a new event in the specified Google Calendar.
   *
   * @param {Object} input - The event details.
   * @param {string} input.summary - The summary or title of the event.
   * @param {string} input.description - The description of the event.
   * @param {Object} input.start - The start time details of the event.
   * @param {string} input.start.date - The start date of the event in ISO format.
   * @param {string} input.start.timezone - The timezone for the event start time.
   * @param {Object} input.end - The end time details of the event.
   * @param {string} input.end.date - The end date of the event in ISO format.
   * @param {string} input.end.timezone - The timezone for the event end time.
   * @returns {Promise<string>} The status text of the calendar event creation response.
   */
  createEvent: publicProcedure
    .input(EventDtoSchema)
    .mutation(async ({ input }) => {
      return createEvent(input);
    }),
});
