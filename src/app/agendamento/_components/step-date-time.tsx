"use client";

import { useMemo } from "react";

import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateLong, formatDateTimeLong, fromISODate } from "@/lib/date";
import { filterByPeriods } from "@/lib/day-periods";
import { useSchedulingStore } from "@/lib/store/scheduling-store";

import { useAvailableSlots } from "../_hook/useAvailableSlots";
import { PeriodFilter } from "./period-filter";
import { SchedulingCalendar } from "./scheduling-calendar";
import { SlotCard } from "./slot-card";
import { SpecialtyFilter } from "./specialty-filter";
import { StepFooter } from "./step-footer";

export function StepDateTime() {
  const {
    clinic,
    specialty,
    selectedDate,
    selectedPeriods,
    selectedSlot,
    setSelectedSlot,
    nextStep
  } = useSchedulingStore();

  const { slots, isLoading } = useAvailableSlots({
    clinicId: clinic?.id,
    specialty,
    clinicSpecialties: clinic?.specialties,
    date: selectedDate
  });

  const visibleSlots = useMemo(
    () => filterByPeriods(slots, selectedPeriods),
    [slots, selectedPeriods]
  );

  const summary = !selectedDate
    ? ""
    : selectedSlot
      ? formatDateTimeLong(selectedDate, selectedSlot.time)
      : `${formatDateLong(fromISODate(selectedDate))} - selecione um horário`;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Coluna esquerda: filtro fixo + calendário */}
        <div className="flex w-full flex-col gap-6 lg:max-w-xs">
          <SpecialtyFilter />
          <SchedulingCalendar />
        </div>

        {/* Coluna direita: períodos do dia + horários livres */}
        <div className="flex w-full flex-1 flex-col gap-4">
          <PeriodFilter />

          <div className="rounded-xl bg-slate-50 p-4">
            {isLoading ? (
              <div className="flex flex-col gap-4">
                {Array.from({ length: 3 }, (_, index) => (
                  <Skeleton key={index} className="h-28 w-full rounded-xl" />
                ))}
              </div>
            ) : selectedPeriods.length === 0 ? (
              <EmptyState message="Selecione um período do dia para ver os horários livres." />
            ) : visibleSlots.length === 0 ? (
              <EmptyState message="Não há agendamentos encontrados para o filtro selecionado." />
            ) : (
              <div className="scroll-custom flex max-h-[380px] flex-col gap-4 overflow-y-auto pr-1">
                {visibleSlots.map((slot) => (
                  <SlotCard
                    key={slot.id}
                    slot={slot}
                    isSelected={selectedSlot?.id === slot.id}
                    onSelect={setSelectedSlot}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <StepFooter
        summary={summary}
        isDisabled={!selectedSlot}
        onContinue={nextStep}
      />
    </div>
  );
}
