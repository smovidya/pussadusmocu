import crypto from "crypto";
import { STUDENT_ID } from "./constant";

// Function to encrypt text using ChaCha20
export const encrypt = (text: string, key: string) => {
  const iv = crypto.randomBytes(12); // ChaCha20 typically uses a 12-byte nonce
  const cipher = crypto.createCipheriv("chacha20-poly1305", Buffer.from(key, "hex"), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
};

// Function to decrypt text using ChaCha20
export const decrypt = (encrypted: string, key: string) => {
  if (encrypted === "") {
    return process.env.NODE_ENV === "development" ? STUDENT_ID : "default";
  }
  const [ivHex, encryptedText] = encrypted.split(":");
  const iv = Buffer.from(ivHex ?? "", "hex");
  const decipher = crypto.createDecipheriv(
    "chacha20-poly1305",
    Buffer.from(key, "hex"),
    iv,
  );
  let decrypted = decipher.update(encryptedText ?? "", "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
