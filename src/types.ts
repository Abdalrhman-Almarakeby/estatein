import { FunctionComponent, SVGProps } from "react";
import { Captcha } from "@/lib/schemas/captcha";
import { INQUIRIES_TYPES } from "@/constant";

export type InquiryType = (typeof INQUIRIES_TYPES)[number];

export type ScrollDirection = "up" | "down";

export type SVGComponent = FunctionComponent<SVGProps<SVGSVGElement>>;

export type WithCaptcha<T extends Object> = T & Captcha;

export type StrictRequired<T extends Object> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};

export type StrictOmit<T extends Object, K extends keyof T> = Pick<
  T,
  Exclude<keyof T, K>
>;
