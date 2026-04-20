"use client";

import Link from "next/link";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { TbUserHeart } from "react-icons/tb";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

export default function useDialogLogin() {
  const [openModal, setOpenModal] = useState(false);

 const handleOpenModal = () => {
  setOpenModal(true);  
};

const handleCloseModal = () => {
  setOpenModal(false);  
};
  const DialogComponent = () => {
    return (
      <Dialog
        open={openModal}
        modal
        onOpenChange={setOpenModal} 
      >
        <DialogContent className="min-h-[530px] max-w-2xl !rounded-3xl bg-[#EBFFFD] lg:max-w-5xl">
          <div className="flex w-full flex-col gap-7 py-11">
            <DialogHeader className="gap-2">
              <DialogTitle className="text-center font-museo text-[32px] font-bold text-black">
                O cuidado certo está mais perto do que você imagina
              </DialogTitle>
              <DialogDescription className="text-center font-museo text-lg font-medium text-black">
                As melhores clínicas e profissionais de saúde prontos para
                cuidar de você
              </DialogDescription>
            </DialogHeader>
            <div className="flex !flex-col items-center justify-center gap-3">
              <Link
                href="/signin?q=paciente"
                onClick={handleCloseModal}
                className="bg- flex h-[72px] w-3/4 items-center justify-start rounded-lg bg-agenda-saude-purple-100 px-4 text-[#FBFDFD] transition-transform hover:scale-105 lg:px-9"
              >
                <div className="flex w-full items-center justify-center gap-8 lg:justify-start">
                  <FiUser size={25} />
                  <div className="flex flex-col items-start justify-start">
                    <p className="font-lg font-poppins font-semibold">
                      Paciente
                    </p>
                    <span className="hidden text-left text-sm font-medium text-[##FBFDFD] lg:block">
                      Sua saúde com confiança e encontre o atendimento ideal
                      para suas necessidades
                    </span>
                  </div>
                </div>
              </Link>

              <Link
                href="/signin?q=medico"
                onClick={handleCloseModal}
                className="flex h-[72px] w-3/4 items-center justify-start gap-6 rounded-lg border-2 bg-agenda-saude-purple-100 px-4 text-[#FBFDFD] transition-transform hover:scale-105 lg:px-9"
              >
                <div className="flex w-full items-center justify-center gap-8 lg:justify-start">
                  <TbUserHeart size={25} />
                  <div className="flex flex-col items-start justify-start">
                    <p className="font-lg font-poppins font-semibold">Médico</p>
                    <span className="hidden text-left text-sm font-medium text-[##FBFDFD] lg:block">
                      Expanda sua prática e atenda mais pacientes prontos para
                      melhorar suas vidas
                    </span>
                  </div>
                </div>
              </Link>

              <Link
                href="/signin?q=clinica"
                onClick={handleCloseModal}
                className="flex h-[72px] w-3/4 items-center justify-start gap-6 rounded-lg border-2 bg-agenda-saude-purple-100 px-4 text-[#FBFDFD] transition-transform hover:scale-105 lg:px-9"
              >
                <div className="flex w-full items-center justify-center gap-8 lg:justify-start">
                  <HiOutlineOfficeBuilding size={25} />
                  <div className="flex flex-col items-start justify-start">
                    <p className="font-lg font-poppins font-semibold">
                      Clínica
                    </p>
                    <span className="hidden text-left text-sm font-medium text-[##FBFDFD] lg:block">
                      Conecte-se com pacientes e médicos em busca do local
                      perfeito para cuidar da saúde
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return {
    DialogComponent,
    handleOpenModal,
    handleCloseModal
  };
}
