"use client";
import React from "react";
import { SubmitHandler} from "react-hook-form";
import { useMyAccount } from "./_hook/useMyAccount";


import { convenios } from "@/shared/utils";

import { Button } from "@/components/ui/button";
import { MyAccountFormData } from "./_schema/my-account-schema";
import { RHFInput } from "@/components/RHFInput";
import { RHFSelect } from "@/components/RHFSelect";



export default function Page() {
  const { myAccountForm } = useMyAccount({ initialValues: {} });
  const {
    handleSubmit,
    control,
  } = myAccountForm;

  const onSubmit: SubmitHandler<MyAccountFormData> = async (data) => {
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
            className="flex w-full flex-col items-center px-10 py-16 gap-5 "
            onSubmit={handleSubmit((e) => onSubmit(e))}
          >
            <fieldset className="grid w-full grid-cols-2 items-center gap-2 ">
              <RHFInput<MyAccountFormData>
                type="text"
                className="input-with-icon col-span-2 "
                placeholder="Nome da clínica "
                label="Nome da clínica*"
                name="name"
                control={control}
              />
              <RHFInput<MyAccountFormData>
                type="text"
                className="input-with-icon col-span-2 "
                placeholder="CNPJ da clínica "
                label="CNPJ da clínica*"
                name="cnpj"
                mask="CNPJ"
                control={control}
              />
              <div className="col-span-2 flex flex-col gap-3">
                <RHFSelect<MyAccountFormData>
                  name="healthInsurance"
                  control={control}
                  options={convenios}
                  isMulti
                  placeholder="Selecionar"
                  label="Convênio*"
                  className="z-50"
                />
              
              </div>
              <RHFInput<MyAccountFormData>
                id="phone"
                mask="PHONE"
                type="tel"
                name="phone"
                className=" input-with-icon"
                placeholder="(00) 0000-0000"
                label="Telefone*"
                control={control}
              />

              <RHFInput<MyAccountFormData>
                id="cellPhone"
                mask="CELLPHONE"
                name="cellPhone"
                type="tel"
                className=" input-with-icon"
                placeholder="(00) 00000-0000"
                label="Celular*"
                control={control}
              />

              <RHFInput<MyAccountFormData>
                className=" input-with-icon"
                mask="CEP"
                placeholder="CEP"
                label="Cep*"
                id="cep"
                type="text"
                name="zipcode"
                control={control}
              />
              <RHFInput<MyAccountFormData>
                className=" input-with-icon"
                placeholder="Estado"
                label="Estado*"
                id="state"
                type="text"
                name="state"
                control={control}
              />
              <RHFInput<MyAccountFormData>
                className="input-with-icon"
                placeholder="Numero"
                label="Numero*"
                id="houseNumber"
                name="houseNumber"
                control={control}
              />
              <RHFInput<MyAccountFormData>
                className=" input-with-icon "
                placeholder="Cidade"
                label="Cidade*"
                id="city"
                type="text"
                name="city"
                control={control}
              />
              <RHFInput<MyAccountFormData>
                className=" input-with-icon"
                placeholder="Logradouro"
                label="Logradouro*"
                id="address"
                type="text"
                name="address"
                control={control}
              />
              <RHFInput<MyAccountFormData>
                className="input-with-icon"
                placeholder="Bairro"
                label="Bairro*"
                id="neighborhood"
                type="text"
                name="neighborhood"
                control={control}
              />

              <RHFInput<MyAccountFormData>
                className="input-with-icon col-span-2"
                placeholder="Complemento"
                label="Complemento"
                id="addressComplement"
                type="text"
                name="addressComplement"
                control={control}
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
