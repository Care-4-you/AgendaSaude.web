"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";

import iconplus from "@/assets/icon-plus.png";
import { default as LayoutContainer } from "@/components/layout/container";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

import StepOne from "../../../components/patientRegistrationForm/stepOne";
import StepThree from "../../../components/patientRegistrationForm/stepThree";
import StepTwo from "../../../components/patientRegistrationForm/stepTwo";
import { Button } from "../../../components/ui/button";
import UseMulitstepForm from "../../../hooks/UseMultistepForm";
import { ClinicaFormData } from "../../../shared/interfaces/IClinica";

export default function registerPaciente() {
  const [openModal, setOpenModal] = useState(false);
  const [progress, setProgress] = useState(25);
  const router = useRouter();

  const methods = useForm<ClinicaFormData>({
    defaultValues: { isWhatsapp: false, acceptTerm: false, hasNumber: false }
  });

  const acceptTerm = methods.watch("acceptTerm");

  const { currentStep, step, isFirstStep, back, next, isLastStep } =
    UseMulitstepForm([
      <StepOne key="stepOne" />,
      <StepTwo key="stepTwo" />,
      <StepThree key="stepThree" />
    ]);

  useEffect(() => {
    function getProgress() {
      if (currentStep + 1 === 1) {
        return setProgress(33);
      }
      if (currentStep + 1 === 2) {
        return setProgress(66);
      }
      if (currentStep + 1 === 3) {
        return setProgress(100);
      }
    }
    getProgress();
  }, [currentStep]);

  const onSubmit: SubmitHandler<ClinicaFormData> = (data, event) => {
    event?.preventDefault();
    console.log(data);
    if (!isLastStep) return next();
    setOpenModal(true);
  };

  function sendEmail() {
    setOpenModal(false);
    router.push("/");
  }
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-agenda-saude-blue-100 from-50% to-agenda-saude-purple-200 to-50% md:bg-gradient-to-r">
        <LayoutContainer className="flex min-h-screen flex-col px-0 md:flex-row ">
          <div className="flex flex-1 justify-center bg-agenda-saude-blue-100 p-8  md:justify-start 2xl:p-0 ">
            <hgroup className="max-w-[27rem] p-4 md:p-0 md:pt-16">
              <h2 className="mb-7 font-museo text-3xl font-semibold text-black xs:text-5xl xs:leading-[150%]">
                Dê o primeiro passo para uma jornada de saúde facilitada.
              </h2>
              <p className="text-lg font-medium text-gray-900">
                Ao se cadastrar, você abre as portas para uma rede de saúde que
                conecta você a clínicas e especialistas dedicados. Cuide-se com
                mais facilidade e encontre o suporte que precisa para uma vida
                mais saudável e equilibrada. Vamos juntos nessa jornada?
              </p>
            </hgroup>
          </div>
          <div className=" flex min-h-screen flex-1 flex-col items-center justify-start bg-agenda-saude-purple-200 md:items-end">
            <div className="max-w-2xl px-8 py-16 md:pl-14">
              <Image alt="Logo" src={iconplus} height={42} width={40} />
              <h3 className="my-2.5 font-museo text-[32px] font-semibold text-white">
                Saúde ao seu alcance, comece agora.
              </h3>
              <span className="font-poppins text-base font-medium text-white">
                Preencha suas informações e descubra a diferença que um bom
                cuidado pode fazer.
              </span>
              <Progress
                value={progress}
                className="mb-10 mt-12 h-4 w-full bg-agenda-saude-blue-100"
              />
              <FormProvider {...methods}>
                <form
                  className=" flex w-full flex-col justify-between gap-28"
                  onSubmit={methods.handleSubmit((e) => onSubmit(e))}
                >
                  {step}
                  <div className="flex items-center justify-center gap-4 ">
                    {!isFirstStep && (
                      <Button
                        variant={"secondary"}
                        onClick={back}
                        type="button"
                        className="inline-flex h-11 w-full max-w-64 items-center justify-center rounded-lg bg-white text-black hover:bg-white/90"
                      >
                        Voltar
                      </Button>
                    )}

                    <Button
                      type="submit"
                      className=" inline-flex h-11 w-full max-w-64 items-center justify-center rounded-lg bg-black hover:bg-black/80"
                      disabled={!acceptTerm && isLastStep}
                    >
                      <span>{isLastStep ? "Finalizar" : "Continuar"}</span>
                      {isLastStep ? null : (
                        <MdKeyboardArrowRight
                          color="white"
                          className=" size-8"
                        />
                      )}
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </LayoutContainer>
      </div>
      <Dialog
        open={openModal}
        defaultOpen={openModal}
        modal
        onOpenChange={() => setOpenModal((prev) => !prev)}
      >
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader className="gap-5">
            <DialogTitle className="text-center text-5xl font-semibold  text-black">
              Cadastro realizado com sucesso
            </DialogTitle>
            <DialogDescription className="text-center text-base  font-normal leading-6  text-[#2D2E2E]">
              Confirme sua conta através do link enviado para seu e-mail
              cadastrado.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="   flex items-center sm:justify-center">
            <Button
              type="submit"
              className="w-2/5 px-4 py-7 text-white"
              onClick={sendEmail}
            >
              Concluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
