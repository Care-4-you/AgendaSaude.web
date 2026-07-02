import { useClinicStore } from "@/lib/store/clinic-store";
import { useCreateClinic } from "../_hook/useCreateClinic";
import { useState } from "react";
import { SubmitHandler, useWatch } from "react-hook-form";
import { StepFourFormData } from "../_schemas/clinic-schema";
import { RHFInput } from "@/components/RHFInput";
import { FieldGroup } from "@/components/ui/field";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RHFCheckBox } from "@/components/RHFCheckBox";
import Link from "next/link";

export function StepFour() {
  const { formData, updateFormData, prevStep, onComplete } = useClinicStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { StepFourForm } = useCreateClinic({
    stepFourInitialValues: {
      email: formData.email,
      cnpj: formData.cnpj,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      acceptTerm: formData.acceptTerm
    }
  });

  const isChecked = useWatch({
    control: StepFourForm.control,
    name: "acceptTerm"
  });

  const onSubmit: SubmitHandler<StepFourFormData> = (data) => {
    updateFormData(data);
    onComplete();
  };

  return (
    <form
      id="form-rhf-step-4"
      onSubmit={StepFourForm.handleSubmit(onSubmit)}
      noValidate
    >
      <FieldGroup className="gap-4">
        <RHFInput<StepFourFormData>
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          label="Email*"
          control={StepFourForm.control}
        />
        <div className="relative">
          <RHFInput<StepFourFormData>
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Senha"
            label="Senha*"
            control={StepFourForm.control}
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
          <RHFInput<StepFourFormData>
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirmar Senha"
            label="Confirmar Senha*"
            control={StepFourForm.control}
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
        <RHFInput<StepFourFormData>
          id="cnpj"
          type="text"
          name="cnpj"
          placeholder="XX.XXX.XXX/XXXX-XX"
          label="CNPJ*"
          control={StepFourForm.control}
          mask="CNPJ"
        />

        <RHFCheckBox<StepFourFormData>
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
          control={StepFourForm.control}
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
          disabled={!isChecked || StepFourForm.formState.isSubmitting}
        >
          Finalizar
        </Button>
      </div>
    </form>
  );
}
