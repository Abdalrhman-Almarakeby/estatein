import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { StrictOmit } from "@/types";
import { Input } from "./input";

type FormattedNumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = StrictOmit<NumericFormatProps, "onChange" | "name"> & {
  control: Control<TFieldValues>;
  name: TName;
  isCurrency?: boolean;
};

export function FormattedNumberInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  isCurrency = false,
  ...props
}: FormattedNumberInputProps<TFieldValues, TName>) {
  const {
    field: { onChange, value, ref: fieldRef },
  } = useController({
    name,
    control,
  });

  return (
    <NumericFormat
      customInput={Input}
      thousandSeparator=","
      decimalSeparator="."
      decimalScale={0}
      prefix={isCurrency ? "$" : ""}
      allowNegative={false}
      onValueChange={(values) => {
        onChange(values.floatValue);
      }}
      value={value}
      valueIsNumericString={true}
      getInputRef={fieldRef}
      {...props}
    />
  );
}
