"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

import iconplus from "@/assets/icon-plus.png";
import { RHFInput } from "@/components/RHFInput";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { useAuth } from "@/hooks/auth";
import { EyeOff, Eye, ArrowRight } from "lucide-react";

import { useLogin } from "./_hook/useLogin";
import { LoginFormData } from "./_schemas/login-schema";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "paciente";
  const { signIn } = useAuth();

  const { loginForm } = useLogin({});

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

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    await signIn({ email: data.email, password: data.password });
  };

  return (
    <>
      <div className="min-h-[calc(100vh-68px)] bg-gradient-to-b from-agenda-saude-blue-100 from-50% to-agenda-saude-purple-200 to-50% pt-16 md:bg-gradient-to-r">
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
                onSubmit={loginForm.handleSubmit(onSubmit)}
                noValidate
              >
                <FieldGroup className="grid grid-cols-2  gap-1 ">
                  <RHFInput<LoginFormData>
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    label="Email*"
                    className="col-span-2"
                    control={loginForm.control}
                  />
                  <div className="relative col-span-2">
                    <RHFInput<LoginFormData>
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Senha"
                      label="Senha*"
                      control={loginForm.control}
                    />
                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Ocultar senha" : "Mostrar senha"
                      }
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4  top-[46px]  cursor-pointer "
                    >
                      {showPassword ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </button>
                  </div>
                </FieldGroup>

                <div className="flex items-center justify-center">
                  <Button
                    type="submit"
                    className="inline-flex h-11 w-full  items-center justify-center rounded-lg bg-black hover:bg-black/80"
                  >
                    <span>Entrar</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
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
                {returnText(q)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
