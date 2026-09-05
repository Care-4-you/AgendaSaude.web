import { Control, FieldValues, Path } from "react-hook-form";
import { CSSObjectWithLabel, Props as ReactSelectProps } from "react-select";

export const colorStyles = {
  control: (styles: CSSObjectWithLabel) => ({
    ...styles,
    minHeight: "2.75em"
  })
};

export type SelectOption = {
  value: string;
  label: string;
};

type SelectInputBaseProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  options: SelectOption[];
};

type SingleSelectInputProps = {
  isMulti?: false;
} & Omit<
  ReactSelectProps<SelectOption, false>,
  "name" | "value" | "onChange" | "options" | "isMulti"
>;

type MultiSelectInputProps = {
  isMulti: true;
} & Omit<
  ReactSelectProps<SelectOption, true>,
  "name" | "value" | "onChange" | "options" | "isMulti"
>;

export type SelectInputFieldProps<T extends FieldValues> =
  SelectInputBaseProps<T> & (SingleSelectInputProps | MultiSelectInputProps);
