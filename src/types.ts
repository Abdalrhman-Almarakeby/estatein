import { FunctionComponent, SVGProps } from "react";
import { INQUIRIES_TYPES } from "@/constant";

export type InquiryType = (typeof INQUIRIES_TYPES)[number];

export type ScrollDirection = "up" | "down";

export type SVGComponent = FunctionComponent<SVGProps<SVGSVGElement>>;

export type Captcha = {
  captchaToken: string;
};

export type WithCaptcha<T extends object> = T & Captcha;

export type StrictRequired<T extends object> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};

export type StrictOmit<T extends object, K extends keyof T> = Pick<
  T,
  Exclude<keyof T, K>
>;

export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax";
      expires?: number;
    },
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};
