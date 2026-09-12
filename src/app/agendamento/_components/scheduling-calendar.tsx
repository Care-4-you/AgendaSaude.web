"use client";

import { useEffect, useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import { fromISODate, getToday, toISODate } from "@/lib/date";
import { useSchedulingStore } from "@/lib/store/scheduling-store";
import { addMonths, format, startOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";

/** Quantos anos à frente ficam disponíveis na escolha de mês e ano. */
const YEARS_AHEAD = 2;

export function SchedulingCalendar() {
  const { selectedDate, setSelectedDate } = useSchedulingStore();
  const [today, setToday] = useState<Date | null>(null);
  const [month, setMonth] = useState<Date | null>(null);

  /** O dia de hoje só é resolvido no client para o HTML do servidor não divergir. */
  useEffect(() => {
    const currentDay = getToday();

    setToday(currentDay);
    setMonth(startOfMonth(currentDay));

    if (!selectedDate) setSelectedDate(toISODate(currentDay));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!today || !month) {
    return (
      <div className="flex flex-col gap-2">
        <span className="font-poppins text-sm font-semibold text-agenda-saude-purple-200">
          Calendário
        </span>
        <Skeleton className="h-[320px] w-full rounded-xl" />
      </div>
    );
  }

  const selected = selectedDate ? fromISODate(selectedDate) : undefined;

  return (
    <div className="flex flex-col gap-2">
      <span className="font-poppins text-sm font-semibold text-agenda-saude-purple-200">
        Calendário
      </span>

      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <Calendar
          monthYearPicker
          mode="single"
          locale={ptBR}
          className="p-0"
          selected={selected}
          month={month}
          onMonthChange={setMonth}
          onSelect={(date) => date && setSelectedDate(toISODate(date))}
          // Dias e meses anteriores ao de hoje não têm horário para oferecer.
          fromMonth={startOfMonth(today)}
          toMonth={startOfMonth(addMonths(today, 12 * YEARS_AHEAD))}
          disabled={{ before: today }}
          showOutsideDays={false}
          formatters={{
            formatWeekdayName: (day) => format(day, "EEEEE", { locale: ptBR })
          }}
          classNames={{
            months: "flex flex-col",
            month: "space-y-2",
            table: "w-full border-collapse",
            head_row: "flex w-full",
            head_cell:
              "w-9 flex-1 font-poppins text-[11px] font-semibold uppercase text-slate-400",
            row: "flex w-full mt-1",
            cell: "flex-1 text-center",
            day: "h-8 w-8 rounded-full font-poppins text-xs text-slate-700 transition-colors hover:bg-slate-100",
            day_today:
              "border border-agenda-saude-purple-100 font-bold text-agenda-saude-purple-100",
            day_selected:
              "!bg-agenda-saude-purple-100 font-bold !text-white hover:!bg-agenda-saude-purple-200",
            day_disabled:
              "cursor-not-allowed text-slate-300 hover:bg-transparent",
            day_outside: "invisible",
            day_hidden: "invisible"
          }}
        />
      </div>
    </div>
  );
}
