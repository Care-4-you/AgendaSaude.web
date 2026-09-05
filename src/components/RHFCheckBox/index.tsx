import { Controller, type FieldValues } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet
} from "@/components/ui/field";

import { CheckboxFieldProps } from "../../lib/types/Checkbox-type";

export function RHFCheckBox<T extends FieldValues>({
  control,
  name,
  label,
  ...props
}: CheckboxFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div {...props}>
          <FieldSet data-invalid={fieldState.invalid}>
            <FieldGroup data-slot="checkbox-group">
              <Field orientation="horizontal" className="text-white ">
                <Checkbox
                  id="form-rhf-checkbox-responses"
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="border-white"
                />
                <FieldLabel
                  htmlFor="form-rhf-checkbox-responses"
                  className="text-sm font-normal"
                >
                  {label}
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </div>
      )}
    />
  );
}
