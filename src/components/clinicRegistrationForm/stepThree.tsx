import { useFormContext, Controller } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { ClinicaFormData } from "../../shared/interfaces/IClinica";
import { Label } from "../ui/label";

const animatedComponents = makeAnimated();

function StepThree() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<ClinicaFormData>();

  const convenios = [
    { value: "semConvenios", label: "Sem convênios" },
    { value: "bradesco", label: "Bradesco" },
    { value: "unimed", label: "Unimed" },
    { value: "amil", label: "Amil" },
    { value: "assim", label: "Assim" },
    { value: "notreDame", label: "NotreDame" },
    { value: "sulAmerica", label: "SulAmérica" },
    { value: "portoSeguro", label: "Porto Seguro" }
  ];
  const especialidadesMedicas = [
    { value: "cardiologia", label: "Cardiologia" },
    { value: "dermatologia", label: "Dermatologia" },
    { value: "ginecologia", label: "Ginecologia" },
    { value: "ortopedia", label: "Ortopedia" },
    { value: "pediatria", label: "Pediatria" }
  ];

  const colorStyles = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: (styles: any) => ({
      ...styles,
      height: "2.75em"
    })
  };
  return (
    <fieldset className=" grid grid-cols-1 gap-4 ">
      <div className="col-span-1 flex flex-col gap-3">
        <Label htmlFor="Especialidadesmedica">Especialidades medica*</Label>
        <Controller
          control={control}
          name="specialty"
          rules={{ required: true }}
          render={(renderProps) => {
            return (
              <Select
                styles={colorStyles}
                className={`${errors.specialty ? " focus-visible:ring-red-500 border-red-500  rounded-md  border-2" : ""}`}
                id="Especialidadesmedica"
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={especialidadesMedicas}
                menuPlacement="auto"
                isSearchable={false}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                {...register("specialty", {
                  required: {
                    value: true,
                    message: " o campo Especialidades medica é obrigatorio"
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
        <p className="min-h-4 text-sm  font-bold text-red-500">
          {errors.specialty ? errors.specialty.message : ""}
        </p>
      </div>
      <div className="col-span-1 flex flex-col gap-3">
        <Label htmlFor="convenio">Convenio*</Label>
        <Controller
          control={control}
          name="healthInsurance"
          rules={{ required: true }}
          render={(renderProps) => {
            return (
              <Select
                className={`${errors.healthInsurance ? " focus-visible:ring-red-500 border-red-500  rounded-md  border-2" : ""}`}
                styles={colorStyles}
                id="convenio"
                components={animatedComponents}
                isMulti
                options={convenios}
                menuPlacement="auto"
                isSearchable={false}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                {...register("healthInsurance", {
                  required: {
                    value: true,
                    message: " o campo Convenio é obrigatorio"
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
        <p className="min-h-4 text-sm  font-bold text-red-500">
          {errors.healthInsurance ? errors.healthInsurance.message : ""}
        </p>
      </div>
    </fieldset>
  );
}

export default StepThree;
