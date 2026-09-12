"use client";

import { useSchedulingStore } from "@/lib/store/scheduling-store";
import { ISchedulingClinic } from "@/shared/interfaces/ISchedule";
import { Check, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";

import { SCHEDULING_STEPS } from "./steps-config";

function ClinicCard({ clinic }: { clinic: ISchedulingClinic }) {
  const addressLine = [
    clinic.address,
    clinic.houseNumber && `nº ${clinic.houseNumber}`
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mt-6 flex flex-col gap-1 rounded-xl bg-white/10 p-4 font-poppins text-white">
      <span className="flex items-center gap-2 text-sm font-semibold">
        <MapPin className="h-4 w-4 flex-shrink-0" />
        {clinic.name}
      </span>

      {clinic.title && (
        <span className="pl-6 text-xs text-white/70">{clinic.title}</span>
      )}

      {addressLine && (
        <span className="pl-6 text-xs text-white/80">{addressLine}</span>
      )}

      {clinic.neighborhood && (
        <span className="pl-6 text-xs text-white/80">
          {clinic.neighborhood}
        </span>
      )}
    </div>
  );
}

function StepsFlow() {
  const { currentStep, maxStepReached, goToStep } = useSchedulingStore();

  return (
    <nav aria-label="Etapas do agendamento" className="flex flex-col gap-4">
      {SCHEDULING_STEPS.map((step) => {
        const isActive = step.id === currentStep;
        const isDone = step.id < currentStep;
        const isReachable = step.id <= maxStepReached;

        return (
          <button
            key={step.id}
            type="button"
            disabled={!isReachable}
            onClick={() => goToStep(step.id)}
            aria-current={isActive ? "step" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-2 py-1.5 text-left font-poppins text-sm transition-colors",
              isReachable
                ? "cursor-pointer hover:bg-white/10"
                : "cursor-not-allowed",
              isActive ? "font-semibold text-white" : "text-white/60"
            )}
          >
            <span
              className={cn(
                "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                isActive
                  ? "border-white bg-white text-agenda-saude-purple-100"
                  : "border-white/40 text-white/60"
              )}
            >
              {isDone ? <Check className="h-3.5 w-3.5" /> : step.id}
            </span>
            {step.label}
          </button>
        );
      })}
    </nav>
  );
}

/** Barra lateral do fluxo (marcação 1): título, clínica escolhida e steps. */
export function SchedulingSidebar({
  clinic
}: {
  clinic: ISchedulingClinic | null;
}) {
  return (
    <aside className="flex w-full flex-shrink-0 flex-col justify-between gap-8 bg-gradient-to-b from-agenda-saude-purple-100 to-agenda-saude-purple-200 p-6 lg:min-h-[calc(100vh-5rem)] lg:w-72">
      <div>
        <span className="font-poppins text-[10px] uppercase tracking-[0.2em] text-white/60">
          Agendamento
        </span>

        <h1 className="mt-1 flex items-center gap-2 font-museo text-2xl font-bold leading-tight text-white">
          Marcar consulta
        </h1>

        <p className="mt-2 font-poppins text-xs leading-relaxed text-white/70">
          Bem-vindo(a)! Vamos encontrar o melhor horário para você.
        </p>

        {clinic && <ClinicCard clinic={clinic} />}
      </div>

      <StepsFlow />
    </aside>
  );
}
