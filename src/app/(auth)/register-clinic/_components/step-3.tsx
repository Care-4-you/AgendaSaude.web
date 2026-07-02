import { useClinicStore } from "@/lib/store/clinic-store";
import { useCreateClinic} from "../_hook/useCreateClinic";
import { SubmitHandler } from "react-hook-form";
import { StepThreeFormData } from "../_schemas/clinic-schema";

import { FieldGroup } from "@/components/ui/field";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { RHFSelect } from "../../../../components/RHFSelect";
import { convenios } from "../../../../shared/utils";

export function StepThree() {
  const { formData, updateFormData, prevStep, nextStep } = useClinicStore();

  const { StepThreeForm } = useCreateClinic({
    stepThreeInitialValues: {
      healthInsurance: formData.healthInsurance
    }
  });

  const onSubmit: SubmitHandler<StepThreeFormData> = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form
      id="form-rhf-step-3"
      onSubmit={StepThreeForm.handleSubmit(onSubmit)}
      noValidate
    >
      <FieldGroup className="gap-4">
        <RHFSelect<StepThreeFormData>
          options={convenios}
          isMulti={true}
          id="healthInsurance"
          name="healthInsurance"
          className="col-span-4 "
          placeholder="Convênio"
          label="Convênio*"
          control={StepThreeForm.control}
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
          disabled={StepThreeForm.formState.isSubmitting}
        >
          Continuar
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
