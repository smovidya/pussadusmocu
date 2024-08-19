import { type NextRequest, NextResponse } from "next/server";
import { type calendar_v3, google } from "googleapis";
import { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } from "~/lib/constant";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: GOOGLE_CLIENT_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY,
  },
  scopes: "https://www.googleapis.com/auth/calendar",
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getGoogleCalendar = (client: any) =>
  google.calendar({
    version: "v3",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    auth: client,
  });

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as calendar_v3.Schema$Event | undefined;
    const client = await auth.getClient();
    const calendar = getGoogleCalendar(client);
    console.log("Connected to Google client 🚀");
    const data = calendar.events.insert({
      auth: auth,
      calendarId: "suppliesandpremises.sccu@gmail.com",
      requestBody: body,
    });
    return NextResponse.json({ calendar: data, input: body });
  } catch (error) {
    console.error("Error connecting to Google client: ", error);
    return NextResponse.error();
  }
}
