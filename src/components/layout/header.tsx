"use client";
import Image from "next/image";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { FaBell } from "react-icons/fa";

import logo from "@/assets/logo_agenda_saude.png";
import { default as LayoutContainer } from "@/components/layout/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { useAuth } from "@/hooks/auth";

import { Button } from "../ui/button";
import useDialog from "./dialog";

export default function Header() {
  const { user, signOut } = useAuth();
  const { DialogComponent, handleModalCadastro, handleModalLogin } =
    useDialog();

  const isAuthenticated = user && user.name && user.email;

  return (
    <header className="bg-agenda-saude-purple-100 py-4">
      <LayoutContainer as="nav" className="flex items-center justify-between">
        <Link href="/">
          <Image
            alt="logo"
            src={logo}
            height={150}
            width={130}
            className="xs:w-[170px]"
          />
        </Link>
        {!isAuthenticated && (
          <div>
            <Button
              size="sm"
              variant="link"
              className="font-poppins text-base font-normal text-zinc-100 hover:text-white hover:no-underline md:text-lg"
              onClick={handleModalLogin}
            >
              Entrar
            </Button>
            <Button
              size="sm"
              variant="link"
              className="font-poppins text-base font-normal text-zinc-100 hover:text-white hover:no-underline md:text-lg"
              onClick={handleModalCadastro}
            >
              Cadastrar
            </Button>
          </div>
        )}
        {isAuthenticated && (
          <div className="flex items-center justify-center gap-x-4">
            <Link href="#">
              <FaBell size="24" className="text-white" />
            </Link>
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="min-w-44 w-auto mt-3 space-y-3.5 flex flex-col   border-none">
                <p>Olá, {user.name}!</p>
                <p> {user.email}</p>
                <Link
                  href="#"
                  className="flex items-center justify-start gap-2"
                >
                  <CgProfile />
                  <span>Minha Conta</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center justify-start gap-2"
                >
                  <FaBell />
                  <span>Notificações</span>
                </Link>
                <Button
                  type="button"
                  onClick={signOut}
                  className=" py-2 w-full bg-black text-white hover:bg-black/80 hover:text-white border-none"
                >
                  Sair
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </LayoutContainer>
      <DialogComponent />
    </header>
  );
}
