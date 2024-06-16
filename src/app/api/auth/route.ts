import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

type UserData = {
  firstname: string;
  lastname: string;
  ouid: string;
  username: string;
  gecos: string;
  email: string;
  disable: boolean;
  roles: string[];
  firtnameth: string;
  lastnameth: string;
};

type ServiceValidationResponse = {
  status: number;
  message: string | Record<string, unknown>;
};

const serviceValidation = async (
  ticket: string,
  DeeAppId: string,
  DeeAppSecret: string,
): Promise<ServiceValidationResponse> => {
  try {
    const url = "https://account.it.chula.ac.th/serviceValidation";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        DeeAppId,
        DeeAppSecret,
        DeeTicket: ticket,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = (await response.json()) as Record<string, unknown>;

    if (response.ok) {
      return {
        status: 200,
        message: jsonResponse,
      };
    } else {
      return {
        status: response.status,
        message: jsonResponse,
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: error instanceof Error ? error.message : String(error),
    };
  }
};

export async function GET(req: NextRequest) {
  const ticket = req.nextUrl.searchParams.get("ticket");

  if (!ticket) {
    return NextResponse.json({
      status: 400,
      message: "Ticket parameter is missing",
    });
  }

  const DeeAppId = process.env.DEE_APP_ID ?? "";
  const DeeAppSecret = process.env.DEE_APP_SECRET ?? "";

  if (!DeeAppId || !DeeAppSecret) {
    return NextResponse.json({
      status: 500,
      message: "App ID or App Secret is missing",
    });
  }

  const validationResponse = await serviceValidation(
    ticket,
    DeeAppId,
    DeeAppSecret,
  );

  const data: UserData = validationResponse.message as UserData;
  const cookieStore = cookies();
  const oneDay = 24 * 60 * 60 * 1000;
  cookieStore.set("student_id", data.ouid, {
    secure: true,
    httpOnly: true,
    expires: Date.now() + oneDay,
  });
  return NextResponse.redirect("https://pussadusmocu.vercel.app/users/home");
}
