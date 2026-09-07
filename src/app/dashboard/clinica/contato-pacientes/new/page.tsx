"use client";

import Link from "next/link";
import React from "react";
import { SubmitHandler, useWatch } from "react-hook-form";

import avatarImageDefault from "@/assets/foto-pessoal.svg";
import { RHFInput } from "@/components/RHFInput";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useDialogWebCam from "@/components/webcam";
import { ChevronLeft } from "lucide-react";

import { useCreatePacient } from "./_hook/useCreatePacient";
import { CreatePacientFormData } from "./_schema/create-pacient-schema";

export default function Page() {
  const { createPacientForm } = useCreatePacient({});
  const { DialogComponentWebCam, handleOpenModalWebCam, capturedImage } =
    useDialogWebCam();

  const formValues = useWatch({ control: createPacientForm.control });

  const onSubmit: SubmitHandler<CreatePacientFormData> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex  w-full flex-1 flex-col  items-start  p-8 ">
        <div className="flex w-full flex-col  gap-8">
          <Link
            href="/dashboard/clinica"
            className="mb-6 flex  items-center gap-2 text-start font-semibold text-black transition-all hover:underline"
          >
            <ChevronLeft size={24} strokeWidth={4} />
            <h2 className=" w-full text-start  font-museo text-2xl font-semibold">
              Contato dos pacientes
            </h2>
          </Link>
          <div className="relative min-h-[600px] w-full  rounded-md bg-agenda-saude-purple-300 ">
            <div className="absolute -top-10 left-1/2 flex h-20 w-80 -translate-x-1/2 transform items-center justify-center rounded-md bg-agenda-saude-green-100">
              <p className="text-2xl font-bold text-white">Contato</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 px-5  md:px-10">
              <form
                className="flex w-full flex-col items-center px-10 py-16 "
                onSubmit={createPacientForm.handleSubmit(onSubmit)}
              >
                <fieldset className="flex w-full flex-col items-center gap-2  ">
                  <div className="col-span-2 flex flex-col items-center justify-center gap-6">
                    <Avatar className="h-28 w-28">
                      <AvatarImage
                        src={capturedImage || avatarImageDefault}
                        alt="foto_perfil"
                        className="object-centere object-cover"
                      />
                      <AvatarFallback>
                        {formValues.name
                          ? formValues.name.slice(0, 2).toUpperCase()
                          : "EX"}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      onClick={handleOpenModalWebCam}
                      type="button"
                      variant="default"
                      size="sm"
                      className="hover:bg-agenda-saude-green-200/90 rounded-full bg-agenda-saude-green-100 p-2 text-agenda-saude-blue-100"
                    >
                      Tirar foto
                    </Button>
                  </div>
                  <RHFInput<CreatePacientFormData>
                    name="name"
                    type="text"
                    control={createPacientForm.control}
                    label="Nome completo*"
                    placeholder="Nome completo"
                  />
                  <RHFInput<CreatePacientFormData>
                    name="phone"
                    type="text"
                    control={createPacientForm.control}
                    label="Telefone*"
                    placeholder="Telefone"
                    mask="PHONE"
                  />
                  <RHFInput<CreatePacientFormData>
                    name="cellphone"
                    type="text"
                    control={createPacientForm.control}
                    label="Celular*"
                    placeholder="Celular"
                    mask="CELLPHONE"
                  />
                  <RHFInput<CreatePacientFormData>
                    name="email"
                    type="email"
                    control={createPacientForm.control}
                    label="Email*"
                    placeholder="Email"
                  />
                  <RHFInput<CreatePacientFormData>
                    name="cpf"
                    type="text"
                    control={createPacientForm.control}
                    label="CPF*"
                    placeholder="CPF"
                    mask="CPF"
                  />
                </fieldset>

                <div className="mt-6 flex w-full items-center justify-center gap-4">
                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className=" hover:bg-agenda-saude-green-200/90 bg-agenda-saude-green-100 font-poppins text-lg font-semibold text-agenda-saude-blue-100"
                  >
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <DialogComponentWebCam />
    </>
  );
}
