import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { DeeAppId, DeeAppSecret, type UserData } from "~/utils/constant";
import { encrypt } from "../../../utils/function";

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
  } catch (err: unknown) {
    const error = err as Error;
    return {
      status: 500,
      message: error.message,
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

  if (validationResponse.status !== 200) {
    return NextResponse.json({
      status: validationResponse.status,
      message: validationResponse.message,
    });
  }

  const data: UserData = validationResponse.message as UserData;
  const cookieStore = cookies();
  const oneDay = 24 * 60 * 60 * 1000;

  const token : string = encrypt(data);

  cookieStore.set("user_data", token, {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });

  return NextResponse.redirect("https://pussadusmocu.vercel.app/admin/home");
}
