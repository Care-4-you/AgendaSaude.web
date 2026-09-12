"use client";

import Link from "next/link";
import { useEffect } from "react";

import { EmptyState } from "@/components/ui/empty-state";
import { useSchedulingStore } from "@/lib/store/scheduling-store";
import { ISchedulingClinic } from "@/shared/interfaces/ISchedule";
import { ChevronLeft } from "lucide-react";

import { SchedulingSidebar } from "./scheduling-sidebar";
import { StepConfirmation } from "./step-confirmation";
import { StepDateTime } from "./step-date-time";
import { StepSummary } from "./step-summary";

interface SchedulingFlowProps {
  clinic: ISchedulingClinic | null;
  specialty: string;
}

const STEP_HEADINGS: Record<number, { title: string; subtitle: string }> = {
  1: {
    title: "Escolha data e horário",
    subtitle:
      "Selecione a especialidade, um dia disponível e o horário livre de Consulta."
  },
  2: {
    title: "Resumo da consulta",
    subtitle: "Confira os dados antes de confirmar."
  },
  3: {
    title: "Confirmação",
    subtitle: "Revise o resumo e confirme o agendamento."
  }
};

export function SchedulingFlow({ clinic, specialty }: SchedulingFlowProps) {
  const {
    currentStep,
    selectedSlot,
    setClinic,
    setSpecialty,
    prevStep,
    goToStep,
    resetScheduling
  } = useSchedulingStore();

  /** A clínica e a especialidade vêm do mapa e alimentam todo o fluxo. */
  useEffect(() => {
    setClinic(clinic);
    setSpecialty(specialty);
  }, [clinic, specialty, setClinic, setSpecialty]);

  /** Sair da tela encerra o agendamento em andamento. */
  useEffect(() => resetScheduling, [resetScheduling]);

  const heading = STEP_HEADINGS[currentStep] ?? STEP_HEADINGS[1];
  /** Resumo e confirmação só existem depois de um horário escolhido. */
  const isMissingSlot = currentStep > 1 && !selectedSlot;

  return (
    <div className="flex w-full flex-col lg:flex-row">
      <SchedulingSidebar clinic={clinic} />

      <section className="w-full flex-1 bg-slate-100 p-6 lg:p-10">
        <header className="mb-8 flex items-start gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              aria-label="Voltar para a etapa anterior"
              className="mt-1 rounded-full p-1 text-agenda-saude-purple-200 transition-colors hover:bg-slate-200"
            >
              <ChevronLeft size={24} strokeWidth={3} />
            </button>
          ) : (
            <Link
              href="/mapa"
              aria-label="Voltar para o mapa de clínicas"
              className="mt-1 rounded-full p-1 text-agenda-saude-purple-200 transition-colors hover:bg-slate-200"
            >
              <ChevronLeft size={24} strokeWidth={3} />
            </Link>
          )}

          <div>
            <h2 className="font-museo text-3xl font-bold text-agenda-saude-purple-200">
              {heading.title}
            </h2>
            <p className="mt-1 font-poppins text-sm text-slate-500">
              {heading.subtitle}
            </p>
          </div>
        </header>

        {currentStep === 1 && <StepDateTime />}

        {isMissingSlot && (
          <EmptyState
            bordered
            message="Escolha uma data e um horário para seguir com o agendamento."
            actionLabel="Voltar para data e horário"
            onAction={() => goToStep(1)}
          />
        )}

        {currentStep === 2 && !isMissingSlot && <StepSummary />}

        {currentStep === 3 && !isMissingSlot && <StepConfirmation />}
      </section>
    </div>
  );
}
