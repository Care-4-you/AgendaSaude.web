import { Controller, type FieldValues } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  colorStyles,
  SelectInputFieldProps,
  SelectOption
} from "../../lib/types/select-input-types";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

type NestedFieldError = {
  message?: string;
  value?: {
    message?: string;
  };
};

export function RHFSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
  ...props
}: SelectInputFieldProps<T>) {
  const isMulti = "isMulti" in props && props.isMulti === true;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const nestedError = fieldState.error as NestedFieldError | undefined;
        const errorMessage =
          nestedError?.message ?? nestedError?.value?.message;

        return (
          <Field data-invalid={fieldState.invalid}>
            {label && (
              <FieldLabel htmlFor={field.name} className="text-white">
                {label}
              </FieldLabel>
            )}
            {isMulti ? (
              <Select<SelectOption, true>
                {...props}
                isMulti
                name={field.name}
                value={(field.value as SelectOption[] | undefined) ?? []}
                onBlur={() => field.onBlur()}
                className={`w-full text-black ${fieldState.invalid ? " rounded-md border-2  border-red-500  focus-visible:ring-red-500" : ""}`}
                styles={colorStyles}
                id={field.name}
                components={animatedComponents}
                placeholder="Selecionar"
                options={options}
                menuPlacement="auto"
                isSearchable={false}
                menuPosition="fixed"
                aria-invalid={fieldState.invalid}
                onChange={(option) => {
                  field.onChange(option);
                }}
              />
            ) : (
              <Select<SelectOption, false>
                {...props}
                isMulti={false}
                name={field.name}
                value={(field.value as SelectOption | null | undefined) ?? null}
                onBlur={() => field.onBlur()}
                className={`w-full text-black ${fieldState.invalid ? " rounded-md border-2  border-red-500  focus-visible:ring-red-500" : ""}`}
                styles={colorStyles}
                id={field.name}
                components={animatedComponents}
                placeholder="Selecionar"
                options={options}
                menuPlacement="auto"
                isSearchable={false}
                menuPosition="fixed"
                aria-invalid={fieldState.invalid}
                onChange={(option) => {
                  field.onChange(option);
                }}
              />
            )}
            {errorMessage && (
              <FieldError errors={[{ message: errorMessage }]} />
            )}
          </Field>
        );
      }}
    />
  );
}
