import { FunctionComponent, SVGProps } from "react";
import { Captcha } from "@/lib/schemas/captcha";
import { INQUIRIES_TYPES } from "@/constant";

export type InquiryType = (typeof INQUIRIES_TYPES)[number];

export type ScrollDirection = "up" | "down";

export type SVGComponent = FunctionComponent<SVGProps<SVGSVGElement>>;

export type WithCaptcha<T extends object> = T & Captcha;

export type StrictRequired<T extends object> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};

export type StrictOmit<T extends object, K extends keyof T> = Pick<
  T,
  Exclude<keyof T, K>
>;