import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { PacienteFormData } from "@/shared/interfaces/IPacient";

import { UseSearchCep } from "../../Api/UseSearchCep";
import { noMask } from "../../hooks/useMask";
import { Input } from "../ui/input";

function StepTwo() {
  const {
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<PacienteFormData>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cep = noMask(watch("zipcode"));
  const hasNumber = watch("hasNumber");
  const { CepData } = UseSearchCep({ cep });

  useEffect(() => {
    if (hasNumber) return setValue("houseNumber", "", { shouldValidate: true });
  }, [hasNumber, setValue]);

  useEffect(() => {
    if (CepData) {
      setValue("state", CepData.estado);
      setValue("street", CepData.logradouro);
      setValue("city", CepData.localidade);
      setValue("neighborhood", CepData.bairro);
    }
    if (cep === "") {
      setValue("state", "");
      setValue("street", "");
      setValue("city", "");
      setValue("neighborhood", "");
      return;
    }
  }, [CepData, cep, setValue]);

  return (
    <fieldset className="grid grid-cols-6 gap-x-4 ">
      <Input
        labelClassName="text-white"
        className="col-span-3"
        mask="cep"
        placeholder="CEP"
        label="Cep*"
        id="zipcode"
        type="text"
        {...register("zipcode", {
          required: {
            value: true,
            message: "Campo CEP é obrigatório"
          },
          pattern: {
            value: /^\d{5}-\d{3}$/,
            message: "Formato inválido"
          }
        })}
        error={errors.zipcode ? errors.zipcode.message : ""}
      />
      <Input
        className="col-span-3 text-white"
        placeholder="Estado"
        label="Estado*"
        id="state"
        type="text"
        {...register("state", {
          required: {
            value: true,
            message: "Campo Estado é obrigatório"
          }
        })}
        error={errors.state ? errors.state.message : ""}
      />
      <Input
        className="col-span-6 lg:col-span-6 text-white"
        placeholder="Endereço"
        label="Endereço*"
        id="street"
        type="text"
        {...register("street", {
          required: {
            value: true,
            message: "Campo de endereço é obrigatório"
          },
          maxLength: 255
        })}
        error={errors.street ? errors.street.message : ""}
      />
      <Input
        className="col-span-3 text-white"
        placeholder="Cidade "
        label="Cidade*"
        id="city"
        type="text"
        {...register("city", {
          required: {
            value: true,
            message: "Campo Cidade é obrigatório"
          }
        })}
        error={errors.city ? errors.city.message : ""}
      />
      <Input
        className="col-span-3 text-white"
        placeholder="Bairro"
        label="Bairro*"
        id="neighborhood"
        type="text"
        {...register("neighborhood", {
          required: {
            value: true,
            message: "Campo Bairro é obrigatório"
          }
        })}
        error={errors.neighborhood ? errors.neighborhood.message : ""}
      />
      <Input
        className="col-span-6 text-white"
        placeholder="Complemento"
        label="Complemento"
        id="addressComplement"
        type="text"
        {...register("addressComplement")}
      />
    </fieldset>
  );
}

export default StepTwo;
