import { type calendar_v3, google } from "googleapis";
import { type EventDto } from "../models/calendar.model";
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
 * @returns {calendar_v3.Calendar} The Google Calendar client.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getGoogleCalendar = (client: any): calendar_v3.Calendar =>
  google.calendar({
    version: "v3",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    auth: client,
  });

/**
 * Creates a new event in the specified Google Calendar.
 *
 * @param {EventDto} event - The event details including summary, description, start, and end times.
 * @returns {Promise<string>} The status text of the calendar event creation response.
 *
 * @example
 * // Example usage:
 * const status = await createEvent({
 *   summary: "Team Meeting",
 *   description: "Discuss project milestones",
 *   start: {
 *     date: "2024-09-15T09:00:00-07:00",
 *     timezone: "America/Los_Angeles",
 *   },
 *   end: {
 *     date: "2024-09-15T10:00:00-07:00",
 *     timezone: "America/Los_Angeles",
 *   },
 * });
 * console.log("Event creation status:", status);
 */
export const createEvent = async (event: EventDto): Promise<string> => {
  // Get an authenticated Google API client
  const client = await auth.getClient();
  // Get the Google Calendar client
  const calendar = getGoogleCalendar(client);
  // Insert a new event into the specified Google Calendar
  const response = await calendar.events.insert({
    auth: auth,
    calendarId: "suppliesandpremises.sccu@gmail.com",
    requestBody: event,
  });
  // Return the status of the event creation request
  return response.statusText;
};
