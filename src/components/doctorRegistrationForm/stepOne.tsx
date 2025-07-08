import Image from "next/image";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import uploadsvg from "@/assets/upload.svg";
import { Input } from "@/components/ui/input";

import { DoctorFormData } from "../../shared/interfaces/IDoctor";
import { Label } from "../ui/label";

const animatedComponents = makeAnimated();

function StepOne() {
  const genero = [
    { value: "masculino", label: "Masculino" },
    { value: "feminino", label: "Feminino" },
    { value: "prefiroNaoDizer", label: "Prefiro não dizer" }
  ];

  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<DoctorFormData>();

  const colorStyles = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: (styles: any) => ({
      ...styles,
      minHeight: "2.75em"
    })
  };

  return (
    <fieldset className="grid grid-cols-6 items-center  gap-x-4  ">
      <div className="col-span-6 mb-2 flex flex-col gap-6">
        <Label htmlFor="" className="text-white">
          Carregar imagem/logotipo
        </Label>
        <Label
          htmlFor="image"
          className=" flex cursor-pointer  items-center  justify-start gap-14 "
        >
          <div className="flex items-center justify-center rounded-sm bg-white p-8">
            <Image
              src={uploadsvg}
              width={70}
              height={70}
              alt="Picture of the author"
            />
          </div>
          <div>
            <p className=" text-base font-bold leading-6 text-white  underline underline-offset-4">
              Selecione uma imagem
            </p>
            <p className=" text-xs font-medium leading-[18px] text-white ">
              Certifique-se de que o arquivo esteja abaixo de 2mb
            </p>
          </div>
        </Label>

        <input type="file" id="image" name="image" hidden />
      </div>
      <Input
        labelClassName="text-white"
        id="name"
        type="text"
        className="col-span-6 lg:col-span-3"
        placeholder="Nome "
        label="Nome*"
        {...register("name", {
          required: {
            value: true,
            message: "Campo Nome é obrigatório"
          },
          maxLength: 255
        })}
        error={errors.name ? errors.name.message : ""}
      />
      <div className="col-span-6 flex flex-col gap-3 lg:col-span-3  ">
        <Label htmlFor="convenio" className="text-white">
          Gênero*
        </Label>
        <Controller
          control={control}
          name="gender"
          rules={{ required: true }}
          render={(renderProps) => {
            return (
              <Select
                className={`w-full ${errors.gender ? " rounded-md border-2  border-red-500  focus-visible:ring-red-500" : ""}`}
                styles={colorStyles}
                id="genero"
                components={animatedComponents}
                placeholder="Selecionar"
                options={genero}
                menuPlacement="auto"
                isSearchable={false}
                menuPosition="fixed"
                menuPortalTarget={document.body}
                {...register("gender", {
                  required: {
                    value: true,
                    message: "Campo é obrigatório"
                  }
                })}
                {...renderProps.field}
                onChange={(e) => {
                  renderProps.field.onChange(e);
                }}
              />
            );
          }}
        />
        <p className=" min-h-2 text-sm font-semibold text-red-500">
          {errors.gender ? errors.gender.message : ""}
        </p>
      </div>
      <Input
        labelClassName="text-white"
        id="phone"
        mask="phone"
        type="tel"
        className=" col-span-6 lg:col-span-3"
        placeholder="(00) 0000-0000"
        label="Telefone*"
        {...register("phone", {
          required: {
            value: true,
            message: "Campo Telefone é obrigatório"
          },
          pattern: {
            value:
              /^\(?(?:(?:\+|00)?(55)\s?)?(?:(?:(?:(?:\d{2})|\((?:0?[1-9]|[1-9][0-9])\))\s?)?(?:[2-9]\d{3})[-.\s]?(\d{4}))$/,
            message: "Formato inválido"
          }
        })}
        error={errors.phone ? errors.phone.message : ""}
      />
      <Input
        labelClassName="text-white"
        id="cellPhone"
        mask="cellphone"
        type="tel"
        className="col-span-6 lg:col-span-3"
        placeholder="(00) 00000-0000"
        label="Celular(whatsapp)*"
        {...register("cellPhone", {
          required: {
            value: true,
            message: "Campo obrigatório"
          },
          pattern: {
            value:
              /^\(?(?:(?:\+|00)?(55)\s?)?(?:(?:(?:(?:\d{2})|\((?:0?[1-9]|[1-9][0-9])\))\s?)?(?:9\d{4})[-.\s]?(\d{4}))$/,
            message: "Formato inválido"
          }
        })}
        error={errors.cellPhone ? errors.cellPhone.message : ""}
      />
    </fieldset>
  );
}

export default StepOne;
