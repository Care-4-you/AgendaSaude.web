import { Control, FieldValues, Path } from "react-hook-form";
import { Props as ReactSelectProps } from "react-select";

export const colorStyles = {
  control: (styles: any) => ({
    ...styles,
    minHeight: "2.75em"
  })
};

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectInputFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  options: SelectOption[];
} & Omit<
  ReactSelectProps<SelectOption, false>,
  "name" | "value" | "onChange" | "options"
>;
