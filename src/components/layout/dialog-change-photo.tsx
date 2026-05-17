"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RiImageEditFill } from "react-icons/ri";

import avatarImageDefault from "@/assets/foto-pessoal.svg";
import logo from "@/assets/icon-plus-secondary.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export default function useDialogChangePhoto() {
  const [, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    // Se não houver arquivo, limpa o estado
    if (!selectedFile) {
      setFile(null);
      setPreview(null);
      return;
    }

    // Validação de extensão
    const fileExtension =
      selectedFile.name.split(".").pop()?.toLowerCase() || "";
    if (!["jpg", "jpeg", "png"].includes(fileExtension)) {
      alert(
        "Por favor, selecione um arquivo de imagem válido (jpg, jpeg, png)."
      );
      setFile(null);
      setPreview(null);
      event.target.value = "";
      return;
    }

    const fileSize = selectedFile.size;
    const maxSize = 5 * 1024 * 1024;
    if (fileSize > maxSize) {
      alert(
        "O arquivo selecionado é muito grande. Por favor, selecione um arquivo menor que 5MB."
      );
      setFile(null);
      setPreview(null);
      event.target.value = "";
      return;
    }
    setFile(selectedFile);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const imageUrl = URL.createObjectURL(selectedFile);
    setPreview(imageUrl);
  };

  const handleOpenModalChangePhoto = () => {
    setOpenModal(true);
  };

  const handleCloseModalChangePhoto = () => {
    setOpenModal(false);
  };

  const save = () => {
    handleCloseModalChangePhoto();
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const DialogComponentChangePhoto = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="px-4! flex min-h-80 min-w-10 flex-col items-center justify-center gap-6 !rounded-3xl bg-[#EBFFFD]">
          <DialogHeader className="flex items-center justify-center gap-2">
            <div className="size-20">
              <Image
                alt="logo"
                src={logo}
                height={35}
                width={35}
                className="xs:w-[170px]"
              />
            </div>
            <DialogTitle className="text-center font-museo text-[32px] font-semibold text-black">
              Foto do perfil
            </DialogTitle>
            <DialogDescription className="text-center font-poppins text-base font-medium text-black">
              Uma foto ajuda as pessoas a reconhecerem você e permite que você
              saiba quando a conta está conectada.
            </DialogDescription>
          </DialogHeader>
          <div
            className="group relative size-52 cursor-pointer rounded-full"
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleChangePhoto}
            />
            <Avatar className="h-52 w-52">
              <AvatarImage
                src={preview || avatarImageDefault.src}
                alt="Foto do perfil"
                className="object-cover object-center"
              />
              <AvatarFallback className="bg-slate-200 text-slate-500">
                <RiImageEditFill size={48} />
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <RiImageEditFill size={48} className="text-white" />
            </div>
          </div>

          <footer className="">
            <Button
              type="button"
              variant="default"
              size="lg"
              className=" bg-agenda-saude-purple-100 font-poppins text-lg font-semibold text-agenda-saude-blue-100 hover:bg-agenda-saude-purple-100/90"
              onClick={save}
            >
              Alterar
            </Button>
          </footer>
        </DialogContent>
      </Dialog>
    );
  };

  return {
    DialogComponentChangePhoto,
    handleOpenModalChangePhoto,
    handleCloseModalChangePhoto
  };
}
