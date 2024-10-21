"use client";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";

import Logo from "@/components/Logo";

import MaxWidthWrapper from "../../../../components/MaxWidthWrapper";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { FormLogin } from "../../../../shared/interfaces/IClinica";

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
      <div className="min-h-screen md:bg-gradient-to-l  from-[#C2C1C1] from-50% to-white to-50% ">
        <MaxWidthWrapper className="flex flex-col md:flex-row justify-between  pt-12">
          <div className="flex-1 px-8 py-8  2xl:px-0 flex justify-center md:justify-start  bg-white pb-16 md:min-h-screen ">
            <div className="max-w-[27rem] md:pt-[72px]">
              <hgroup className="mb-4">
                <h2 className=" text-5xl font-bold text-black leading-[75px]">
                  Entre com sua conta de clínica.
                </h2>
              </hgroup>
              <p className="text-lg text-gray-900 font-medium">
                Acesse o Agenda Saúde com sua conta de clínica.
              </p>
            </div>
          </div>
          <div className=" min-h-screen flex-1 px-8 py-8 2xl:px-0 flex justify-center  md:justify-center items-center md:items-start bg-[#c2c1c1] ">
            <div>
              <hgroup className="mb-8 flex flex-col gap-4">
                <Logo imagePath={"/logo_soujunior.png"} />
                <h3 className=" text-3xl font-semibold">Entrar</h3>
                <span className=" text-base font-medium">
                  Acesse o Agenda Saúde com sua conta de clínica.
                </span>
              </hgroup>

              <form
                className=" w-full flex justify-between flex-col gap-28"
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
                        <LuEye size={"1.25em"} />
                      ) : (
                        <LuEyeOff size={"1.25em"} />
                      )}
                    </span>
                  </div>
                  <Link href="#" className="font-semibold hover:underline mt-4">
                    Esqueci minha senha.
                  </Link>
                </fieldset>
                <div className="flex items-center justify-center">
                  <Button type="submit" className="  w-3/4 ">
                    <span>Entrar</span>
                    <MdKeyboardArrowRight color="white" className=" size-8" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}
