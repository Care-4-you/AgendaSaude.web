"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ResetPassowrdTokenEmail } from "@/shared/interfaces/IClinica";

interface IParams {
  tokenReset: string;
}

export default function ResetToken({ params }: { params: IParams }) {
  const [openModal, setOpenModal] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const { tokenReset } = params;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ResetPassowrdTokenEmail>();
  const password = watch("password");

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
      <div className="min-h-[calc(100vh-68px)] bg-gradient-to-b from-agenda-saude-blue-100 from-50% to-agenda-saude-purple-200 to-50% md:bg-gradient-to-r">
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
                onSubmit={handleSubmit((e) => onSubmit(e))}
              >
                <fieldset className="grid grid-cols-2 items-center  gap-x-4  ">
                  <Input
                    className="col-span-2 hidden"
                    placeholder="token"
                    value={tokenReset}
                    label="token*"
                    id="token"
                    type="text"
                    {...register("token")}
                  />
                  <div className="relative col-span-2">
                    <Input
                      labelClassName=""
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
                  <div className="relative col-span-2">
                    <Input
                      labelClassName=""
                      placeholder="Repetir senha"
                      label="Repetir senha*"
                      id="confirmPassword"
                      type={isShowConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword", {
                        required: {
                          value: true,
                          message: "Campo Repetir senha é obrigatório"
                        },
                        validate: (value) =>
                          value === password || "A senha não corresponde"
                      })}
                      error={
                        errors.confirmPassword
                          ? errors.confirmPassword.message
                          : ""
                      }
                    />
                    <span
                      className=" absolute right-4  top-[46px]  cursor-pointer"
                      onClick={() => setIsShowConfirmPassword((prev) => !prev)}
                    >
                      {isShowConfirmPassword ? (
                        <LuEye size={"1.25em"} />
                      ) : (
                        <LuEyeOff size={"1.25em"} />
                      )}
                    </span>
                  </div>
                </fieldset>
                <div className="flex w-full items-center justify-center gap-4">
                  <Button
                    type="submit"
                    className="w-full max-w-60 rounded-lg bg-black text-white"
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
                  src="/Vector.png"
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
