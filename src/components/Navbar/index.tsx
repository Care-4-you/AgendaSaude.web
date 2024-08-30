"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaClinicMedical } from "react-icons/fa";
import { TbUser } from "react-icons/tb";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
    <nav className="bg-slate-600 p-4">
      <MaxWidthWrapper className=" mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <ul className="flex space-x-4">
            <li className="list-none text-xl font-bold text-white">
              <Logo imagePath={"/logo_soujunior.png"} />
            </li>
          </ul>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Button
              variant="plain"
              className="text-lg"
              onClick={handleModalLogin}
            >
              Entrar
            </Button>
          </li>
          <li>
            <Button
              variant="plain"
              onClick={handleModalCadastro}
              className="text-lg"
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
        <DialogContent className=" lg:max-w-screen-lg xl:max-w-screen-xl ">
          <DialogHeader className="gap-5">
            <DialogTitle className="font-bold text-5xl text-center  text-black">
              {isLogin === "LOGIN" ? "Entrar" : "Cadastrar"}
            </DialogTitle>
            <DialogDescription className="text-center text-lg font-medium  text-gray-900  lg:text-2xl">
              {isLogin === "LOGIN"
                ? "Entre com sua conta para utilizar as funcionalidades do Agenda Saúde."
                : " Cadastre uma conta em nosso serviço"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex !flex-col items-center justify-center gap-3 sm:space-x-0">
            <button
              onClick={() =>
                handleCloseModal(
                  isLogin === "LOGIN" ? "/signin" : "/register-paciente"
                )
              }
              className=" flex items-center justify-center lg:justify-start h-14 gap-6 rounded-lg  border-2  w-3/4 px-6 py-8 bg-[#D9D9D9] transition-transform hover:scale-105"
            >
              <TbUser size={32} />
              <span className="text-left text-lg font-bold text-black">
                Paciente
              </span>
            </button>
            <button
              onClick={() =>
                handleCloseModal(
                  isLogin === "LOGIN" ? "#" : "/register-clinic"
                )
              }
              className="flex items-center justify-center lg:justify-start h-14 gap-6 rounded-lg  border-2  w-3/4 px-6 py-8 bg-[#D9D9D9] transition-transform hover:scale-105"
            >
              <FaClinicMedical size={32} />
              <span className="text-left text-lg font-bold text-black ">
                Clinica
              </span>
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
