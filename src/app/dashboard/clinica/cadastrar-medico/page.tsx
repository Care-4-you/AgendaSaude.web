"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";

// eslint-disable-next-line import-helpers/order-imports
import { UseSeachDoctor } from "@/Api/clinic/useSerachDoctor";
import { RHFInput } from "@/components/RHFInput";
import { RHFSelect } from "@/components/RHFSelect";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { ChevronLeft } from "lucide-react";
import { setCookie } from "nookies";

import { UFs } from "@/shared/utils";

import { useCreateDoctor } from "./_hook/useCreateDoctor";
import { CreateDoctorFormData } from "./_schema/create-doctor-schema";

export default function Page() {
  const { createDoctorForm } = useCreateDoctor({});

  const route = useRouter();
  const { DoctorData } = UseSeachDoctor({
    councilsNumber: createDoctorForm.watch("CRM"),
    councilsUF: createDoctorForm.watch("UF.value")
  });

  const [openModal, setOpenModal] = useState(false);

  const onSubmit: SubmitHandler<CreateDoctorFormData> = async (data) => {
    setCookie({}, "@Saude:CreateDoctorAccountData", JSON.stringify(data), {
      path: "/"
    });

    if (DoctorData && DoctorData.exists === true) {
      setTimeout(() => {
        setOpenModal(true);
      }, 1000);
      return;
    }
    setTimeout(() => {
      setOpenModal(true);
    }, 1000);
  };

  const createDoctorAccount = () => {
    route.push("/register-doctor");
  };

  return (
    <>
      <div className="flex  w-full flex-1 flex-col  items-center  lg:items-start ">
        <Link
          href="/dashboard/clinica"
          className="mb-6 flex  items-center gap-2 text-start font-bold text-black transition-all hover:underline"
        >
          <ChevronLeft size={32} strokeWidth={4} />
          <h2 className=" w-full text-start  font-museo text-3xl font-bold">
            Cadastrar médico
          </h2>
        </Link>
        <form
          className="flex h-[600px] w-full  flex-col  gap-20 rounded-3xl bg-agenda-saude-purple-300 p-12"
          onSubmit={createDoctorForm.handleSubmit(onSubmit)}
        >
          <fieldset className=" grid grid-cols-1 gap-2  ">
            <RHFSelect<CreateDoctorFormData>
              options={UFs}
              id="UF"
              name="UF"
              className="col-span-4 "
              placeholder="UF"
              label="UF*"
              control={createDoctorForm.control}
            />

            <RHFInput<CreateDoctorFormData>
              id="councilsNumber"
              name="CRM"
              label="Número do Conselho*"
              placeholder="9999999"
              control={createDoctorForm.control}
            />
          </fieldset>
          <Button
            variant={"secondary"}
            type="submit"
            className="inline-flex h-11 w-full max-w-64 self-center   justify-self-center  rounded-lg bg-white text-black hover:bg-white/90"
          >
            Buscar
          </Button>
        </form>
      </div>

      <Dialog
        open={openModal}
        defaultOpen={openModal}
        modal
        onOpenChange={() => setOpenModal((prev) => !prev)}
      >
        {DoctorData?.exists ? (
          <DialogContent className=" flex  w-full max-w-[750px] flex-col  items-center justify-around gap-4 bg-agenda-saude-blue-100  ">
            <DialogHeader className=" gap-5">
              <DialogTitle className="text-center font-museo  text-2xl font-semibold  text-[#181819]">
                O médico {DoctorData.name} já possui cadastro em nossa
                plataforma.
              </DialogTitle>
              <DialogDescription className="text-center font-museo  text-2xl font-semibold  text-[#181819]">
                Você deseja convidá-lo para fazer parte do quadro da clínica?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className=" flex flex-row items-center gap-4 sm:justify-center">
              <Button
                type="button"
                className="h-12 w-40 bg-agenda-saude-purple-100  text-xl text-white"
                onClick={() => {
                  alert("Adicionado com sucesso !");
                }}
              >
                Sim
              </Button>
              <Button
                type="button"
                className="h-12 w-40 bg-agenda-saude-purple-100 text-xl text-white"
                onClick={() => setOpenModal((prev) => !prev)}
              >
                Não
              </Button>
            </DialogFooter>
          </DialogContent>
        ) : (
          <DialogContent className=" flex  w-full max-w-[750px] flex-col items-center  justify-around gap-4 bg-agenda-saude-blue-100  ">
            <DialogHeader className=" gap-5">
              <DialogTitle className="text-center font-museo  text-2xl font-semibold  text-[#181819]">
                Esse médico não possui cadastro em nossa plataforma
              </DialogTitle>
              <DialogDescription className="text-center font-museo  text-2xl font-semibold  leading-6 text-[#181819]">
                Você deseja cadastrar o médico?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className=" flex flex-row items-center gap-4 sm:justify-center">
              <Button
                type="button"
                className="h-12 w-40 bg-agenda-saude-purple-100  text-xl text-white"
                onClick={createDoctorAccount}
              >
                Sim
              </Button>
              <Button
                type="button"
                className="h-12 w-40 bg-agenda-saude-purple-100 text-xl text-white"
                onClick={() => setOpenModal((prev) => !prev)}
              >
                Não
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
