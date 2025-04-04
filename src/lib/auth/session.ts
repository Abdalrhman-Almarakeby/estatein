import crypto from "crypto";
import { hoursToSeconds } from "date-fns";
import { Cookies } from "@/types";
import { redisClient } from "@/lib/redis";
import { sessionSchema, UserSession } from "@/lib/schemas";
import { AUTH_CONFIG } from "@/config/auth";

const cookieSessionKey = AUTH_CONFIG.session.cookieSessionKey;
const sessionIdLength = AUTH_CONFIG.session.sessionIdLength;
const sessionExpirationSeconds = hoursToSeconds(
  AUTH_CONFIG.session.sessionExpirationDays * 24,
);
const sessionKeyPrefix = AUTH_CONFIG.session.sessionKeyPrefix;
export function getUserFromSession(cookies: Pick<Cookies, "get">) {
  const sessionId = cookies.get(cookieSessionKey)?.value;
  if (sessionId == null) return null;

  return getUserSessionById(sessionId);
}

export async function updateUserSessionData(
  user: UserSession,
  cookies: Pick<Cookies, "get">,
) {
  const sessionId = cookies.get(cookieSessionKey)?.value;
  if (sessionId == null) return null;

  await redisClient.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: sessionExpirationSeconds,
  });
}

export async function createUserSession(
  user: UserSession,
  cookies: Pick<Cookies, "set">,
) {
  const sessionId = crypto.randomBytes(sessionIdLength).toString("hex");
  await redisClient.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: sessionExpirationSeconds,
  });

  setCookie(sessionId, cookies);
}

export async function updateUserSessionExpiration(
  cookies: Pick<Cookies, "get" | "set">,
) {
  const sessionId = cookies.get(cookieSessionKey)?.value;
  if (sessionId == null) return null;

  const user = await getUserSessionById(sessionId);
  if (user == null) return;

  await redisClient.set(`${sessionKeyPrefix}${sessionId}`, user, {
    ex: sessionExpirationSeconds,
  });
  setCookie(sessionId, cookies);
}

export async function deleteUserSession(
  cookies: Pick<Cookies, "get" | "delete">,
) {
  const sessionId = cookies.get(cookieSessionKey)?.value;
  if (sessionId == null) return;

  await redisClient.del(`${sessionKeyPrefix}${sessionId}`);
  cookies.delete(cookieSessionKey);
}

function setCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
  cookies.set(cookieSessionKey, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    expires: Date.now() + sessionExpirationSeconds * 1000,
  });
}

async function getUserSessionById(sessionId: string) {
  const rawUser = await redisClient.get(`${sessionKeyPrefix}${sessionId}`);
  const { success, data: user } = sessionSchema.safeParse(rawUser);
  return success ? user : null;
}
