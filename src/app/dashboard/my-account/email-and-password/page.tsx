"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";

import { RHFInput } from "@/components/RHFInput";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { Button } from "../../../../components/ui/button";
import { useChangeEmailAndPassword } from "./_hook/useEmailPassword";
import { ChangeEmailAndPasswordFormData } from "./_schema/Email-password-schema";

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { changeEmailAndPasswordForm } = useChangeEmailAndPassword({});

  const onSubmit: SubmitHandler<ChangeEmailAndPasswordFormData> = async (
    data
  ) => {
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
            <div className="absolute -top-10 left-1/2 flex h-20 w-80 -translate-x-1/2 transform items-center justify-center rounded-md bg-agenda-saude-green-100">
              <p className="text-2xl font-bold text-white">
                Alterar email e senha
              </p>
            </div>
            <form
              className="flex w-full flex-col items-center gap-5 p-20"
              onSubmit={changeEmailAndPasswordForm.handleSubmit(onSubmit)}
            >
              <fieldset className="grid w-full grid-cols-2 items-center gap-x-2  ">
                <RHFInput<ChangeEmailAndPasswordFormData>
                  className="input-with-icon col-span-2 mb-2"
                  placeholder="Email"
                  label="Email*"
                  id="email"
                  type="text"
                  name="email"
                  control={changeEmailAndPasswordForm.control}
                />

                <div className="relative col-span-2">
                  <RHFInput<ChangeEmailAndPasswordFormData>
                    placeholder="Senha"
                    type={isShowPassword ? "text" : "password"}
                    label="Senha*"
                    id="password"
                    name="password"
                    control={changeEmailAndPasswordForm.control}
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
              >
                Salvar
              </Button>
            </form>
          </div>
        </div>
      </div>

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
