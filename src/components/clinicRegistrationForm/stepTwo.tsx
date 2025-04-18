import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { UseSearchCep } from "../../Api/UseSearchCep";
import { noMask } from "../../hooks/useMask";
import { ClinicaFormData } from "../../shared/interfaces/IClinica";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function StepTwo() {
  const {
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<ClinicaFormData>();

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
        labelClassName="text-white"
        className="col-span-3"
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
        labelClassName="text-white"
        className="col-span-6 lg:col-span-4"
        placeholder="Logradouro"
        label="Logradouro*"
        id="street"
        type="text"
        {...register("street", {
          required: {
            value: true,
            message: "Campo Logradouro é obrigatório"
          },
          maxLength: 255
        })}
        error={errors.street ? errors.street.message : ""}
      />
      <Input
        labelClassName="text-white"
        mask="number"
        disabled={hasNumber}
        className=" col-span-3 lg:col-span-1"
        placeholder="Numero"
        label="Nº*"
        id="houseNumber"
        type="text"
        {...register("houseNumber", {
          required: {
            value: hasNumber ? false : true,
            message: "Campo obrigatório"
          }
        })}
        error={errors.houseNumber ? errors.houseNumber.message : ""}
      />
      <div className=" col-span-3 flex w-full  items-center  justify-start gap-1 lg:col-span-1  ">
        <input
          type="checkbox"
          id="hasNumber"
          {...register("hasNumber", {
            required: false
          })}
        />
        <Label htmlFor="hasNumber" className="text-xs text-white">
          S/N
        </Label>
      </div>
      <Input
        labelClassName="text-white"
        className="col-span-3"
        placeholder="Cidade"
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
        labelClassName="text-white"
        className="col-span-3"
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
        labelClassName="text-white"
        className="col-span-6"
        placeholder="Complemento"
        label="Complemento"
        id="addressComplement"
        {...register("addressComplement")}
        type="text"
      />
    </fieldset>
  );
}

export default StepTwo;
