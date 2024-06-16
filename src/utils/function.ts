import crypto from "crypto";

export const encrypt = (text: string, key: string, iv: Buffer) => {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    iv,
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const decrypt = (encrypted: string, key: string) => {
  const [ivHex, encryptedText] = encrypted.split(":");
  const iv = Buffer.from(ivHex ?? "", "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    iv,
  );
  let decrypted = decipher.update(encryptedText ?? "", "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
