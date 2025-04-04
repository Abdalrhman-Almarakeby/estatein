import crypto from "crypto";
import { AUTH_CONFIG } from "@/config/auth";

export function hashPassword(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(
      password.normalize(),
      salt,
      AUTH_CONFIG.password.hashLength,
      (error, hash) => {
        if (error) reject(error);

        resolve(hash.toString(AUTH_CONFIG.password.encoding).normalize());
      },
    );
  });
}

export async function comparePasswords({
  password,
  salt,
  hashedPassword,
}: {
  password: string;
  salt: string;
  hashedPassword: string;
}) {
  const inputHashedPassword = await hashPassword(password, salt);

  return crypto.timingSafeEqual(
    new Uint8Array(
      Buffer.from(inputHashedPassword, AUTH_CONFIG.password.encoding),
    ),
    new Uint8Array(Buffer.from(hashedPassword, AUTH_CONFIG.password.encoding)),
  );
}

export function generateSalt() {
  return crypto
    .randomBytes(AUTH_CONFIG.password.saltLength)
    .toString(AUTH_CONFIG.password.encoding)
    .normalize();
}
