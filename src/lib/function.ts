import { SignJWT, jwtVerify } from "jose";
import { encryptionKey, LINE_TOKEN, STUDENT_ID } from "./constant";
import { BORROWING_STATUS, Status, type Student } from "@prisma/client";
// import { google } from 'googleapis';

/**
 * Encrypts data into a JWT token.
 * @param {object} data - The data to be encrypted into the JWT.
 * @returns {Promise<string>} A promise that resolves to the JWT token.
 */
export const encrypt = async (data: object): Promise<string> => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24; // one day
  const secret = new TextEncoder().encode(encryptionKey);

  return new SignJWT({ ...data })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(secret);
};

/**
 * Decrypts a JWT token.
 * @param {string} token - The JWT token to be decrypted.
 * @returns {Promise<Student | { error: string }>} A promise that resolves to the decrypted data if the token is valid,
 * or an error object if the token is invalid.
 */
export const decrypt = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(encryptionKey);
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    // Ensure the payload is of type Student
    if (typeof payload === "object" && payload !== null) {
      return payload as Student;
    } else {
      throw new Error("Invalid token payload");
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    if (process.env.NODE_ENV === "development") {
      return STUDENT_ID; // Ensure STUDENT_ID is of type Student
    } else {
      return { error: errorMessage };
    }
  }
};

/**
 * Sending message to line api
 * @param {string} student_name - name of the student who borrow the key;
 * @param {string} start_date - the date that user want to borrow;
 * @returns {Promise<void>} A promise that resolves to the decrypted data if the token is valid,
 * or an error object if the token is invalid.
 */
export const sendLineNotificaion = async (
  student_name: string,
  start_date: string,
): Promise<void> => {
  const text =
    "\n🧑‍🤝‍🧑 ชื่อผู้ยืม: " + student_name + "\n" + "🤮 วันที่ยืม: " + start_date;
  const message = new FormData();
  message.append("message", text);
  message.append("stickerPackageId", "446");
  message.append("stickerId", "2006");
  await fetch("https://notify-api.line.me/api/notify", {
    method: "post",
    body: message,
    headers: {
      Authorization: "Bearer " + LINE_TOKEN,
    },
  });
};

export function getStatusText(status: BORROWING_STATUS) {
  switch (status) {
    case "PENDING":
      return "รออนุมัติ";
    case "BORROWING":
      return "อนุมัติแล้ว";
    case "INUSE":
      return "กำลังยืม";
    case "RETURN":
      return "ส่งคืนแล้ว";
    case "REJECT":
      return "ถูกปฏิเสธ";
  }
}
