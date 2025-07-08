import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { parseCookies } from "nookies";

import { councilsTypes, UFs } from "../../shared/utils";

import { DoctorFormData } from "../../shared/interfaces/IDoctor";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const animatedComponents = makeAnimated();

function StepTwo() {
  const cookies = parseCookies();
  const myArray = JSON.parse(cookies["@Saude:CreateDoctorAccountData"]);
  const {
    register,
    control,
    setValue,
    formState: { errors }
  } = useFormContext<DoctorFormData>();

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
      minHeight: "2.75em"
    })
  };

  useEffect(() => {
    if (myArray) {
      setValue("councilsNumber", myArray.number || "");
      setValue("councilsUF", myArray.state || "");
    }
  }, [myArray, setValue]);

  return (
    <fieldset className="grid grid-cols-6 gap-x-4 ">
      <div className=" col-span-6 flex flex-col gap-3 lg:col-span-3">
        <Label className="leading-5 text-white " htmlFor="state">
          Selecione o Conselho*
        </Label>
        <Controller
          control={control}
          name="councils"
          rules={{ required: true }}
          render={(renderProps) => {
            return (
              <Select
                styles={colorStyles}
                className={`${errors.councils ? " rounded-md border-2  border-red-500  focus-visible:ring-red-500" : ""}`}
                id="Especialidadesmedica"
                closeMenuOnSelect={true}
                components={animatedComponents}
                placeholder="Selecionar"
                options={councilsTypes}
                menuPlacement="auto"
                isSearchable={true}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                {...register("councils", {
                  required: {
                    value: true,
                    message: "Campo obrigatorio"
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
        <p className="min-h-6 text-sm  font-semibold text-red-500">
          {errors.councils ? errors.councils.message : ""}
        </p>
      </div>
      <div className=" col-span-6 flex flex-col gap-3 lg:col-span-3">
        <Label className="leading-5 text-white" htmlFor="state">
          Estado do conselho*
        </Label>
        <Controller
          control={control}
          name="councilsUF"
          rules={{ required: true }}
          render={(renderProps) => {
            return (
              <Select
                styles={colorStyles}
                className={`${errors.councilsUF ? " rounded-md border-2  border-red-500  focus-visible:ring-red-500" : ""}`}
                id="Especialidadesmedica"
                closeMenuOnSelect={true}
                components={animatedComponents}
                placeholder="Selecionar"
                options={UFs}
                menuPlacement="auto"
                isSearchable={true}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                {...register("councilsUF", {
                  required: {
                    value: true,
                    message: "Campo obrigatorio"
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
        <p className="min-h-6 text-sm  font-semibold text-red-500">
          {errors.councilsUF ? errors.councilsUF.message : ""}
        </p>
      </div>
      <div className=" col-span-6 flex flex-col gap-3 lg:col-span-3">
        <Label className="leading-5 text-white" htmlFor="state">
          Especialidade Médica*
        </Label>
        <Controller
          control={control}
          name="specialty"
          rules={{ required: true }}
          render={(renderProps) => {
            return (
              <Select
                styles={colorStyles}
                className={`${errors.specialty ? " rounded-md border-2  border-red-500  focus-visible:ring-red-500" : ""}`}
                id="Especialidadesmedica"
                closeMenuOnSelect={true}
                components={animatedComponents}
                placeholder="Selecionar"
                options={especialidadesMedicas}
                menuPlacement="auto"
                isSearchable={true}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                {...register("specialty", {
                  required: {
                    value: true,
                    message: "Campo obrigatorio"
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
        <p className="min-h-6 text-sm  font-semibold text-red-500">
          {errors.specialty ? errors.specialty.message : ""}
        </p>
      </div>
      <Input
        labelClassName="text-white"
        className=" col-span-6 lg:col-span-3"
        placeholder="Número do Conselho"
        label="Número do Conselho*"
        id="councilsNumber"
        type="text"
        {...register("councilsNumber", {
          required: {
            value: true,
            message: "Campo é obrigatório"
          }
        })}
        error={errors.councilsNumber ? errors.councilsNumber.message : ""}
      />
    </fieldset>
  );
}

export default StepTwo;
