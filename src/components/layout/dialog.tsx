"use client";

import { useRouter } from "next/navigation";
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

export default function useDialog() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isLogin, setIsLogin] = useState<"LOGIN" | "CADASTRO">("LOGIN");

  const handleModalLogin = () => {
    setOpenModal(!openModal);
    setIsLogin("LOGIN");
  };

  const handleModalCadastro = () => {
    setOpenModal(!openModal);
    setIsLogin("CADASTRO");
  };

  const handleCloseModal = (path: string) => {
    setOpenModal(!openModal);
    router.push(`${path}`);
  };

  const DialogComponent = () => {
    return (
      <Dialog
        open={openModal}
        defaultOpen={openModal}
        modal
        onOpenChange={() => setOpenModal((prev) => !prev)}
      >
        <DialogContent className="min-h-[530px] max-w-2xl !rounded-3xl bg-[#EBFFFD] lg:max-w-5xl">
          <div className="flex w-full flex-col gap-7 py-11">
            <DialogHeader className="gap-2">
              <DialogTitle className="font-MuseoModerno text-center text-[32px] font-bold text-black">
                {isLogin === "LOGIN"
                  ? "O cuidado certo está mais perto do que você imagina"
                  : "Cadastrar"}
              </DialogTitle>
              <DialogDescription className="font-MuseoModerno text-center text-lg font-medium text-black">
                {isLogin === "LOGIN"
                  ? "As melhores clínicas e profissionais de saúde prontos para cuidar de você"
                  : " Cadastre uma conta em nosso serviço"}
              </DialogDescription>
            </DialogHeader>
            <div className="flex !flex-col items-center justify-center gap-3">
              <button
                onClick={() =>
                  handleCloseModal(
                    isLogin === "LOGIN" ? "/signin" : "/register-paciente"
                  )
                }
                className="bg- flex h-[72px] w-3/4 items-center justify-start rounded-lg bg-agenda-saude-purple-100 px-4 text-[#FBFDFD] transition-transform hover:scale-105 lg:px-9"
              >
                <div className="flex w-full items-center justify-center gap-8 lg:justify-start">
                  <FiUser size={25} />
                  <div className="flex flex-col items-start justify-start">
                    <p className="font-lg font-Poppins font-semibold">
                      Paciente
                    </p>
                    <span className="hidden text-left text-sm font-medium text-[##FBFDFD] lg:block">
                      Sua saúde com confiança e encontre o atendimento ideal
                      para suas necessidades
                    </span>
                  </div>
                </div>
              </button>
              {isLogin === "LOGIN" && (
                <button
                  onClick={() =>
                    handleCloseModal(
                      isLogin === "LOGIN" ? "/signin" : "/register-paciente"
                    )
                  }
                  className="flex h-[72px] w-3/4 items-center justify-start gap-6 rounded-lg border-2 bg-agenda-saude-purple-100 px-4 text-[#FBFDFD] transition-transform hover:scale-105 lg:px-9"
                >
                  <div className="flex w-full items-center justify-center gap-8 lg:justify-start">
                    <TbUserHeart size={25} />
                    <div className="flex flex-col items-start justify-start">
                      <p className="font-lg font-Poppins font-semibold">
                        Médico
                      </p>
                      <span className="hidden text-left text-sm font-medium text-[##FBFDFD] lg:block">
                        Expanda sua prática e atenda mais pacientes prontos para
                        melhorar suas vidas
                      </span>
                    </div>
                  </div>
                </button>
              )}
              <button
                onClick={() =>
                  handleCloseModal(
                    isLogin === "LOGIN" ? "/signin" : "/register-clinic"
                  )
                }
                className="flex h-[72px] w-3/4 items-center justify-start gap-6 rounded-lg border-2 bg-agenda-saude-purple-100 px-4 text-[#FBFDFD] transition-transform hover:scale-105 lg:px-9"
              >
                <div className="flex w-full items-center justify-center gap-8 lg:justify-start">
                  <HiOutlineOfficeBuilding size={25} />
                  <div className="flex flex-col items-start justify-start">
                    <p className="font-lg font-Poppins font-semibold">
                      Clínica
                    </p>
                    <span className="hidden text-left text-sm font-medium text-[##FBFDFD] lg:block">
                      Conecte-se com pacientes e médicos em busca do local
                      perfeito para cuidar da saúde
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return {
    DialogComponent,
    handleModalLogin,
    handleCloseModal,
    handleModalCadastro
  };
}
