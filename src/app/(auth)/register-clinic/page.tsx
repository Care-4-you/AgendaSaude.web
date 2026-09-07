"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import iconplus from "@/assets/icon-plus.png";
import { default as LayoutContainer } from "@/components/layout/container";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { Button } from "../../../components/ui/button";
import { useClinicStore } from "../../../lib/store/clinic-store";
import { MultiStepForm } from "./_components/multi-step-form";

export default function registerClinical() {
  const [openModal, setOpenModal] = useState(false);
  const { isCompleted, resetForm } = useClinicStore();
  const router = useRouter();

  function sendEmail() {
    setOpenModal(false);
    resetForm();
    router.push("/");
  }
  useEffect(() => {
    if (isCompleted === true) {
      setOpenModal(true);
    }
  }, [isCompleted]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-agenda-saude-blue-100 from-50% to-agenda-saude-purple-200 to-50% pt-16 md:bg-gradient-to-r">
        <LayoutContainer className="flex min-h-screen flex-col px-0 md:flex-row ">
          <div className="flex flex-1 justify-center bg-agenda-saude-blue-100 p-8  md:justify-start 2xl:p-0 ">
            <hgroup className="max-w-[27rem] p-4 md:p-0 md:pt-16">
              <h2 className="mb-7 font-museo text-3xl font-semibold text-black xs:text-5xl xs:leading-[150%]">
                Dê o primeiro passo para uma jornada de saúde facilitada.
              </h2>
              <p className="text-lg font-medium text-gray-900">
                Ao se cadastrar, você abre as portas para uma rede de saúde que
                conecta você a clínicas e especialistas dedicados. Cuide-se com
                mais facilidade e encontre o suporte que precisa para uma vida
                mais saudável e equilibrada. Vamos juntos nessa jornada?
              </p>
            </hgroup>
          </div>

          <div className=" flex min-h-screen flex-1 flex-col items-center justify-start bg-agenda-saude-purple-200 md:items-end">
            <div className="max-w-2xl px-8 py-16 md:pl-14">
              <Image alt="Logo" src={iconplus} height={42} width={40} />
              <h3 className="my-2.5 font-museo text-[32px] font-semibold text-white">
                Saúde ao seu alcance, comece agora.
              </h3>
              <span className="font-poppins text-base font-medium text-white">
                Preencha suas informações e descubra a diferença que um bom
                cuidado pode fazer.
              </span>

              <MultiStepForm />
            </div>
          </div>
        </LayoutContainer>
      </div>
      <Dialog
        open={openModal}
        defaultOpen={openModal}
        modal
        onOpenChange={() => setOpenModal((prev) => !prev)}
      >
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader className="gap-5">
            <DialogTitle className="text-center text-5xl font-semibold  text-black">
              Cadastro realizado com sucesso
            </DialogTitle>
            <DialogDescription className="text-center text-base  font-normal leading-6  text-[#2D2E2E]">
              Confirme sua conta através do link enviado para seu e-mail
              cadastrado.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="   flex items-center sm:justify-center">
            <Button
              type="submit"
              className="w-2/5 px-4 py-7 text-white"
              onClick={sendEmail}
            >
              Concluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
