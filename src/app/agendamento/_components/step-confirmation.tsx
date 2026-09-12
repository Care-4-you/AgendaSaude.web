"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { formatDateTimeLong } from "@/lib/date";
import { useSchedulingStore } from "@/lib/store/scheduling-store";

import { ConfirmationDialog } from "./confirmation-dialog";
import { ConsultationSummaryCard } from "./consultation-summary-card";
import { StepFooter } from "./step-footer";

export function StepConfirmation() {
  const { clinic, selectedDate, selectedSlot, prevStep } = useSchedulingStore();
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const router = useRouter();

  if (!selectedSlot || !selectedDate) return null;

  /** Desistir volta para o resumo, onde a pessoa pode trocar data e horário. */
  const handleCancel = () => {
    setIsDialogOpen(false);
    prevStep();
  };

  /** Sair da tela desmonta o fluxo, e isso já limpa o agendamento do store. */
  const handleFinish = () => {
    setIsDialogOpen(false);
    router.push("/dashboard/paciente");
  };

  return (
    <div className="flex flex-col gap-8">
      <ConsultationSummaryCard />

      <StepFooter
        summary={formatDateTimeLong(selectedDate, selectedSlot.time)}
        label="Confirmar consulta"
        onContinue={() => setIsDialogOpen(true)}
      />

      <ConfirmationDialog
        open={isDialogOpen}
        clinic={clinic}
        slot={selectedSlot}
        date={selectedDate}
        onCancel={handleCancel}
        onFinish={handleFinish}
      />
    </div>
  );
}
