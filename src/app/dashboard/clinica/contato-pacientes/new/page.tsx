"use client";

import React, { useState } from "react";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import avatarImageDefault from "@/assets/foto-pessoal.svg";
import {
  AvatarImage,
  Avatar,
  AvatarFallback
} from "../../../../../components/ui/avatar";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import useDialogWebCam from "../../../../../components/webcam";

type props = {
  name: string;
  phone: string;
  cellPhone: string;
  email: string;
  cpf: string;
};
export default function Page() {
  const router = useRouter();
  const { DialogComponentWebCam, handleOpenModalWebCam, capturedImage } =
    useDialogWebCam();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<props>({
    defaultValues: {
      name: "",
      phone: "",
      cellPhone: "",
      email: "",
      cpf: ""
    }
  });
  const formValues = useWatch({ control: control });
  console.log(formValues.name);

  const onSubmit: SubmitHandler<props> = (data, event) => {
    event?.preventDefault();
    console.log(data);
  };

  return (
    <>
      <div className="flex w-full flex-1 items-center justify-between ">
        <div className="flex w-full flex-col  gap-8">
          <Link
            href="/dashboard/clinica"
            className="mb-6 flex  items-center gap-2 text-start font-bold text-black transition-all hover:underline"
          >
            <ChevronLeft size={32} strokeWidth={4} />
            <h2 className=" w-full text-start  font-museo text-3xl font-bold">
              Contato dos pacientes
            </h2>
          </Link>
          <div className="relative min-h-[700px] w-full  rounded-md bg-agenda-saude-purple-300 ">
            <div className="absolute -top-10 left-1/2 flex h-20 w-80 -translate-x-1/2 transform items-center justify-center rounded-md bg-agenda-saude-green-100">
              <p className="text-2xl font-bold text-white">Contato</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 px-5  md:px-10">
              <form
                className="flex w-full flex-col items-center px-10 py-16 "
                onSubmit={handleSubmit((e) => onSubmit(e))}
              >
                <fieldset className="grid w-full grid-cols-2 items-center gap-x-2  ">
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
                  <Input
                    labelClassName="text-white"
                    id="name"
                    type="text"
                    className="col-span-2"
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
                    className="col-span-2"
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
                    className="col-span-2"
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
                    className="col-span-2"
                    placeholder="Email"
                    labelClassName="text-white"
                    label="Email*"
                    id="email"
                    type="text"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Campo Email é obrigatório"
                      },
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Formato inválido Ex. exemplo@email.com"
                      }
                    })}
                    error={errors.email ? errors.email.message : ""}
                  />
                  <Input
                    labelClassName="text-white"
                    id="CPF"
                    mask="cpf"
                    type="text"
                    className="col-span-2"
                    placeholder="XX.XXX.XXX-XX"
                    label="CPF*"
                    {...register("cpf", {
                      required: {
                        value: true,
                        message: "Campo CPF é obrigatório"
                      },
                      pattern: {
                        value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                        message: "Formato inválido"
                      }
                    })}
                    error={errors.cpf ? errors.cpf.message : ""}
                  />
                </fieldset>

                <div className="flex w-full items-center justify-between gap-4">
                  <Button
                    type="button"
                    variant="default"
                    size="lg"
                    className=" hover:bg-agenda-saude-green-200/90 bg-agenda-saude-green-100 font-poppins text-lg font-semibold text-agenda-saude-blue-100"
                    onClick={() => router.back()}
                  >
                    voltar
                  </Button>
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
