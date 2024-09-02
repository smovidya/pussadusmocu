import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type calendar_v3, google } from "googleapis";
import { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } from "~/lib/constant";

/**
 * Initializes the GoogleAuth client with the necessary credentials
 * and scopes required for accessing the Google Calendar API.
 */
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: GOOGLE_CLIENT_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY,
  },
  scopes: "https://www.googleapis.com/auth/calendar",
});

/**
 * Creates a Google Calendar client for interacting with the Calendar API.
 *
 * @param {google.auth.OAuth2} client - The authenticated Google OAuth2 client.
 * @returns {calendar_v3.Calendar} - The Google Calendar client.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getGoogleCalendar = (client: any): calendar_v3.Calendar =>
  google.calendar({
    version: "v3",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    auth: client,
  });

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
    .input(
      z.object({
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
      }),
    )
    .mutation(async ({ input }) => {
      // Get an authenticated Google API client
      const client = await auth.getClient();
      // Get the Google Calendar client
      const calendar = getGoogleCalendar(client);
      // Insert a new event into the specified Google Calendar
      const response = await calendar.events.insert({
        auth: auth,
        calendarId: "suppliesandpremises.sccu@gmail.com",
        requestBody: input,
      });
      // Return the status of the event creation request
      return response.statusText;
    }),
});
