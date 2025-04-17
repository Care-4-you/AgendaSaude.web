"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useAuth } from "../../../hooks/auth";
import { FormLogin } from "../../../shared/interfaces/IClinica";

export default function Signin() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "paciente";
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormLogin>();

  const returnText = (text: string) => {
    switch (text) {
      case "paciente":
        return "Acesse seu perfil e continue sua jornada para uma saúde mais conectada. Ao fazer login você terá acesso a clínicas, especialistas e serviços personalizados, tudo pensado para simplificar o seu cuidado.";

      case "medico":
        return "Acesse seu perfil e continue sua jornada para uma saúde mais conectada. Ao fazer login como médico você terá acesso a funcionalidades para tornar suas consultas mais eficientes, como agenda de consultas e acompanhamento de tratamentos de seus pacientes";

      case "clinica":
        return "Acesse seu perfil e continue sua jornada para uma saúde mais conectada. Ao fazer login como clínica você terá acesso a funcionalidades que ajudarão na organização de agenda de médicos, agendamento de consultas e gerenciamento de contato dos pacientes.";
      default:
        break;
    }
  };

  const onSubmit: SubmitHandler<FormLogin> = async (data) => {
    console.log(data);
    await signIn({ email: data.username, password: data.password });
  };

  return (
    <>
      <div className="min-h-[calc(100vh-68px)] bg-gradient-to-b from-agenda-saude-blue-100 from-50% to-agenda-saude-purple-200 to-50% md:bg-gradient-to-r">
        <div className="mx-auto flex h-full w-full max-w-[87.5rem] flex-col justify-between md:flex-row ">
          <div className=" flex  flex-1 justify-center bg-[#ebfffd] px-8  py-36  pb-16 md:justify-start 2xl:px-0">
            <div>
              <hgroup className=" flex flex-col gap-4">
                <h3 className=" font-MuseoModerno text-[32px] font-semibold">
                  Bem vindo ao seu Espaço de saúde
                </h3>
                <span className=" font-Poppins text-base font-medium">
                  Seu cuidado está a um clique de distância.
                </span>
              </hgroup>

              <form
                className=" flex w-full flex-col justify-between gap-16"
                onSubmit={handleSubmit(onSubmit)}
              >
                <fieldset className="grid grid-cols-2 items-center  gap-x-4 ">
                  <Input
                    className="col-span-2"
                    placeholder="Email"
                    label="Email*"
                    id="email"
                    type="text"
                    {...register("username", {
                      required: {
                        value: true,
                        message: "Campo Email é obrigatório"
                      },
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Formato inválido Ex. exemplo@email.com"
                      }
                    })}
                    error={errors.username ? errors.username.message : ""}
                  />
                  <div className="relative col-span-2">
                    <Input
                      placeholder="Senha"
                      type={isShowPassword ? "text" : "password"}
                      label="Senha*"
                      id="password"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Campo Senha é obrigatório"
                        }
                      })}
                      error={errors.password ? errors.password.message : ""}
                    />
                    <span
                      className=" absolute right-4  top-[46px]  cursor-pointer"
                      onClick={() => setIsShowPassword((prev) => !prev)}
                    >
                      {isShowPassword ? (
                        <LuEye size={"1.25em"} className="text-gray-400" />
                      ) : (
                        <LuEyeOff size={"1.25em"} className="text-gray-400" />
                      )}
                    </span>
                  </div>
                  <Link
                    href="/password/reset"
                    className="font-Poppins mt-4 font-semibold hover:underline"
                  >
                    Esqueci minha senha.
                  </Link>
                </fieldset>
                <div className="flex items-center justify-center">
                  <Button
                    type="submit"
                    className="w-[253px] bg-black text-white"
                  >
                    <span>Entrar</span>
                    <MdKeyboardArrowRight color="white" className=" size-8" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex  flex-1  items-center  justify-center gap-2 bg-[#1C226B] px-8 md:items-start md:py-36 2xl:px-0 ">
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
              <p className="font-Poppins text-lg font-medium text-white">
                {returnText(q)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
