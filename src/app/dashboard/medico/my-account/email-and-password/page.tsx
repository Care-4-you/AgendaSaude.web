"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEmailandPassword } from "@/shared/interfaces/IClinica";
import { RiImageEditFill } from "react-icons/ri";
import useDialogChangePhoto from "../../../../../components/layout/dialog-change-photo";

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState(false);
   const { DialogComponentChangePhoto, handleOpenModalChangePhoto } =
      useDialogChangePhoto();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangeEmailandPassword>();

  const onSubmit: SubmitHandler<ChangeEmailandPassword> = (data, event) => {
    event?.preventDefault();
    console.log(data);
    setOpenModal(true);
  };
  const backtoLogin = () => {
    setOpenModal((prev) => !prev);
    router.push("/signin");
  };

  return (
    <>
      <div className="flex w-full flex-1 items-center justify-between ">
        <div className="flex w-full items-center justify-center">
          <div className=" relative  w-full bg-agenda-saude-purple-300  ">
            <div className="absolute -top-28 left-1/2 flex h-44 py-2 w-[500px] -translate-x-1/2 transform items-center  justify-around rounded-md bg-agenda-saude-green-100">
              <div className="text-2xl font-bold text-white">
                <div className="relative flex w-full items-center justify-center">
                    <Avatar className="h-20 w-20">
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
                      className=" absolute left-12 top-14 size-9 rounded-full"
                      onClick={handleOpenModalChangePhoto}
                    >
                      <RiImageEditFill size={22} className="text-slate-950" />
                    </Button>
                  </div>
              </div>
              <hr className=" bg-agenda-saude-purple-200 w-1 rounded-2xl h-28"  />
              <div className="flex flex-col items-start justify-start gap-2 text-sm">
                <p className="text-white font-bold">Dados Pessoais</p>
                <ul>
                  <li className="text-white">Nome: Dr. Fulano de Tal</li>
                  <li className="text-white">Email: dr.fulano@example.com</li>
                  <li className="text-white">Telefone: (11) 1234-5678</li>
                  <li className="text-white">Celular: (11) 91234-5678</li>
                  <li className="text-white">CRM: 123456</li>
                </ul>

              </div>

            </div>
            <form
              className="flex w-full flex-col items-center p-20"
              onSubmit={handleSubmit((e) => onSubmit(e))}
            >
              <fieldset className="grid w-full grid-cols-2 items-center gap-x-2  ">
                <Input
                  className="input-with-icon col-span-2"
                  labelClassName="text-white"
                  placeholder="Email"
                  label="Email*"
                  id="email"
                  type="text"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Campo é obrigatório"
                    },
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Formato inválido Ex. exemplo@email.com"
                    }
                  })}
                  error={errors.email ? errors.email.message : ""}
                />
                <div className="relative col-span-2">
                  <Input
                    labelClassName="text-white"
                    placeholder="Senha"
                    type={isShowPassword ? "text" : "password"}
                    label="Senha*"
                    id="password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Campo Senha é obrigatório"
                      },
                      minLength: {
                        value: 8,
                        message: "Senha deve ter no minimo 8 caracters"
                      },
                      validate: {
                        hasUppercase: (value) =>
                          /^(?=.*[A-Z]).+$/.test(value) ||
                          "Deve conter no minimo uma letra maiúscula",
                        hasLowerCase: (value) =>
                          /^(?=.*[a-z]).+$/.test(value) ||
                          "Deve conter no minimo uma letra minuscula",
                        hasSpecialChar: (value) =>
                          /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?/~]).+$/.test(
                            value
                          ) || "Deve conter caracters especiaos Ex. @ # $"
                      }
                    })}
                    error={errors.password ? errors.password.message : ""}
                  />
                  <span
                    className=" absolute right-4  top-[46px]  cursor-pointer"
                    onClick={() => setIsShowPassword((prev) => !prev)}
                  >
                    {isShowPassword ? (
                      <LuEye size={"1.25em"} />
                    ) : (
                      <LuEyeOff size={"1.25em"} />
                    )}
                  </span>
                </div>
              </fieldset>

              <Button
                type="submit"
                variant="default"
                size="lg"
                className=" hover:bg-agenda-saude-green-200/90 bg-agenda-saude-green-100 font-poppins text-lg font-semibold text-agenda-saude-blue-100"
                onClick={handleSubmit((e) => onSubmit(e))}
              >
                Salvar
              </Button>
            </form>
          </div>
        </div>
      </div>

      <DialogComponentChangePhoto />
      <Dialog
        open={openModal}
        defaultOpen={openModal}
        modal
        onOpenChange={() => setOpenModal((prev) => !prev)}
      >
        <DialogContent className=" max-w-60 items-center rounded-md bg-agenda-saude-blue-100 sm:max-w-2xl">
          <DialogHeader className="gap-5">
            <DialogTitle className=" self-center text-center text-2xl  font-semibold text-black">
              Senha alterada com sucesso!
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className=" flex items-center sm:justify-center">
            <Button
              type="submit"
              variant="default"
              size="lg"
              className=" hover:bg-agenda-saude-green-200/90 bg-agenda-saude-green-100 font-poppins text-lg font-semibold text-agenda-saude-blue-100"
              onClick={backtoLogin}
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
