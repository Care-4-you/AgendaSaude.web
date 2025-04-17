"use client";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";

import { PacienteFormData } from "../../shared/interfaces/IPacient";
import { Input } from "../ui/input";
import Link from "next/link";

function StepFour() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext<PacienteFormData>();
  const password = watch("password");
  return (
    <fieldset className="grid grid-cols-2 items-center  gap-x-4 ">
      <Input
        className="col-span-2"
        placeholder="Email"
        labelClassName="text-white"
        label="Email*"
        id="email"
        type="text"
        {...register("email", {
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
            required: { value: true, message: "Campo Senha é obrigatório" },
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
                /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?/~]).+$/.test(value) ||
                "Deve conter caracters especiaos Ex. @ # $"
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
          labelClassName="text-white"
          placeholder="Repetir senha"
          label="Repetir senha*"
          id="confirmPassword"
          type={isShowConfirmPassword ? "text" : "password"}
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Campo Repetir senha é obrigatório"
            },
            validate: (value) => value === password || "A senha não corresponde"
          })}
          error={errors.confirmPassword ? errors.confirmPassword.message : ""}
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
        <Input
          labelClassName="text-white"
          id="CPF"
          mask="cpf"
          type="text"
          className="col-span-2"
          placeholder="XX.XXX.XXX-XX"
          label="CPF*"
          {...register("cpf", {
            required: {
              value: true,
              message: "Campo CPF é obrigatório"
            },
            pattern: {
              value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
              message: "Formato inválido"
            }
          })}
          error={errors.cpf ? errors.cpf.message : ""}
        />
      </div>

      <div className="  col-span-2  my-3 grid grid-cols-1 ">
        <div className="col-span-1 flex  items-center  space-x-2">
          <input
            type="checkbox"
            id="acceptTerm"
            {...register("acceptTerm", {
              required: {
                value: true,
                message: "Deve aceitar os termos de condiçoes"
              }
            })}
          />
          <label
            htmlFor="acceptTerm"
            className="text-xs  font-light leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Você aceita os
            <Link
              href="/termos-e-politicas-de-privacidade"
              target="_blank"
              rel="noopener noreferrer"
              className=" font-medium"
            >
              {" "}
              Termos e condições do Agenda Saúde?
            </Link>{" "}
          </label>
        </div>
        <p className="col-span-1 mt-1.5 flex  h-4 items-center space-x-2  text-sm font-semibold text-red-500 ">
          {errors.acceptTerm ? errors.acceptTerm.message : ""}
        </p>
      </div>
    </fieldset>
  );
}

export default StepFour;
