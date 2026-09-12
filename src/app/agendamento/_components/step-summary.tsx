"use client";

import { formatDateTimeLong } from "@/lib/date";
import { useSchedulingStore } from "@/lib/store/scheduling-store";

import { ConsultationSummaryCard } from "./consultation-summary-card";
import { StepFooter } from "./step-footer";

export function StepSummary() {
  const { selectedDate, selectedSlot, nextStep } = useSchedulingStore();

  if (!selectedSlot || !selectedDate) return null;

  return (
    <div className="flex flex-col gap-8">
      <ConsultationSummaryCard />

      <StepFooter
        summary={formatDateTimeLong(selectedDate, selectedSlot.time)}
        onContinue={nextStep}
      />
    </div>
  );
}
