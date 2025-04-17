import Image from "next/image";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";

import { ClinicaFormData } from "../../shared/interfaces/IClinica";
import { Label } from "../ui/label";

function StepOne() {
  const {
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<ClinicaFormData>();

  const isWhatsapp: boolean = watch("isWhatsapp");
  const cellPhoneNumber: string = watch("cellPhone");

  useEffect(() => {
    if (isWhatsapp)
      return setValue("whatsapp", cellPhoneNumber, { shouldValidate: true });
  }, [cellPhoneNumber, isWhatsapp, setValue]);

  return (
    <fieldset className="grid grid-cols-4 items-center  gap-x-4  ">
      <div className="col-span-4 mb-2 flex flex-col gap-6">
        <Label htmlFor="" className="text-white">
          Carregar imagem/logotipo
        </Label>
        <Label
          htmlFor="image"
          className=" flex cursor-pointer  items-center  justify-start gap-14 "
        >
          <div className="flex items-center justify-center rounded-sm bg-white p-8">
            <Image
              src="/upload.svg"
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
        className="col-span-4"
        placeholder="Nome da clínica"
        label="Nome da clínica*"
        {...register("name", {
          required: {
            value: true,
            message: "Campo Nome da clínica é obrigatório"
          },
          maxLength: 255
        })}
        error={errors.name ? errors.name.message : ""}
      />
      <Input
        labelClassName="text-white"
        id="phone"
        mask="phone"
        type="tel"
        className=" col-span-4 lg:col-span-2"
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
        className="col-span-2 lg:col-span-1"
        placeholder="(00) 00000-0000"
        label="Celular*"
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
      <div className=" col-span-2 flex w-full  items-center  justify-start gap-1 lg:col-span-1  ">
        <input
          type="checkbox"
          id="isWhatsapp"
          {...register("isWhatsapp", {
            required: false
          })}
        />
        <Label htmlFor="isWhatsapp" className=" text-xs text-white">
          É whatsapp ?
        </Label>
      </div>
      <Input
        labelClassName="text-white"
        disabled={isWhatsapp}
        id="whatsapp"
        mask="cellphone"
        type="tel"
        className="col-span-2"
        placeholder="(00) 00000-0000"
        label="Whatapp*"
        {...register("whatsapp", {
          required: {
            value: isWhatsapp ? false : true,
            message: "Campo Whatapp é obrigatório"
          },
          pattern: {
            value:
              /^\(?(?:(?:\+|00)?(55)\s?)?(?:(?:(?:(?:\d{2})|\((?:0?[1-9]|[1-9][0-9])\))\s?)?(?:9\d{4})[-.\s]?(\d{4}))$/,
            message: "Formato inválido"
          }
        })}
        error={errors.whatsapp ? errors.whatsapp.message : ""}
      />
    </fieldset>
  );
}

export default StepOne;
