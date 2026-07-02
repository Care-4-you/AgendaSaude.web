import { useCreateClinic } from "../_hook/useCreateClinic";
import { SubmitHandler, useWatch } from "react-hook-form";
import { StepOneFormData } from "../_schemas/clinic-schema";
import { RHFInput } from "@/components/RHFInput";
import { FieldGroup } from "@/components/ui/field";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import uploadsvg from "@/assets/upload.svg";
import { useClinicStore } from "@/lib/store/clinic-store";
import { RHFCheckBox } from "@/components/RHFCheckBox";
import { useEffect } from "react";

export function StepOne() {
  const { formData, updateFormData, nextStep } = useClinicStore();

  console.log("formData", formData);

  const { StepOneForm } = useCreateClinic({
    initialValues: {
      name: formData.name,
      phone: formData.phone,
      cellPhone: formData.cellPhone,
      whatsapp: formData.whatsapp,
      isWhatsapp: formData.isWhatsapp
    }
  });

  const isWhatsappChecked = useWatch({
    control: StepOneForm.control,
    name: "isWhatsapp"
  });
  const cellPhoneValue = useWatch({
    control: StepOneForm.control,
    name: "cellPhone"
  });

  const onSubmit: SubmitHandler<StepOneFormData> = (data) => {
    updateFormData(data);
    nextStep();
  };

  useEffect(() => {
    if (isWhatsappChecked === true) {
      StepOneForm.setValue("whatsapp", cellPhoneValue, {
        shouldDirty: true,
        shouldValidate: true
      });
    }
  }, [isWhatsappChecked, StepOneForm, cellPhoneValue]);

  return (
    <form
      id="form-rhf-step-1"
      onSubmit={StepOneForm.handleSubmit(onSubmit)}
      noValidate
    >
      <FieldGroup className="grid grid-cols-6">
        <div className="col-span-6 flex flex-col gap-6">
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
          className="col-span-6"
          placeholder="Nome da clinica"
          label="Nome da clinica*"
          control={StepOneForm.control}
        />
        <RHFInput<StepOneFormData>
          id="phone"
          type="text"
          name="phone"
          className="col-span-6 lg:col-span-2 "
          placeholder="(00) 00000-0000"
          mask="PHONE"
          label="Telefone*"
          control={StepOneForm.control}
        />
        <RHFInput<StepOneFormData>
          id="cellPhone"
          type="text"
          name="cellPhone"
          className="col-span-4 lg:col-span-2 "
          placeholder="(00) 00000-0000"
          mask="CELLPHONE"
          label="Celular*"
          control={StepOneForm.control}
        />
        <RHFCheckBox<StepOneFormData>
          id="isWhatsapp"
          name="isWhatsapp"
          className="col-span-2 flex items-center justify-start lg:col-span-2 "
          label={<p className="text-xs">É WhatsApp?</p>}
          control={StepOneForm.control}
        />
        <RHFInput<StepOneFormData>
          id="whatsapp"
          type="text"
          name="whatsapp"
          className="col-span-6 lg:col-span-2 "
          placeholder="(00) 00000-0000"
          mask="CELLPHONE"
          label="WhatsApp*"
          disabled={isWhatsappChecked}
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
