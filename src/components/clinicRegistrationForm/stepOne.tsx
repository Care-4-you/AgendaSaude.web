import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";

import { ClinicaFormData } from "../../shared/interfaces/IClinica";

function StepOne() {
  const {
    register,

    formState: { errors }
  } = useFormContext<ClinicaFormData>();

  return (
    <fieldset className="grid grid-cols-2 gap-x-4 ">
      <Input
        id="name"
        type="text"
        className="col-span-2"
        placeholder="Nome da clínica"
        label="Nome da clinica*"
        {...register("name", {
          required: {
            value: true,
            message: "Campo Nome da clínica é obrigatorio"
          }
        })}
        error={errors.name ? errors.name.message : ""}
      />
      <Input
        id="phone"
        mask="phone"
        type="tel"
        className="col-span-1"
        placeholder="(00) 0000-0000"
        label="Telefone*"
        {...register("phone", {
          required: {
            value: true,
            message: "Campo Telefone é obrigatorio"
          },
          pattern: {
            value:
              /^\(?(?:(?:\+|00)?(55)\s?)?(?:(?:(?:(?:\d{2})|\((?:0?[1-9]|[1-9][0-9])\))\s?)?(?:[2-9]\d{3})[-.\s]?(\d{4}))$/,
            message: "Formato invalido"
          }
        })}
        error={errors.phone ? errors.phone.message : ""}
      />
      <Input
        id="cellPhone"
        mask="cellphone"
        type="tel"
        className="col-span-1"
        placeholder="(00) 00000-0000"
        label="Celular*"
        {...register("cellPhone", {
          required: {
            value: true,
            message: "Campo Celular é obrigatorio"
          },
          pattern: {
            value:
              /^\(?(?:(?:\+|00)?(55)\s?)?(?:(?:(?:(?:\d{2})|\((?:0?[1-9]|[1-9][0-9])\))\s?)?(?:9\d{4})[-.\s]?(\d{4}))$/,
            message: "Formato invalido"
          }
        })}
        error={errors.cellPhone ? errors.cellPhone.message : ""}
      />
      <Input
        id="whatapp"
        mask="cellphone"
        type="tel"
        className="col-span-1"
        placeholder="(00) 00000-0000"
        label="Whatapp*"
        {...register("whatapp", {
          required: {
            value: true,
            message: "Campo Whatapp é obrigatorio"
          },
          pattern: {
            value:
              /^\(?(?:(?:\+|00)?(55)\s?)?(?:(?:(?:(?:\d{2})|\((?:0?[1-9]|[1-9][0-9])\))\s?)?(?:9\d{4})[-.\s]?(\d{4}))$/,
            message: "Formato invalido"
          }
        })}
        error={errors.whatapp ? errors.whatapp.message : ""}
      />
      <Input
        id="CNPJ"
        mask="cnpj"
        type="text"
        className="col-span-1"
        placeholder="XX.XXX.XXX/0001-XX"
        label="CNPJ*"
        {...register("cnpj", {
          required: {
            value: true,
            message: "Campo CNPJ é obrigatorio"
          },
          pattern: {
            value: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
            message: "Formato invalido"
          }
        })}
        error={errors.cnpj ? errors.cnpj.message : ""}
      />
    </fieldset>
  );
}

export default StepOne;
