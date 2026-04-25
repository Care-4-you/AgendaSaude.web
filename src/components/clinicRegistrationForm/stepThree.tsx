import { useFormContext, Controller } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { ClinicaFormData } from "../../shared/interfaces/IClinica";
import { Label } from "../ui/label";
import { convenios } from "../../shared/utils";

const animatedComponents = makeAnimated();

function StepThree() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<ClinicaFormData>();

  
  const colorStyles = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: (styles: any) => ({
      ...styles,
      minHeight: "2.75em"
    })
  };
  return (
    <fieldset className=" grid grid-cols-1 gap-4 ">
      <div className="col-span-1 flex flex-col gap-3">
        <Label htmlFor="convenio" className="text-white">
          Convênio*
        </Label>
        <Controller
          control={control}
          name="healthInsurance"
          rules={{ required: true }}
          render={(renderProps) => {
            return (
              <Select
                className={`${errors.healthInsurance ? " rounded-md border-2  border-red-500  focus-visible:ring-red-500" : ""}`}
                styles={colorStyles}
                closeMenuOnSelect={false}
                id="convenio"
                components={animatedComponents}
                isMulti
                placeholder="Selecionar"
                options={convenios}
                menuPlacement="auto"
                isSearchable={false}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                {...register("healthInsurance", {
                  required: {
                    value: true,
                    message: "Campo Convênio é obrigatório"
                  }
                })}
                {...renderProps.field}
                onChange={(e) => {
                  renderProps.field.onChange(e);
                }}
              />
            );
          }}
        />
        <p className="min-h-4 text-sm  font-semibold text-red-500">
          {errors.healthInsurance ? errors.healthInsurance.message : ""}
        </p>
      </div>
    </fieldset>
  );
}

export default StepThree;
