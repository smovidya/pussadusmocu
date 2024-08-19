import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { calendar_v3, google } from 'googleapis';


const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: 	"calendar@effective-aria-423514-g8.iam.gserviceaccount.com",
      private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7b9uzm5kGiot4\nKP0kQNkG1HhqrnGQ22UKqp1o7O2vtamCsjSBlik0tF41idHax3eQgubW2kKDQOny\n86B74nFUDB07wnCFTcdrUYbZp4odod+ULFl2Bv1sQVasGam/OkEqEllgs5IMtXmx\nHx+rDqwrJcnSxUat68qcCKTuoFj0a8uRdQo1GjdSbByRR9gwiNMqhEPZVo2ek+hB\nnRlFL+XVCcCgdS6VuZlBXvRYVPfbl96z+158JKsk1tVVe2oZ9IU5svPEjWaLQH5A\nF+CuneqiA+hzy5YfBfRJEO7K+nLwegrkQZLzz3bliwJvw//57LeDnzD5b2T3X1GN\n6ZcvpbdVAgMBAAECggEAEHVcsANpsc6t5c8zleCxLeME79ksKlwZczuoDB6XKxFN\n4Sa6FZGUl1wp1D8AflrQKjr+/2lgOHDqxLqVIkuv8oFdz8bduoF/O/KHX3VRW2jA\ns8dxKOapj2ftWbn8fcjPurIBxyFSzGri/0/hp/48f/gW0Lsh3wO6tsN2OBM8Zw8p\ndmEklGHr+/1Ces0UXBrUO/c1k/vJLkQLDxEwIOeBZOGoGy4gw2lL0Kjr9NGmH4Yj\nzYThUN1Gxr8wCLIV7kAwp31Bg936xVnXdh/s5DftcZZAp0ofKRzXFDzSJdp3kO1Y\n4i0zqslzDQHLvH8sdwtK2uBmdvpbl5caAQ5FNIqXwQKBgQDvmcRkejNjv9FgaZjS\n2SYN0C+gvauPZOLOTJ7M6JYo258CwznJiksVqE8gjYd52a0CdL8h4jMLD0FN7Huu\n2iVyoYX4k6hrtT327r0VvxbDePVfmD6BvhDBoEhslmfqPWSe8My5RqdzJvnG9/rA\n4HHYfLBlLHdiD2JF9+D4DRlGHwKBgQDIRBbkW3j11KAF0g25P3V/xYk9TTGkzpNE\nSZ+rK9xOGU+XVQGvPM7f7CDStNgoEYFe0AzWU03Qx7xf6X9vyWH7tqM1gZWPNeTG\nqrWHIhYlE4oLsga+HFTNxvqF4eueu2gGbSK8nOnzFiL+VOYHx4TAYkAdkDHJpANh\nWO2IeHHMCwKBgAwcuNnfd5OWUc5O6EPYaF0QZif5DqAsGG8XXnu7UkP0fkBUgCpZ\nDFym6oEZxnx5bY6POk5LMgtgFQwMZWA8dOIrmisrw7rWKbC+9t4Pj+YHylevyZEj\ne5NeN+sNW2ly+xAx2hePo81lbgEJ7ior7nVkMEKdEdfqMSyaUEwZ1Wo/AoGBAJ6x\nNeKmiWdjoZp7JNzSaG1jPqkQ7nHGL/RA0wF0tBI/BE7K0Zbm/Jd8KVZOb6rwlC9p\ndYKwaE00uRTXlmAimD46L4JKuRTOhAbZZxc574pZvV4fKDClip21Ove0Wl1h68CL\n4qbLQKebtwcKh21KsOsx79R9WraJ/RO6wB8QMjyZAoGBAO5NxOehcwmRzP0k4z9z\nXtWL8Ej9kvxdWGg1Jf4THZke6i8gLoY5t9Qqm7js4WrTwI2WO2BD/7YJji5RGGW9\nyc814RCDms2SqWdmVr6d8OdVqJOVv7nGPW7p0FLk5CFci5FoIz/GBFmKBrr2mD2r\nuvVe61diKxJl+ue04y+ikDnj\n-----END PRIVATE KEY-----\n"},
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
      const body = await req.json() as calendar_v3.Schema$Event | undefined;
      const client = await auth.getClient();
      const calendar = getGoogleCalendar(client);
      console.log("Connected to Google client 🚀");
      const data = calendar.events.insert({
          auth: auth,
          calendarId: "suppliesandpremises.sccu@gmail.com",
          requestBody: body
      })
      return NextResponse.json({ calendar: data});
    } catch (error) {
      console.error("Error connecting to Google client: ", error);
      return NextResponse.error();
    }
  }
