import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useWatch } from "react-hook-form";

import { RHFCheckBox } from "@/components/RHFCheckBox";
import { RHFInput } from "@/components/RHFInput";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { usePacientStore } from "@/lib/store/pacient-store";
import { Eye, EyeOff } from "lucide-react";

import { useCreatePacient } from "../_hook/useCreatePacient";
import { StepThreeFormData } from "../_schemas/pacient-schema";

export function StepThree() {
  const { formData, updateFormData, prevStep, onComplete } = usePacientStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { StepThreeForm } = useCreatePacient({
    stepThreeInitialValues: {
      email: formData.email,
      cpf: formData.cpf,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      acceptTerm: formData.acceptTerm
    }
  });

  const isChecked = useWatch({
    control: StepThreeForm.control,
    name: "acceptTerm"
  });

  const onSubmit: SubmitHandler<StepThreeFormData> = (data) => {
    updateFormData(data);
    onComplete();
  };

  return (
    <form
      id="form-rhf-step-3"
      onSubmit={StepThreeForm.handleSubmit(onSubmit)}
      noValidate
    >
      <FieldGroup className="gap-4">
        <RHFInput<StepThreeFormData>
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          label="Email*"
          control={StepThreeForm.control}
        />
        <div className="relative">
          <RHFInput<StepThreeFormData>
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Senha"
            label="Senha*"
            control={StepThreeForm.control}
          />
          <button
            type="button"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4  top-[46px]  cursor-pointer "
          >
            {showPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>
        <div className="relative">
          <RHFInput<StepThreeFormData>
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirmar Senha"
            label="Confirmar Senha*"
            control={StepThreeForm.control}
          />
          <button
            type="button"
            aria-label={
              showConfirmPassword
                ? "Ocultar confirmação de senha"
                : "Mostrar confirmação de senha"
            }
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-4  top-[46px]  cursor-pointer "
          >
            {showConfirmPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>
        <RHFInput<StepThreeFormData>
          id="cpf"
          type="text"
          name="cpf"
          placeholder="XXX.XXX.XXX-XX"
          label="CPF*"
          control={StepThreeForm.control}
          mask="CPF"
        />

        <RHFCheckBox<StepThreeFormData>
          id="acceptTerm"
          name="acceptTerm"
          label={
            <>
              Você aceita os
              <Link
                href="/termos-e-politicas-de-privacidade"
                target="_blank"
                rel="noopener noreferrer"
                className=" font-medium"
              >
                {" "}
                Termos e condições do Agenda Saúde?
              </Link>{" "}
            </>
          }
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
          disabled={!isChecked || StepThreeForm.formState.isSubmitting}
        >
          Finalizar
        </Button>
      </div>
    </form>
  );
}
