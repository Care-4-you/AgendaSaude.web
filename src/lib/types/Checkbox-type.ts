import { Control, FieldValues, Path } from "react-hook-form";

export type CheckboxFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string | JSX.Element;
} & React.InputHTMLAttributes<HTMLInputElement>;
