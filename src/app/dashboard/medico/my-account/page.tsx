"use client";
import React, { useMemo } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch
} from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { councilsTypes, UFs } from "@/shared/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { DoctorFormData } from "@/shared/interfaces/IDoctor";

const animatedComponents = makeAnimated();

export default function Page() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<DoctorFormData>({
    defaultValues: {
      medicalRecord: [
        {
          councils: { value: "", label: "" },
          councilsUF: { value: "", label: "" }
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "medicalRecord"
  });

  const medicalRecordArray = useWatch({
    control,
    name: "medicalRecord"
  });

  const especializacoesPorConselho: Record<
    string,
    { value: string; label: string }[]
  > = {
    CRM: [
      { value: "cardiologia", label: "Cardiologia" },
      { value: "ginecologia", label: "Ginecologia" },
      { value: "urologia", label: "Urologia" },
      { value: "ortopedia", label: "Ortopedia" },
      { value: "oncologia", label: "Oncologia" },
      { value: "geriatria", label: "Geriatria" },
      { value: "oftalmologia", label: "Oftalmologia" },
      { value: "angiologia", label: "Angiologia" },
      { value: "dermatologia", label: "Dermatologia" },
      { value: "cirurgia", label: "Cirurgia" },
      { value: "clinica-geral", label: "Clínica Geral" }
    ],
    CRN: [{ value: "nutricao", label: "Nutrição" }],
    CRO: [{ value: "odontologia", label: "Odontologia" }],
    CREFITO: [{ value: "fisioterapia", label: "Fisioterapia" }]
  };

  // Combinar especialidades de todos os conselhos selecionados
  const especializacoes = useMemo(() => {
    const registrosComConselho = medicalRecordArray?.filter(
      (record) => record?.councils?.value
    );

    return (
      registrosComConselho
        ?.flatMap((record) => {
          const conselho = record.councils.value;

          return especializacoesPorConselho[conselho] ?? [];
        })
        .filter(
          (especializacao, index, array) =>
            index ===
            array.findIndex((item) => item.value === especializacao.value)
        ) ?? []
    );
  }, [medicalRecordArray]);

  const colorStyles = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: (styles: any) => ({
      ...styles,
      minHeight: "2.75em"
    })
  };

  const onSubmit: SubmitHandler<DoctorFormData> = (data, event) => {
    event?.preventDefault();
    console.log(data);
  };

  return (
    <div className="flex w-full flex-1 items-center justify-between ">
      <div className="flex w-full items-center justify-center">
        <div className=" relative  w-full rounded-md  bg-agenda-saude-purple-300 ">
          <div className="absolute -top-10 left-1/2 flex h-20 w-80 -translate-x-1/2 transform items-center justify-center rounded-md bg-agenda-saude-green-100">
            <p className="text-2xl font-bold text-white">Dados cadastrais</p>
          </div>
          <form
            className="flex w-full flex-col items-center px-10 py-16 "
            onSubmit={handleSubmit((e) => onSubmit(e))}
          >
            <fieldset className="grid w-full grid-cols-6 items-center gap-x-2   ">
              <Input
                labelClassName="text-white"
                id="name"
                type="text"
                className="input-with-icon col-span-6 "
                placeholder="Nome completo"
                label="Nome completo*"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Campo é obrigatório"
                  },
                  maxLength: 255
                })}
                error={errors.name ? errors.name.message : ""}
              />
              <Input
                labelClassName="text-white"
                id="phone"
                mask="phone"
                type="tel"
                className="input-with-icon col-span-3"
                placeholder="(00) 0000-0000"
                label="Telefone*"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Campo é obrigatório"
                  },
                  pattern: {
                    value:
                      /^\(?(?:(?:\+|00)?(55)\s?)?(?:(?:(?:(?:\d{2})|\((?:0?[1-9]|[1-9][0-9])\))\s?)?(?:[2-9]\d{3})[-.\s]?(\d{4}))$/,
                    message: "Formato inválido"
                  }
                })}
                error={errors.phone ? errors.phone.message : ""}
              />
              <Input
                labelClassName="text-white"
                id="cellPhone"
                mask="cellphone"
                type="tel"
                className=" input-with-icon col-span-3"
                placeholder="(00) 00000-0000"
                label="Celular*"
                {...register("cellPhone", {
                  required: {
                    value: true,
                    message: "Campo é obrigatório"
                  },
                  pattern: {
                    value:
                      /^\(?(?:(?:\+|00)?(55)\s?)?(?:(?:(?:(?:\d{2})|\((?:0?[1-9]|[1-9][0-9])\))\s?)?(?:9\d{4})[-.\s]?(\d{4}))$/,
                    message: "Formato inválido"
                  }
                })}
                error={errors.cellPhone ? errors.cellPhone.message : ""}
              />

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="col-span-6 grid w-full grid-cols-6 items-center gap-x-2"
                >
                  <div className=" col-span-3 flex flex-col gap-3 ">
                    <Label className="leading-5 text-white " htmlFor="state">
                      Conselho*
                    </Label>
                    <Controller
                      control={control}
                      name={`medicalRecord.${index}.councils` as const}
                      rules={{ required: true }}
                      render={(renderProps) => {
                        return (
                          <Select
                            styles={colorStyles}
                            className={`${errors.medicalRecord?.[index]?.councils ? " rounded-md border-2  border-red-500  focus-visible:ring-red-500" : ""}`}
                            id="councils"
                            closeMenuOnSelect={true}
                            components={animatedComponents}
                            placeholder="Selecionar"
                            options={councilsTypes}
                            menuPlacement="auto"
                            isSearchable={true}
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            {...register(
                              `medicalRecord.${index}.councils` as const,
                              {
                                required: {
                                  value: true,
                                  message: "Campo obrigatorio"
                                }
                              }
                            )}
                            {...renderProps.field}
                            onChange={(e) => {
                              renderProps.field.onChange(e);
                            }}
                          />
                        );
                      }}
                    />
                    <p className="min-h-6 text-sm  font-semibold text-red-500">
                      {errors.medicalRecord?.[index]?.councils?.message ?? ""}
                    </p>
                  </div>
                  <div
                    className={`${fields.length > 1 ? "col-span-2" : "col-span-3"} flex flex-col gap-3`}
                  >
                    <Label className="leading-5 text-white" htmlFor="state">
                      Estado do conselho*
                    </Label>
                    <Controller
                      control={control}
                      name={`medicalRecord.${index}.councilsUF` as const}
                      rules={{ required: true }}
                      render={(renderProps) => {
                        return (
                          <Select
                            styles={colorStyles}
                            className={`${errors.medicalRecord?.[index]?.councilsUF ? " rounded-md border-2  border-red-500  focus-visible:ring-red-500" : ""}`}
                            id="Especialidadesmedica"
                            closeMenuOnSelect={true}
                            components={animatedComponents}
                            placeholder="Selecionar"
                            options={UFs}
                            menuPlacement="auto"
                            isSearchable={true}
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            {...register(
                              `medicalRecord.${index}.councilsUF` as const,
                              {
                                required: {
                                  value: true,
                                  message: "Campo obrigatorio"
                                }
                              }
                            )}
                            {...renderProps.field}
                            onChange={(e) => {
                              renderProps.field.onChange(e);
                            }}
                          />
                        );
                      }}
                    />
                    <p className="min-h-6 text-sm  font-semibold text-red-500">
                      {errors.medicalRecord?.[index]?.councilsUF?.message ?? ""}
                    </p>
                  </div>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      size="icon"
                      variant={"destructive"}
                      onClick={() => remove(index)}
                      className=" col-span-1 min-h-[46px] w-full "
                    >
                      X
                    </Button>
                  )}

                  <Input
                    labelClassName="text-white"
                    className={` col-span-6  `}
                    placeholder="Número do Conselho"
                    label="Número do Conselho*"
                    id="councilsNumber"
                    type="text"
                    {...register(
                      `medicalRecord.${index}.councilsNumber` as const,
                      {
                        required: {
                          value: true,
                          message: "Campo é obrigatório"
                        }
                      }
                    )}
                    error={
                      errors.medicalRecord?.[index]?.councilsNumber?.message ??
                      ""
                    }
                  />
                </div>
              ))}

              <Button
                type="button"
                size="lg"
                onClick={() =>
                  append({
                    councilsNumber: "",
                    councils: { value: "", label: "" },
                    councilsUF: { value: "", label: "" }
                  })
                }
                className="hover:bg-agenda-saude-green-200/90 min-h-10! col-span-6  my-2 w-full bg-agenda-saude-green-100"
              >
                + Adicionar conselhos
              </Button>

              <div className=" col-span-6 flex flex-col gap-3 ">
                <Label className="leading-5 text-white" htmlFor="state">
                  Especialidade *
                </Label>
                <Controller
                  control={control}
                  name="specialty"
                  rules={{ required: true }}
                  render={(renderProps) => {
                    return (
                      <Select
                        isMulti
                        styles={colorStyles}
                        className={`${errors.specialty ? " rounded-md border-2  border-red-500  focus-visible:ring-red-500" : ""}`}
                        id="Especialidadesmedica"
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        placeholder="Selecionar"
                        options={especializacoes}
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
                  {errors.specialty?.message ?? ""}
                </p>
              </div>
            </fieldset>

            <Button
              type="submit"
              variant="default"
              size="lg"
              className=" hover:bg-agenda-saude-green-200/90 bg-agenda-saude-green-100 font-poppins text-lg font-semibold text-agenda-saude-blue-100"
            >
              Salvar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
