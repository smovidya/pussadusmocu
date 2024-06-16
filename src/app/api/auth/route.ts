import { type NextRequest, NextResponse } from "next/server";

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

  return NextResponse.json(validationResponse);
}
