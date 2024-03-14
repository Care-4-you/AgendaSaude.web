import Image from "next/image";
import { useFormContext } from "react-hook-form";

import { ClinicaFormData } from "../../shared/interfaces/IClinica";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function StepFour() {
  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext<ClinicaFormData>();
  const password = watch("password");

  return (
    <fieldset className="grid grid-cols-2 gap-x-4 ">
      <Input
        className="col-span-2"
        placeholder="Email"
        label="Email*"
        id="email"
        type="text"
        {...register("email", {
          required: {
            value: true,
            message: "Campo Email é obrigatorio"
          },
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Formato invalido Ex. exemplo@email.com"
          }
        })}
        error={errors.email ? errors.email.message : ""}
      />
      <Input
        className="col-span-2"
        placeholder="Senha"
        label="Senha*"
        id="password"
        type="password"
        {...register("password", {
          required: { value: true, message: "Campo Senha é obrigatorio" },
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
      <Input
        className="col-span-2"
        placeholder="Repetir senha"
        label="Repetir senha*"
        id="confirmPassword"
        type="password"
        {...register("confirmPassword", {
          required: {
            value: true,
            message: "Campo Repetir senha é obrigatorio"
          },
          validate: (value) => value === password || "A senha nao corresponde"
        })}
        error={errors.confirmPassword ? errors.confirmPassword.message : ""}
      />
      <div className="flex flex-col gap-6 col-span-2 m-2">
        <Label htmlFor="">Carregar imagem/logotipo</Label>
        <Label
          htmlFor="image"
          className=" cursor-pointer flex  justify-start  gap-14 items-center"
        >
          <div className="bg-white size-20 flex justify-center items-center">
            <Image
              src="/upload.svg"
              width={50}
              height={50}
              alt="Picture of the author"
            />
          </div>
          <div>
            <p className=" font-bold text-base leading-6 text-black  underline underline-offset-4">
              Selecione o arquivo
            </p>
            <p className=" font-medium text-xs leading-[18px] text-black ">
              Certifique-se de que o arquivo esteja abaixo de 2mb
            </p>
          </div>
        </Label>

        <input type="file" id="image" name="image" hidden />
      </div>
      <div className="  grid  grid-cols-1 col-span-2 my-3 ">
        <div className="flex items-center  space-x-2  col-span-1">
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
            className="text-xs  font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Você aceita os
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className=" font-medium"
            >
              {" "}
              Termos e condições do Agenda Saúde
            </a>{" "}
            e a sua{" "}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className=" font-medium"
            >
              Política de Privacidade?
            </a>
          </label>
        </div>
        <p className="flex items-center space-x-2  col-span-1 h-4 text-sm  font-bold text-red-500 mt-1.5 ">
          {errors.acceptTerm ? errors.acceptTerm.message : ""}
        </p>
      </div>
    </fieldset>
  );
}

export default StepFour;
