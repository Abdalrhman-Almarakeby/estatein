import { Captcha } from "@/lib/schemas/captcha";

export type WithCaptcha<T> = T & Captcha;
