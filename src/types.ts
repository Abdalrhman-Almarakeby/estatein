import { FunctionComponent, SVGProps } from "react";
import { Captcha } from "@/lib/schemas/captcha";
import { INQUIRIES_TYPES } from "@/constant";

export type InquiresType = (typeof INQUIRIES_TYPES)[number];

export type ScrollDirection = "up" | "down";

export type SVGComponent = FunctionComponent<SVGProps<SVGSVGElement>>;

export type WithCaptcha<T> = T & Captcha;
