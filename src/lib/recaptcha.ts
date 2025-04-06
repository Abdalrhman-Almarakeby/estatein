import { env } from "@/lib/env";

export type RecaptchaData =
  | {
      success: true;
      challenge_ts: string;
      hostname: string;
      score: number;
      action: string;
    }
  | {
      success: false;
      "error-codes": string[];
    };

export async function getCaptchaToken(action: string) {
  return new Promise<string>((resolve) => {
    grecaptcha.ready(() => {
      const siteKey = env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      const token = grecaptcha.execute(siteKey, { action });

      resolve(token);
    });
  });
}
