import Image from "next/image";
import { SubmitHandler } from "react-hook-form";

import uploadsvg from "@/assets/upload.svg";
import { RHFInput } from "@/components/RHFInput";
import { RHFSelect } from "@/components/RHFSelect";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { usePacientStore } from "@/lib/store/pacient-store";
import { ArrowRight } from "lucide-react";

import { useCreatePacient } from "../_hook/useCreatePacient";
import { StepOneFormData } from "../_schemas/pacient-schema";

const MIN_BIRTH_DATE = "1900-01-01";

function formatDateToInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function StepOne() {
  const { formData, updateFormData, nextStep } = usePacientStore();
  const today = new Date();
  const maxBirthDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  const genero = [
    { value: "masculino", label: "Masculino" },
    { value: "feminino", label: "Feminino" },
    { value: "prefiroNaoDizer", label: "Prefiro não dizer" }
  ];

  const { StepOneForm } = useCreatePacient({
    initialValues: {
      name: formData.name,
      date: formData.date,
      gender: formData.gender
    }
  });

  const onSubmit: SubmitHandler<StepOneFormData> = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form
      id="form-rhf-step-1"
      onSubmit={StepOneForm.handleSubmit(onSubmit)}
      noValidate
    >
      <FieldGroup className="gap-4">
        <div className="col-span-4 flex flex-col gap-6">
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
        <RHFInput<StepOneFormData>
          id="name"
          type="text"
          name="name"
          className="col-span-4 "
          placeholder="Nome completo"
          label="Nome completo*"
          control={StepOneForm.control}
        />
        <RHFInput<StepOneFormData>
          id="date"
          type="date"
          name="date"
          className="col-span-4 "
          placeholder="Data de aniversário"
          label="Data de aniversário*"
          control={StepOneForm.control}
          min={MIN_BIRTH_DATE}
          max={formatDateToInput(maxBirthDate)}
        />
        <RHFSelect<StepOneFormData>
          options={genero}
          id="gender"
          name="gender"
          className="col-span-4 "
          placeholder="Gênero"
          label="Gênero*"
          control={StepOneForm.control}
        />
      </FieldGroup>
      <div className="pt-10">
        <Button
          type="submit"
          className=" inline-flex h-11 w-full  items-center justify-center rounded-lg bg-black hover:bg-black/80"
          disabled={StepOneForm.formState.isSubmitting}
        >
          Continuar
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
