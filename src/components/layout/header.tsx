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
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

export default function Header() {
  const [openModal, setOpenModal] = useState(false);
  const [profilePopoverOpen, setProfilePopoverOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { DialogComponent, handleOpenModal } = useDialogLogin();
  const { DialogComponentChangePhoto, handleOpenModalChangePhoto } =
    useDialogChangePhoto();
  const { DialogComponentRegister, handleOpenModalRegister } =
    useDialogRegister();
  const { NotificationModal, handleOpenModalNotification } = Notification();

  // Fechar popover no scroll
  useEffect(() => {
    const handleScroll = () => {
      if (profilePopoverOpen) {
        setProfilePopoverOpen(false);
      }
    };

    if (profilePopoverOpen) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      document.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [profilePopoverOpen]);

  const isAuthenticated = user && user.name && user.email;

  return (
    <header className="fixed z-[9999] w-full bg-agenda-saude-purple-100 py-4">
      <LayoutContainer as="nav" className="flex items-center justify-between relative">
        <Link href="/">
          <Image
            alt="logo"
            src={logo}
            height={150}
            width={130}
            className="xs:w-[170px]"
          />
        </Link>
        {/* Sobre nós centralizado */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block z-10">
          <Link
            href="/sobre-nos"
            className="font-poppins text-base font-normal text-zinc-100 transition-colors hover:text-white md:text-lg"
          >
            Sobre nós
          </Link>
        </div>

        <div className="flex items-center justify-between gap-4 z-10">
          <button
            onClick={handleOpenModalNotification}
            className="font-poppins text-base font-normal text-zinc-100 transition-colors hover:text-white md:text-lg relative mr-2"
          >
            Notificações
            {notification.length > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {notification.length}
              </span>
            )}
          </button>
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
            <div className="relative flex items-center justify-center gap-x-4">
              <Popover open={profilePopoverOpen} onOpenChange={setProfilePopoverOpen}>
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
                    <span>Painel</span>
                  </Link>
                  <Link
                    href="/dashboard/my-account"
                    className="flex items-center justify-start gap-2 text-white hover:font-medium"
                  >
                    <CgProfile size={22} />
                    <span>Minha Conta</span>
                  </Link>
                  <Link
                    href="/dashboard/my-account/email-and-password"
                    className="flex items-center justify-start gap-2 text-white hover:font-medium"
                  >
                    <Mails size={22} />
                    <span>Alterar email e senha</span>
                  </Link>
                  <Button
                    type="button"
                    onClick={() => setOpenModal(true)}
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
      <Dialog
        open={openModal}
        defaultOpen={openModal}
        modal
        onOpenChange={setOpenModal}
      >
        <DialogContent className=" max-w-96 items-center rounded-md bg-agenda-saude-blue-100 sm:max-w-2xl">
          <DialogHeader className="gap-5">
            <DialogTitle className=" self-center text-center text-2xl  font-semibold text-black">
              Tem certeza que deseja sair?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className=" flex !flex-row items-center !justify-evenly !gap-2">
            <Button
              type="button"
              variant="default"
              size="default"
              className=" w-32 bg-agenda-saude-purple-100 font-poppins text-lg font-semibold text-agenda-saude-blue-100 hover:bg-agenda-saude-purple-100"
              onClick={() => {
                signOut();
                setOpenModal(false);
              }}
            >
              Sim
            </Button>
            <Button
              type="button"
              variant="default"
              size="default"
              className=" w-32 bg-agenda-saude-purple-100 font-poppins text-lg font-semibold text-agenda-saude-blue-100 hover:bg-agenda-saude-purple-100"
              onClick={() => setOpenModal(false)}
            >
              Nao
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
