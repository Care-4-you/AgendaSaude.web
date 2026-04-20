"use client";
import Image from "next/image";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { RiImageEditFill } from "react-icons/ri";
import { MdOutlineSpaceDashboard } from "react-icons/md";

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
import useDialogLogin from "./dialog-login";
import useDialogRegister from "./dialog-register";

import { Bell, Mails } from "lucide-react";
import useDialogChangePhoto from "./dialog-change-photo";
import Notification from "../notification";
import { notification } from "../../shared/utils";

export default function Header() {
  const { user, signOut } = useAuth();
  const { DialogComponent, handleOpenModal } = useDialogLogin();
  const { DialogComponentChangePhoto, handleOpenModalChangePhoto } =
    useDialogChangePhoto();
  const { DialogComponentRegister, handleOpenModalRegister } =
    useDialogRegister();
  const { NotificationModal, handleOpenModalNotification } = Notification();

  const isAuthenticated = user && user.name && user.email;

  return (
    <header className="fixed w-full z-50 bg-agenda-saude-purple-100 py-4">
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
        <div className="flex items-center gap-4">
          <Link
            href="/sobre-nos"
            className="font-poppins text-base font-normal text-zinc-100 transition-colors hover:text-white md:text-lg"
          >
            Sobre nós
          </Link>
          {!isAuthenticated ? (
            <div className="flex items-center">
              <Button
                size="sm"
                variant="link"
                className="font-poppins text-base font-normal text-zinc-100 hover:text-white hover:no-underline md:text-lg"
                onClick={handleOpenModal}
              >
                Entrar
              </Button>
              <Button
                size="sm"
                variant="link"
                className="font-poppins text-base font-normal text-zinc-100 hover:text-white hover:no-underline md:text-lg"
                onClick={handleOpenModalRegister}
              >
                Cadastrar
              </Button>
            </div>
          ) : (
            <div className="relative flex items-center justify-center gap-x-4  ">
              <Button
                onClick={handleOpenModalNotification}
                size="icon"
                className="relative bg-transparent hover:bg-transparent"
              >
                <Bell />
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {notification.length}
                </span>
              </Button>
              <Popover>
                <PopoverTrigger>
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                      className="object-centere object-cover"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="mt-3 flex  max-w-56 flex-col space-y-3.5 border-none  bg-agenda-saude-green-100 ">
                  <div className="relative flex w-full items-center justify-center">
                    <Avatar className="h-28 w-28">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                        className="object-centere object-cover"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className=" absolute left-28 top-20 size-9 rounded-full"
                      onClick={handleOpenModalChangePhoto}
                    >
                      <RiImageEditFill size={22} className="text-slate-950" />
                    </Button>
                  </div>
                  <p className="text-white">Olá, {user.name}!</p>

                  <Link
                    href="/dashboard"
                    className="flex items-center justify-start gap-2 text-white hover:font-medium"
                  >
                    <MdOutlineSpaceDashboard size={22} />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center justify-start gap-2 text-white hover:font-medium"
                  >
                    <CgProfile size={22} />
                    <span>Minha Conta</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center justify-start gap-2 text-white hover:font-medium"
                  >
                    <Mails size={22} />
                    <span>Alterar email e senha</span>
                  </Link>
                  <Button
                    type="button"
                    onClick={signOut}
                    className=" bg-agenda-saude-purple-100 font-poppins text-lg font-semibold text-agenda-saude-blue-100 hover:bg-agenda-saude-purple-100/90"
                  >
                    Sair
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </LayoutContainer>
      <DialogComponent />
      <DialogComponentRegister />
      <DialogComponentChangePhoto />
      <NotificationModal />
    </header>
  );
}
