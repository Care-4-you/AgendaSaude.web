"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";

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
import { ResetPassowrdEmail } from "@/shared/interfaces/IClinica";

export default function Reset() {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPassowrdEmail>();

  const onSubmit: SubmitHandler<ResetPassowrdEmail> = (data, event) => {
    event?.preventDefault();
    console.log(data);
    setOpenModal(true);
  };
  const backtoLogin = () => {
    setOpenModal((prev) => !prev);
    router.push("/signin");
  };
  const isTrue = false;
  return (
    <>
      <div className="min-h-[calc(100vh-68px)] bg-gradient-to-b from-agenda-saude-blue-100 from-50% to-agenda-saude-purple-200 to-50% md:bg-gradient-to-r">
        <div className="mx-auto flex h-full w-full max-w-[87.5rem] flex-col justify-between md:flex-row ">
          <div className=" flex  flex-1 justify-center bg-[#ebfffd] px-8 py-8 pb-16  pt-36 md:justify-start 2xl:px-0">
            <div>
              <hgroup className=" flex flex-col gap-4">
                <h3 className=" font-MuseoModerno text-[32px] font-semibold">
                  Bem vindo ao seu Espaço de saúde
                </h3>
                <span className=" max-w-sm font-poppins text-base font-medium">
                  Digite seu e-mail cadastrado para realizar a recuparação de
                  senha.
                </span>
              </hgroup>

              {isTrue && (
                <p className="mt-14 max-w-md font-poppins text-base font-semibold italic text-red-500">
                  Esse e-mail não foi encontrado em nossa base de dados. Por
                  favor realize o cadastro.
                </p>
              )}

              <form
                className=" mt-8 flex w-full flex-col justify-between  gap-16"
                onSubmit={handleSubmit((e) => onSubmit(e))}
              >
                <fieldset className="grid grid-cols-2 items-center  gap-x-4  ">
                  <Input
                    className="col-span-2"
                    placeholder="Email"
                    label="Email*"
                    id="email"
                    type="text"
                    {...register("username", {
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
                    error={errors.username ? errors.username.message : ""}
                  />
                </fieldset>
                <div className="flex w-full items-center justify-center gap-4">
                  <Button
                    type="button"
                    className="w-full max-w-60 rounded-lg bg-stone-100 text-black hover:bg-stone-200"
                    asChild
                  >
                    <Link href={"/signin"}>voltar</Link>
                  </Button>
                  <Button
                    type="submit"
                    className="w-full max-w-60 rounded-lg bg-black text-white"
                  >
                    <span>Entrar</span>
                    <MdKeyboardArrowRight color="white" className=" size-8" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex  flex-1  items-center  justify-center gap-2 bg-[#1C226B] px-8 md:items-start md:pt-36 2xl:px-0 ">
            <div className="max-w-[28rem] py-32 md:py-0">
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
              <p className="font-poppins text-lg font-medium text-white">
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
              Link enviado para o E-mail
            </DialogTitle>
            <DialogDescription className="text-center text-base  font-normal leading-6  text-[#2D2E2E]">
              Por favor acesse sua caixa de e-mails. No e-mail enviado clique no
              link para realizar a recuperação de sua senha.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="   flex items-center sm:justify-center">
            <Button
              type="submit"
              className="w-2/6 px-4 py-7 text-white"
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
