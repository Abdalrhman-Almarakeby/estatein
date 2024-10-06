import axios from "axios";
import { env } from "@/lib/env";

export async function verifyCaptchaToken(captchaToken: string) {
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`;

  try {
    const captchaResponse = await axios.post<{ success: boolean }>(verifyUrl);
    const captchaData = captchaResponse.data;

    if (!captchaData.success) {
      return {
        success: false,
        message: "Captcha verification failed. Please try again.",
      };
    }

    return {
      success: true,
      message: "Captcha verified successfully.",
    };
  } catch (err) {
    return {
      success: false,
      message: "Captcha verification failed. Please try again.",
    };
  }
}
