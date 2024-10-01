import axios from "axios";
import { env } from "@/lib/env";

export async function verifyCaptchaToken(captchaToken: string) {
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`;

  try {
    const captchaResponse = await axios.post<{ success: boolean }>(verifyUrl);
    const captchaData = captchaResponse.data;

    if (!captchaData.success) {
      return {
        message: "Verification failed. Please try again.",
        success: false,
      };
    }

    return {
      success: true,
      message: "reCAPTCHA verification successful.",
    };
  } catch (err) {
    return {
      message: "Verification failed. Please try again.",
      success: false,
    };
  }
}
