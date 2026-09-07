"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

import iconplus from "@/assets/icon-plus.png";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { ResetPassowrdTokenEmail } from "@/shared/interfaces/IClinica";
import { Eye, EyeOff } from "lucide-react";

import { usePasswordReset } from "../../_hook/usaPassword";
import { PasswordResetFormDataWithPassword } from "../../_schemas/password-reset-schema";
import { RHFInput } from "../../../../../components/RHFInput";
import { FieldGroup } from "../../../../../components/ui/field";

interface IParams {
  tokenReset: string;
}

export default function ResetToken({ params }: { params: IParams }) {
  const [openModal, setOpenModal] = useState(false);
  const { PasswordForm } = usePasswordReset({
    passwordValue: {
      token: params.tokenReset,
      password: "",
      confirmPassword: ""
    }
  });
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const router = useRouter();

  const password = PasswordForm.watch("password");
  const confirmPassword = PasswordForm.watch("confirmPassword");

  const isDisabled =
    !password ||
    !confirmPassword ||
    Object.keys(PasswordForm.formState.errors).length > 0;

  const onSubmit: SubmitHandler<ResetPassowrdTokenEmail> = (data, event) => {
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
      <div className="min-h-[calc(100vh-68px)] bg-gradient-to-b from-agenda-saude-blue-100 from-50% to-agenda-saude-purple-200 to-50% pt-20 md:bg-gradient-to-r">
        <div className="mx-auto flex h-full w-full max-w-[87.5rem] flex-col justify-between md:flex-row  ">
          <div className=" flex  flex-1 justify-center bg-[#ebfffd] px-8 py-8 pb-16  pt-36 md:justify-start 2xl:px-0">
            <div>
              <hgroup className=" flex flex-col gap-4">
                <h3 className=" font-MuseoModerno text-[32px] font-semibold">
                  Bem vindo ao seu Espaço de saúde
                </h3>
                <span className=" font-Poppins max-w-sm text-base font-medium">
                  Digite sua senha nova
                </span>
              </hgroup>

              <form
                className=" mt-8 flex w-full flex-col justify-between  gap-16"
                onSubmit={PasswordForm.handleSubmit(onSubmit)}
              >
                <FieldGroup className="grid grid-cols-2  gap-1 ">
                  <RHFInput<PasswordResetFormDataWithPassword>
                    id="token"
                    type="text"
                    name="token"
                    placeholder="Token"
                    label="Token*"
                    className="col-span-2 hidden"
                    control={PasswordForm.control}
                  />
                  <div className="relative col-span-2">
                    <RHFInput<PasswordResetFormDataWithPassword>
                      id="password"
                      type={isShowPassword ? "text" : "password"}
                      name="password"
                      placeholder="Senha"
                      label="Senha*"
                      control={PasswordForm.control}
                    />
                    <button
                      type="button"
                      aria-label={
                        isShowPassword ? "Ocultar senha" : "Mostrar senha"
                      }
                      onClick={() => setIsShowPassword((prev) => !prev)}
                      className="absolute right-4  top-[46px]  cursor-pointer "
                    >
                      {isShowPassword ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </button>
                  </div>
                  <div className="relative col-span-2">
                    <RHFInput<PasswordResetFormDataWithPassword>
                      id="confirmPassword"
                      type={isShowConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirmar Senha"
                      label="Confirmar Senha*"
                      control={PasswordForm.control}
                    />
                    <button
                      type="button"
                      aria-label={
                        isShowConfirmPassword
                          ? "Ocultar confirmação de senha"
                          : "Mostrar confirmação de senha"
                      }
                      onClick={() => setIsShowConfirmPassword((prev) => !prev)}
                      className="absolute right-4  top-[46px]  cursor-pointer "
                    >
                      {isShowConfirmPassword ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </button>
                  </div>
                </FieldGroup>

                <div className="flex w-full items-center justify-center gap-4">
                  <Button
                    type="submit"
                    className="w-full max-w-60 rounded-lg bg-black text-white"
                    disabled={isDisabled}
                  >
                    <span>Confirmar</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex  flex-1  items-center  justify-center gap-2 bg-[#1C226B] px-8 md:items-start md:pt-36 2xl:px-0 ">
            <div className="max-w-[28rem] py-32 md:py-0 ">
              <hgroup className="mb-4">
                <Image
                  alt="Login"
                  src={iconplus}
                  width={40}
                  height={42}
                  className="mb-2"
                />
                <h2 className=" font-MuseoModerno text-[32px]  font-semibold leading-[150%] text-white">
                  Vamos juntos cuidar da sua saúde
                </h2>
              </hgroup>
              <p className="font-Poppins text-lg font-medium text-white">
                Acesse seu perfil e continue sua jornada para uma saúde mais
                conectada. Ao fazer login, você terá acesso a clínicas,
                especialistas e serviços personalizados, tudo pensado para
                simplificar o seu cuidado.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={openModal}
        defaultOpen={openModal}
        modal
        onOpenChange={() => setOpenModal((prev) => !prev)}
      >
        <DialogContent className="w-full items-center sm:max-w-[560px]">
          <DialogHeader className="gap-5">
            <DialogTitle className="max-w-xs self-center text-center text-4xl  font-semibold text-black">
              Senha atualizada com sucesso
            </DialogTitle>
            <DialogDescription className="text-center text-base  font-normal leading-6  text-[#2D2E2E]">
              Por favor realize o login com sua nova senha
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="   flex items-center sm:justify-center">
            <Button
              type="submit"
              className="w-2/6 px-4 py-7 text-white"
              onClick={backtoLogin}
            >
              Concluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
