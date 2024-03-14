import { useFormContext } from "react-hook-form";

import { noMask } from "../../hooks/useMask";
import { ClinicaFormData } from "../../shared/interfaces/IClinica";
import { Input } from "../ui/input";

function StepTwo() {
  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext<ClinicaFormData>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cep = noMask(watch("zipcode"));

  return (
    <fieldset className="grid grid-cols-2 gap-x-4 ">
      <Input
        className="col-span-2"
        placeholder="Logradouro"
        label="Logradouro*"
        id="street"
        type="text"
        {...register("street", {
          required: {
            value: true,
            message: "Campo Logradouro é obrigatorio"
          }
        })}
        error={errors.street ? errors.street.message : ""}
      />
      <Input
        className="col-span-1"
        mask="cep"
        placeholder="CEP"
        label="Cep*"
        id="zipcode"
        type="text"
        {...register("zipcode", {
          required: {
            value: true,
            message: "Campo CEP é obrigatorio"
          },
          pattern: {
            value: /^\d{5}-\d{3}$/,
            message: "Formato invalido"
          }
        })}
        error={errors.zipcode ? errors.zipcode.message : ""}
      />
      <Input
        className="col-span-1"
        placeholder="Estado"
        label="Estado*"
        id="state"
        type="text"
        {...register("state", {
          required: {
            value: true,
            message: "Campo Estado é obrigatorio"
          }
        })}
        error={errors.state ? errors.state.message : ""}
      />
      <Input
        className="col-span-1"
        placeholder="Cidade"
        label="Cidade*"
        id="city"
        type="text"
        {...register("city", {
          required: {
            value: true,
            message: "Campo Cidade é obrigatorio"
          }
        })}
        error={errors.city ? errors.city.message : ""}
      />
      <Input
        className="col-span-1"
        placeholder="Bairro"
        label="Bairro*"
        id="neighborhood"
        type="text"
        {...register("neighborhood", {
          required: {
            value: true,
            message: "Campo Bairro é obrigatorio"
          }
        })}
        error={errors.neighborhood ? errors.neighborhood.message : ""}
      />
      <Input
        className="col-span-2"
        placeholder="Complemento"
        label="Complemento"
        id="addressComplement"
        type="text"
      />
    </fieldset>
  );
}

export default StepTwo;
