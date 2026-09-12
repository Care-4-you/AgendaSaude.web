"use client";

import { FilterPills } from "@/components/ui/filter-pills";
import { DAY_PERIODS, DayPeriod } from "@/lib/day-periods";
import { useSchedulingStore } from "@/lib/store/scheduling-store";

/**
 * Filtro de período do dia (marcação 5): Manhã até 11:59, Tarde de 12:00 até
 * 17:59 e Noite a partir das 18:00. Mais de um período pode ficar ativo.
 */
export function PeriodFilter() {
  const { selectedPeriods, togglePeriod } = useSchedulingStore();

  return (
    <div className="w-fit rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      <FilterPills
        multiple
        aria-label="Período do dia"
        options={DAY_PERIODS}
        value={selectedPeriods}
        onChange={(value) => togglePeriod(value as DayPeriod)}
        shape="rounded"
      />
    </div>
  );
}
