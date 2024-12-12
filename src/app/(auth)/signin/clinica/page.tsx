"use client";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";

import MaxWidthWrapper from "../../../../components/MaxWidthWrapper";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { FormLogin } from "../../../../shared/interfaces/IClinica";
import Image from "next/image";

export default function Signin() {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormLogin>();

  const onSubmit: SubmitHandler<FormLogin> = (data, event) => {
    event?.preventDefault();
    console.log(data);
  };

  return (
    <>
      <div className="min-h-screen">
        <MaxWidthWrapper className="flex flex-col md:flex-row justify-between">
          <div className=" min-h-screen flex-1 p-10 mt-16 2xl:px-0 flex justify-center  md:justify-center items-center md:items-start bg-white ">
            <div>
              <hgroup className=" flex flex-col gap-4">
                <h3 className=" text-[32px] font-semibold font-MuseoModerno">
                  Bem vindo ao seu Espaço de saúde
                </h3>
                <span className=" text-base font-medium font-Poppins">
                  Seu cuidado está a um clique de distância.
                </span>
              </hgroup>

              <form
                className=" w-full flex justify-between flex-col gap-16"
                onSubmit={handleSubmit((e) => onSubmit(e))}
              >
                <fieldset className="grid grid-cols-2 gap-x-4  items-center ">
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
                  <div className="col-span-2 relative">
                    <Input
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
                      className=" cursor-pointer absolute  top-[46px]  right-4"
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
                    href="#"
                    className="font-semibold hover:underline mt-4 font-Poppins"
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
          <div className="flex-1 px-8 py-8  2xl:px-0 flex justify-center md:justify-start  bg-[#3E31AE] pb-16 md:min-h-screen">
            <div className="max-w-[27rem] md:pt-[72px]">
              <hgroup className="mb-4">
                <Image
                  alt="Login"
                  src="/Vector.png"
                  width={40}
                  height={42}
                  className="mb-2"
                />
                <h2 className=" text-[32px] font-bold text-black leading-[150%] font-MuseoModerno text-white">
                  Vamos juntos cuidar da sua saúde
                </h2>
              </hgroup>
              <p className="text-lg text-gray-900 font-medium font-Poppins text-white">
                Acesse seu perfil e continue sua jornada para uma saúde mais
                conectada. Ao fazer login, você terá acesso a clínicas,
                especialistas e serviços personalizados, tudo pensado para
                simplificar o seu cuidado.
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}
