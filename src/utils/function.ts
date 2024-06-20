import crypto from "crypto";
import { STUDENT_ID } from "./constant";

const algorithm = "aes-256-gcm";

export const encrypt = (text: string, key: string) => {
  const iv = crypto.randomUUID(); // Use a secure random IV
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(key, "hex"),
    Buffer.from(iv, "hex"),
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  const tag = cipher.getAuthTag().toString("hex"); // Get the authentication tag
  return `${iv}:${tag}:${encrypted}`; // Include the IV, authentication tag, and encrypted text
};

export const decrypt = (encrypted: string, key: string) => {
  if (encrypted === "") {
    return process.env.NODE_ENV === "development" ? STUDENT_ID : "default";
  }
  const [iv, tag, encryptedText] = encrypted.split(":");
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key, "hex"),
    Buffer.from(iv ?? "", "hex"),
  );
  decipher.setAuthTag(Buffer.from(tag ?? "", "hex")); // Set the authentication tag
  let decrypted = decipher.update(encryptedText ?? "", "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
