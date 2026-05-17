"use client";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { convenios } from "../../../shared/utils";

import { isValidCNPJ } from "../../../components/clinicRegistrationForm/stepFour";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { ClinicaFormData } from "../../../shared/interfaces/IClinica";

const animatedComponents = makeAnimated();

export default function Page() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ClinicaFormData>();

  const onSubmit: SubmitHandler<ClinicaFormData> = (data, event) => {
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
            <fieldset className="grid w-full grid-cols-2 items-center gap-x-2   ">
              <Input
                labelClassName="text-white"
                id="name"
                type="text"
                className="input-with-icon col-span-2 "
                placeholder="Nome da clínica "
                label="Nome da clínica*"
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
                id="CNPJ"
                mask="cnpj"
                type="text"
                className="input-with-icon col-span-2"
                placeholder="XX.XXX.XXX/0001-XX"
                label="CNPJ*"
                {...register("cnpj", {
                  required: {
                    value: true,
                    message: "Campo é obrigatório"
                  },
                  pattern: {
                    value: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
                    message: "Formato inválido"
                  },
                  validate: (value) => isValidCNPJ(value) || "CNPJ inválido"
                })}
                error={errors.cnpj ? errors.cnpj.message : ""}
              />
              <div className="col-span-2 flex flex-col gap-3">
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
                        styles={{
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          control: (styles: any) => ({
                            ...styles,
                            minHeight: "2.75em"
                          })
                        }}
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
                            message: "Campo é obrigatório"
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
              <Input
                labelClassName="text-white"
                id="phone"
                mask="phone"
                type="tel"
                className=" input-with-icon"
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
                className=" input-with-icon"
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
              <Input
                labelClassName="text-white"
                className=" input-with-icon"
                mask="cep"
                placeholder="CEP"
                label="Cep*"
                id="cep"
                type="text"
                {...register("cep", {
                  required: {
                    value: true,
                    message: "Campo é obrigatório"
                  },
                  pattern: {
                    value: /^\d{5}-\d{3}$/,
                    message: "Formato inválido"
                  }
                })}
                error={errors.cep ? errors.cep.message : ""}
              />
              <Input
                labelClassName="text-white"
                className=" input-with-icon"
                placeholder="Estado"
                label="Estado*"
                id="state"
                type="text"
                {...register("state", {
                  required: {
                    value: true,
                    message: "Campo é obrigatório"
                  }
                })}
                error={errors.state ? errors.state.message : ""}
              />
              <Input
                labelClassName="text-white"
                className=" input-with-icon"
                placeholder="Logradouro"
                label="Logradouro*"
                id="address"
                type="text"
                {...register("address", {
                  required: {
                    value: true,
                    message: "Campo é obrigatório"
                  },
                  maxLength: 255
                })}
                error={errors.address ? errors.address.message : ""}
              />
              <Input
                labelClassName="text-white"
                mask="number"
                className=" input-with-icon"
                placeholder="Numero"
                label="Numero*"
                id="houseNumber"
                type="text"
                {...register("houseNumber", {
                  required: {
                    value: true,
                    message: "Campo obrigatório"
                  }
                })}
                error={errors.houseNumber ? errors.houseNumber.message : ""}
              />

              <Input
                labelClassName="text-white"
                className=" input-with-icon "
                placeholder="Cidade"
                label="Cidade*"
                id="city"
                type="text"
                {...register("city", {
                  required: {
                    value: true,
                    message: "Campo é obrigatório"
                  }
                })}
                error={errors.city ? errors.city.message : ""}
              />
              <Input
                labelClassName="text-white"
                className="input-with-icon"
                placeholder="Bairro"
                label="Bairro*"
                id="neighborhood"
                type="text"
                {...register("neighborhood", {
                  required: {
                    value: true,
                    message: "Campo é obrigatório"
                  }
                })}
                error={errors.neighborhood ? errors.neighborhood.message : ""}
              />
              <Input
                labelClassName="text-white"
                className="input-with-icon col-span-2"
                placeholder="Complemento"
                label="Complemento"
                id="addressComplement"
                {...register("addressComplement")}
                type="text"
              />
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
