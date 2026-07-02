import { useClinicStore } from "@/lib/store/clinic-store";
import { useCreateClinic } from "../_hook/useCreateClinic";
import { SubmitHandler, useWatch } from "react-hook-form";
import { StepTwoFormData } from "../_schemas/clinic-schema";
import { RHFInput } from "@/components/RHFInput";
import { FieldGroup } from "@/components/ui/field";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { noMask } from "../../../../hooks/useMask";
import { UseSearchCep } from "../../../../Api/UseSearchCep";
import { useEffect } from "react";
import { RHFCheckBox } from "../../../../components/RHFCheckBox";

export function StepTwo() {
  const { formData, updateFormData, nextStep, prevStep } = useClinicStore();

  const { StepTwoForm } = useCreateClinic({
    stepTwoInitialValues: {
      zipcode: formData.zipcode,
      state: formData.state,
      city: formData.city,
      neighborhood: formData.neighborhood,
      address: formData.address,
      addressComplement: formData.addressComplement
    }
  });

  const cep = noMask(
    useWatch({ control: StepTwoForm.control, name: "zipcode" })
  );
  const hasNumberChecked = useWatch({
    control: StepTwoForm.control,
    name: "hasNumber"
  });

  const { CepData } = UseSearchCep({ cep });

  const onSubmit: SubmitHandler<StepTwoFormData> = (data) => {
    updateFormData(data);
    nextStep();
  };

  useEffect(() => {
    if (CepData) {
      StepTwoForm.setValue("state", CepData.estado);
      StepTwoForm.setValue("address", CepData.logradouro);
      StepTwoForm.setValue("city", CepData.localidade);
      StepTwoForm.setValue("neighborhood", CepData.bairro);
    }
    if (cep === "") {
      StepTwoForm.setValue("state", "");
      StepTwoForm.setValue("address", "");
      StepTwoForm.setValue("city", "");
      StepTwoForm.setValue("neighborhood", "");
      return;
    }
  }, [CepData, cep, StepTwoForm.setValue]);

  useEffect(() => {
    if (hasNumberChecked) {
      StepTwoForm.setValue("houseNumber", "", {
        shouldDirty: true,
        shouldValidate: true
      });
    }
  }, [hasNumberChecked, StepTwoForm]);

  return (
    <form
      id="form-rhf-step-2"
      onSubmit={StepTwoForm.handleSubmit(onSubmit)}
      noValidate
    >
      <FieldGroup className="grid grid-cols-6 gap-4 ">
        <RHFInput<StepTwoFormData>
          id="zipcode"
          type="text"
          name="zipcode"
          className="col-span-3 "
          placeholder="CEP"
          mask="CEP"
          label="Cep*"
          control={StepTwoForm.control}
        />
        <RHFInput<StepTwoFormData>
          id="state"
          type="text"
          name="state"
          className="col-span-3 "
          placeholder="Estado"
          label="Estado*"
          control={StepTwoForm.control}
        />
        <RHFInput<StepTwoFormData>
          id="address"
          type="text"
          name="address"
          className="lg:col-span-4 col-span-6"
          placeholder="Logradouro"
          label="Logradouro*"
          control={StepTwoForm.control}
        />
        <RHFInput<StepTwoFormData>
          id="houseNumber"
          type="text"
          name="houseNumber"
          className="lg:col-span-1 col-span-3"
          placeholder="Número"
          label="Nº*"
          disabled={hasNumberChecked}
          control={StepTwoForm.control}
        />
        <RHFCheckBox<StepTwoFormData>
          id="isWhatsapp"
          name="hasNumber"
          className="lg:col-span-1 col-span-3 flex items-center justify-start "
          label={<p className="text-xs">S/N</p>}
          control={StepTwoForm.control}
        />
        <RHFInput<StepTwoFormData>
          id="city"
          type="text"
          name="city"
          className="col-span-3 "
          placeholder="Cidade"
          label="Cidade*"
          control={StepTwoForm.control}
        />
        <RHFInput<StepTwoFormData>
          id="neighborhood"
          type="text"
          name="neighborhood"
          className="col-span-3 "
          placeholder="Bairro"
          label="Bairro*"
          control={StepTwoForm.control}
        />
        <RHFInput<StepTwoFormData>
          id="addressComplement"
          type="text"
          name="addressComplement"
          className="col-span-6 "
          placeholder="Complemento"
          label="Complemento"
          control={StepTwoForm.control}
        />
      </FieldGroup>
      <div className="flex gap-3 pt-10">
        <Button
          type="button"
          variant="outline"
          className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-white text-black hover:bg-white/90"
          onClick={prevStep}
        >
          Voltar
        </Button>
        <Button
          type="submit"
          className=" inline-flex h-11 w-full  items-center justify-center rounded-lg bg-black hover:bg-black/80"
          disabled={StepTwoForm.formState.isSubmitting}
        >
          Continuar
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
