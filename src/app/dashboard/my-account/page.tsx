"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";

import { RHFInput } from "@/components/RHFInput";
import { RHFSelect } from "@/components/RHFSelect";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { ChevronLeft } from "lucide-react";

import { convenios } from "@/shared/utils";

import { useAuth } from "../../../hooks/auth";
import { useMyAccount } from "./_hook/useMyAccount";
import { MyAccountFormData } from "./_schema/my-account-schema";

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const { myAccountForm } = useMyAccount({
    initialValues: {
      name: user.name || "",
      cnpj: user.document || "",
      healthInsurance: user.healthInsurance || [],
      phone: user.phone || "",
      cellPhone: user.cellphone || "",
      zipcode: user.zipcode || "",
      state: user.state || "",
      city: user.city || "",
      neighborhood: user.neighborhood || "",
      address: user.address || "",
      houseNumber: user.houseNumber || "",
      hasNumber: true,
      addressComplement: user.addressComplement || ""
    }
  });
  const { handleSubmit, control } = myAccountForm;
  const isClinic = user?.role === "USER";

  const onSubmit: SubmitHandler<MyAccountFormData> = async (data) => {
    console.log(data);
    setOpenModal(true);
  };

  const backtoLogin = () => {
    setOpenModal((prev) => !prev);
    router.push("/dashboard");
  };

  return (
    <div className="w-full flex-1 flex-col items-start p-8">
      <div className="flex w-full flex-col items-start gap-8">
        <Link
          href="/dashboard"
          className="mb-6 flex  items-center gap-2 text-start font-semibold text-black transition-all hover:underline"
        >
          <ChevronLeft size={24} strokeWidth={4} />
          <h2 className=" w-full text-start  font-museo text-2xl font-semibold">
            Dados cadastrais
          </h2>
        </Link>
        <div className="relative  w-full rounded-md  bg-agenda-saude-purple-300 ">
          <div className="absolute -top-10 left-1/2 z-50 flex h-20 w-80 -translate-x-1/2 transform items-center justify-center rounded-md bg-agenda-saude-green-100">
            <p className="text-2xl font-bold text-white">Dados cadastrais</p>
          </div>
          <form
            className="flex w-full  flex-col items-center gap-5 px-10 py-10 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <fieldset className="scroll-custom grid w-full grid-cols-2 items-center gap-2 p-4 md:max-h-[600px]  md:overflow-y-auto  ">
              <RHFInput<MyAccountFormData>
                type="text"
                className="input-with-icon col-span-2 "
                placeholder="Nome da clínica "
                label="Nome da clínica*"
                name="name"
                control={control}
              />
              {isClinic ? (
                <RHFInput<MyAccountFormData>
                  type="text"
                  className="input-with-icon col-span-2 "
                  placeholder="CNPJ da clínica "
                  label="CNPJ da clínica*"
                  name="cnpj"
                  mask="CNPJ"
                  control={control}
                />
              ) : (
                <RHFInput<MyAccountFormData>
                  type="text"
                  className="input-with-icon col-span-2 "
                  placeholder="CPF "
                  label="CPF*"
                  name="cnpj"
                  mask="CPF"
                  control={control}
                />
              )}

              {isClinic && (
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
              )}
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

      <Dialog
        open={openModal}
        defaultOpen={openModal}
        modal
        onOpenChange={() => setOpenModal((prev) => !prev)}
      >
        <DialogContent className=" max-w-60 items-center rounded-md bg-agenda-saude-blue-100 sm:max-w-2xl">
          <DialogHeader className="gap-5">
            <DialogTitle className=" self-center text-center text-2xl  font-semibold text-black">
              Você tem certeza que deseja alterar o dados de cadastro para o
              novo informado?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className=" flex w-full items-center sm:justify-around">
            <Button
              type="submit"
              variant="default"
              size="lg"
              className=" hover:bg-agenda-saude-green-200/90 bg-agenda-saude-purple-100 font-poppins text-lg font-semibold text-agenda-saude-blue-100"
              onClick={backtoLogin}
            >
              Sim
            </Button>
            <Button
              type="submit"
              variant="default"
              size="lg"
              className=" hover:bg-agenda-saude-green-200/90 bg-agenda-saude-purple-100 font-poppins text-lg font-semibold text-agenda-saude-blue-100"
              onClick={() => setOpenModal((prev) => !prev)}
            >
              Não
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
