import crypto from "crypto";
import { STUDENT_ID } from "./constant";

export const encrypt = (text: string, key: string) => {
  const iv = crypto.randomBytes(16); // AES-CTR typically uses a 16-byte IV
  const cipher = crypto.createCipheriv(
    "aes-256-ocb",
    Buffer.from(key, "hex"),
    iv,
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
};

export const decrypt = (encrypted: string, key: string) => {
  if (encrypted === "") {
    return process.env.NODE_ENV === "development" ? STUDENT_ID : "default";
  }
  const [ivHex, encryptedText] = encrypted.split(":");
  const iv = Buffer.from(ivHex ?? "", "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-ocb",
    Buffer.from(key, "hex"),
    iv,
  );
  let decrypted = decipher.update(encryptedText ?? "", "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
