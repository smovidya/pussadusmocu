import { encryptionKey, STUDENT_ID, type UserData } from "./constant";
import jwt from "jsonwebtoken";

export const encrypt = (data: object) => {
  return jwt.sign(data, encryptionKey, { algorithm: "HS256", expiresIn: "1d" });
};

export const decrypt = (token: string) => {
  try {
    const decrypt_data = jwt.verify(token, encryptionKey, {
      algorithms: ["HS256"],
    }) as UserData;
    return decrypt_data;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      return STUDENT_ID;
    } else {
      return "default";
    }
  }
};
