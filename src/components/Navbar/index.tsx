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

import Button from "../Button";
import Logo from "../Logo";
import MaxWidthWrapper from "../MaxWidthWrapper";

export default function Navbar() {
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

  return (
    <nav className="bg-[#3E31AE] p-4">
      <MaxWidthWrapper className=" mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <ul className="flex space-x-4">
            <li className="ml-3 list-none text-xl font-bold text-white">
              <Logo
                imagePath={"/logo_agenda_saude.png"}
                height={150}
                width={170}
              />
            </li>
          </ul>
        </div>
        <ul className="flex space-x-4 mr-4">
          <li>
            <Button
              variant="plain"
              className="text-lg font-Poppins"
              onClick={handleModalLogin}
            >
              Entrar
            </Button>
          </li>
          <li>
            <Button
              variant="plain"
              onClick={handleModalCadastro}
              className="text-lg font-Poppins"
            >
              Cadastrar
            </Button>
          </li>
        </ul>
      </MaxWidthWrapper>
      <Dialog
        open={openModal}
        defaultOpen={openModal}
        modal
        onOpenChange={() => setOpenModal((prev) => !prev)}
      >
        <DialogContent className=" max-w-2xl  lg:max-w-5xl h-[530px]  bg-[#EBFFFD] !rounded-3xl">
          <div className="py-11 w-full flex flex-col gap-7 ">
            <DialogHeader className="gap-2">
              <DialogTitle className="font-bold text-[32px] text-center  text-[#181819]  font-MuseoModerno ">
                {isLogin === "LOGIN"
                  ? "O cuidado certo está mais perto do que você imagina"
                  : "Cadastrar"}
              </DialogTitle>
              <DialogDescription className="text-center text-lg font-medium  text-[#181819]  font-MuseoModerno">
                {isLogin === "LOGIN"
                  ? "As melhores clínicas e profissionais de saúde prontos para cuidar de você"
                  : " Cadastre uma conta em nosso serviço"}
              </DialogDescription>
            </DialogHeader>
            <div className="flex !flex-col items-center justify-center gap-3 ">
              <button
                onClick={() =>
                  handleCloseModal(
                    isLogin === "LOGIN"
                      ? "/signin/paciente"
                      : "/register-paciente"
                  )
                }
                className=" flex items-center justify-start  h-[72px]  rounded-lg  px-4  lg:px-9  w-3/4  bg-[#3E31AE] text-[#FBFDFD] transition-transform hover:scale-105"
              >
                <div className="flex  items-center gap-8 w-full justify-center lg:justify-start">
                  <FiUser size={25} />
                  <div className="flex flex-col items-start  justify-start">
                    <p className=" font-lg font-Poppins font-semibold">
                      Paciente
                    </p>
                    <span className="hidden  lg:block text-left  font-medium text-sm text-[##FBFDFD] ">
                      Sua saúde com confiança e encontre o atendimento ideal
                      para suas necessidades
                    </span>
                  </div>
                </div>
              </button>
              <button
                onClick={() =>
                  handleCloseModal(
                    isLogin === "LOGIN" ? "/signin/clinica" : "/register-clinic"
                  )
                }
                className=" flex items-center justify-start  h-[72px] gap-6 rounded-lg  px-4  lg:px-9  border-2  w-3/4  bg-[#3E31AE] text-[#FBFDFD] transition-transform hover:scale-105"
              >
                <div className="flex  items-center gap-8 w-full justify-center lg:justify-start">
                  <TbUserHeart size={25} />

                  <div className="flex   flex-col items-start  justify-start">
                    <p className=" font-lg font-Poppins font-semibold">
                      Médico
                    </p>
                    <span className="hidden  lg:block text-left  font-medium text-sm text-[##FBFDFD] ">
                      Expanda sua prática e atenda mais pacientes prontos para
                      melhorar suas vidas
                    </span>
                  </div>
                </div>
              </button>
              {isLogin === "LOGIN" && (
                <button
                  onClick={() =>
                    handleCloseModal(
                      isLogin === "LOGIN"
                        ? "/signin/medico"
                        : "/register-paciente"
                    )
                  }
                  className=" flex items-center justify-start  h-[72px] gap-6 rounded-lg px-4  lg:px-9 border-2  w-3/4  bg-[#3E31AE] text-[#FBFDFD] transition-transform hover:scale-105"
                >
                  <div className="flex  items-center gap-8 w-full justify-center lg:justify-start">
                    <HiOutlineOfficeBuilding size={25} />
                    <div className="flex flex-col items-start justify-start">
                      <p className=" font-lg font-Poppins font-semibold">
                        Clínica
                      </p>
                      <span className="hidden  lg:block text-left  font-medium text-sm text-[##FBFDFD] ">
                        Conecte-se com pacientes e médicos em busca do local
                        perfeito para cuidar da saúde
                      </span>
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
