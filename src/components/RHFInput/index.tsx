import React from "react";
import { Controller, type FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import InputMask from "@mona-health/react-input-mask";
import { InputFieldProps, MASK } from "@/lib/types/input-types";

export function RHFInput<T extends FieldValues>({
  control,
  name,
  label,
  mask = "NONE",
  type,
  ...props
}: InputFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} {...props}>
          {label && (
            <FieldLabel htmlFor={field.name} className="text-white">
              {label}
            </FieldLabel>
          )}
          {mask !== "NONE" ? (
            <>
              <InputMask
                {...field}
                mask={MASK[mask]}
                id={field.name}
                disabled={props.disabled}
                aria-invalid={fieldState.invalid}
                placeholder={props.placeholder}
                type={type}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;

                  if (type === "number" && value !== "") {
                    field.onChange(parseFloat(value));
                  } else if (type === "number" && value === "") {
                    field.onChange(0);
                  } else {
                    field.onChange(value);
                  }
                }}
              >
                <Input className="h-12 bg-background text-black ring-offset-background placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring" />
              </InputMask>
            </>
          ) : (
            <>
              <Input
                {...props}
                {...field}
                inputMode={type === "number" ? "numeric" : "text"}
                id={field.name}
                aria-invalid={fieldState.invalid}
                type={type}
                className="h-12 bg-background text-black ring-offset-background placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;

                  if (type === "number" && value !== "") {
                    field.onChange(parseFloat(value));
                  } else if (type === "number" && value === "") {
                    field.onChange(0);
                  } else {
                    field.onChange(value);
                  }
                }}
              />
            </>
          )}

          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
