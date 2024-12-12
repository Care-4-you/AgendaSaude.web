"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

import StepFour from "../../../components/clinicRegistrationForm/stepFour";
import StepOne from "../../../components/clinicRegistrationForm/stepOne";
import StepThree from "../../../components/clinicRegistrationForm/stepThree";
import StepTwo from "../../../components/clinicRegistrationForm/stepTwo";
import MaxWidthWrapper from "../../../components/MaxWidthWrapper";
import { Button } from "../../../components/ui/button";
import UseMulitstepForm from "../../../hooks/UseMultistepForm";
import { ClinicaFormData } from "../../../shared/interfaces/IClinica";
import Image from "next/image";

export default function registerClinical() {
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
      <StepThree key="stepThree" />,
      <StepFour key="stepFour" />
    ]);

  useEffect(() => {
    function getProgress() {
      if (currentStep + 1 === 1) {
        return setProgress(25);
      }
      if (currentStep + 1 === 2) {
        return setProgress(50);
      }
      if (currentStep + 1 === 3) {
        return setProgress(75);
      }
      if (currentStep + 1 === 4) {
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
      <div className="min-h-screen">
        <MaxWidthWrapper className="flex flex-col md:flex-row justify-between">
          <div className="flex-1 px-8 py-8  2xl:px-0 flex justify-center md:justify-start  bg-white pb-16 md:min-h-screen ">
            <div className="max-w-[27rem] md:pt-[72px]">
              <hgroup className="mb-4">
                <h2 className=" text-5xl font-semibold text-black leading-[150%] font-MuseoModerno">
                  Dê o primeiro passo para uma jornada de saúde facilitada.
                </h2>
              </hgroup>
              <p className="text-lg text-gray-900 font-medium">
                Ao se cadastrar, você abre as portas para uma rede de saúde que
                conecta você a clínicas e especialistas dedicados. Cuide-se com
                mais facilidade e encontre o suporte que precisa para uma vida
                mais saudável e equilibrada. Vamos juntos nessa jornada?
              </p>
            </div>
          </div>
          <div className=" min-h-screen flex-1 px-8 py-8 2xl:px-0 flex justify-center  items-center md:items-start bg-[#1C226B]">
            <div className="w-full  md:pl-10 lg:pl-20">
              <hgroup className="mb-8 flex flex-col gap-4">
                <Image alt="Logo" src={"/Vector.png"} height={42} width={40} />
                <h3 className=" text-[32px] font-semibold text-white font-MuseoModerno" />
                <h3 className="  text-[32px] font-semibold text-white font-MuseoModerno">
                  Saúde ao seu alcance, comece agora.
                </h3>
                <span className="  text-base font-medium font-Poppins text-white">
                  Preencha suas informações e descubra a diferença que um bom
                  cuidado pode fazer.
                </span>
              </hgroup>
              <Progress value={progress} className="w-full mt-12  mb-10" />
              <FormProvider {...methods}>
                <form
                  className=" w-full flex justify-between flex-col gap-28"
                  onSubmit={methods.handleSubmit((e) => onSubmit(e))}
                >
                  {step}
                  <div className="flex items-center gap-4 justify-center ">
                    {!isFirstStep && (
                      <Button
                        variant={"secondary"}
                        onClick={back}
                        type="button"
                        className="w-2/5 bg-white text-black"
                      >
                        Voltar
                      </Button>
                    )}

                    <Button
                      type="submit"
                      className=" w-[259px] bg-black text-white flex items-center justify-center hover:bg-[#3E31AE] "
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
        </MaxWidthWrapper>
      </div>
      <Dialog
        open={openModal}
        defaultOpen={openModal}
        modal
        onOpenChange={() => setOpenModal((prev) => !prev)}
      >
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader className="gap-5">
            <DialogTitle className="font-semibold text-5xl text-center  text-black">
              Cadastro realizado com sucesso
            </DialogTitle>
            <DialogDescription className="font-normal text-base  text-center leading-6  text-[#2D2E2E]">
              Confirme sua conta através do link enviado para seu e-mail
              cadastrado.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="   items-center sm:justify-center flex">
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
