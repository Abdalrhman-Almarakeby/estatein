import { RefObject } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FieldError } from "@/components/form/field-error";
import { useWindowWidth } from "@/hooks";
import { cn } from "@/lib/utils";
import { env } from "@/lib/env";

type CaptchaProps<T extends FieldValues> = {
  captchaRef?: RefObject<ReCAPTCHA>;
  control: Control<T>;
  error?: string | undefined;
  className?: string;
  size?: "compact" | "normal";
};

export function Captcha<T extends { captchaToken: string }>({
  control,
  captchaRef,
  error,
  size,
  className,
}: CaptchaProps<T>) {
  const windowWidth = useWindowWidth();

  return (
    <div className={cn("grid size-full gap-2", className)}>
      <label id="captcha-label" className="sr-only">
        CAPTCHA Verification
      </label>
      <Controller
        key="captchaToken"
        control={control}
        name={"captchaToken" as Path<T>}
        render={({ field: { onChange } }) => (
          <ReCAPTCHA
            size={
              size ?? (windowWidth && windowWidth > 400 ? "normal" : "compact")
            }
            sitekey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            ref={captchaRef}
            onChange={onChange}
            theme="dark"
            className="mx-auto"
          />
        )}
      />
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
}
