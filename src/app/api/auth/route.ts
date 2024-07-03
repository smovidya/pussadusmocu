import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { DeeAppId, DeeAppSecret, type UserData } from "~/utils/constant";
import { encrypt } from "../../../utils/function";
import { api } from "~/trpc/server";

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

  console.log("DEBUG P OAT data : ", data);

  const users = await api.auth.getUser({ student_id: data.ouid });
  const cookieStore = cookies();
  const oneDay = 24 * 60 * 60 * 1000;

  console.log("DEBUG P OAT user : ", users);

  // Remove the student_cookie if it exists
  const studentCookie = cookieStore.get("student_cookie");
  if (studentCookie) {
    cookieStore.delete("student_cookie");
  }

  const token: string = await encrypt(users as object);
  console.log("TOKEN P OAT : ",token);

  cookieStore.set("student_id", token, {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });

  return NextResponse.redirect("https://pussadusmocu.vercel.app/users/home");
}
