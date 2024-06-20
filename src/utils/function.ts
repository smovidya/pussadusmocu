import crypto from "crypto";
import { STUDENT_ID } from "./constant";

function generate32ByteKey(key: string): Buffer {
  const hash = crypto.createHash("sha256");
  hash.update(key);
  return hash.digest();
}

export const encrypt = (text: string, key: string) => {
  const iv = crypto.randomBytes(12); // AES-CTR typically uses a 16-byte IV

  const cipher = crypto.createCipheriv(
    "chacha20-poly1305",
    generate32ByteKey(key),
    iv,
    {
      authTagLength: 16,
    },
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
};

export const decrypt = (encrypted: string, key: Buffer) => {
  if (encrypted === "") {
    return process.env.NODE_ENV === "development" ? STUDENT_ID : "default";
  }

  const [ivHex, encryptedText] = encrypted.split(":");
  const iv = Buffer.from(ivHex ?? "", "hex");
  const decipher = crypto.createDecipheriv("chacha20-poly1305", key, iv);
  let decrypted = decipher.update(encryptedText ?? "", "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
