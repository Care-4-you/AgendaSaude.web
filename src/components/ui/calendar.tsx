/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import { DayPicker, useDayPicker, useNavigation } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { formatMonthAndYear, getToday } from "@/lib/date";
import { addMonths, format, isBefore, startOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

/** Anos oferecidos à frente quando o calendário não define `toMonth`/`toDate`. */
const FALLBACK_YEARS_AHEAD = 2;

function MonthYearPanel({
  year,
  onYearChange,
  onMonthSelect,
  minDate,
  maxDate
}: {
  year: number;
  onYearChange: (year: number) => void;
  onMonthSelect: (month: Date) => void;
  minDate: Date;
  maxDate: Date;
}) {
  const minYear = minDate.getFullYear();
  const maxYear = maxDate.getFullYear();

  return (
    <div className="absolute left-0 right-0 top-10 z-20 rounded-lg border border-slate-200 bg-white p-3 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-label="Ano anterior"
          disabled={year <= minYear}
          onClick={() => onYearChange(year - 1)}
          className="rounded p-1 text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <span className="font-poppins text-sm font-semibold text-slate-800">
          {year}
        </span>

        <button
          type="button"
          aria-label="Próximo ano"
          disabled={year >= maxYear}
          onClick={() => onYearChange(year + 1)}
          className="rounded p-1 text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {Array.from({ length: 12 }, (_, index) => {
          const month = new Date(year, index, 1);
          const isDisabled =
            isBefore(month, startOfMonth(minDate)) ||
            isBefore(startOfMonth(maxDate), month);

          return (
            <button
              key={index}
              type="button"
              disabled={isDisabled}
              onClick={() => onMonthSelect(month)}
              className={cn(
                "rounded-md py-1.5 font-poppins text-xs capitalize transition-colors",
                isDisabled
                  ? "cursor-not-allowed text-slate-300"
                  : "text-slate-700 hover:bg-agenda-saude-purple-100 hover:text-white"
              )}
            >
              {format(month, "MMM", { locale: ptBR })}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Cabeçalho com mês e ano clicáveis, além das setas.
 * Respeita os limites de `fromMonth`/`toMonth` do calendário.
 */
export function MonthYearCaption() {
  const { currentMonth, goToMonth, previousMonth, nextMonth } = useNavigation();
  const { fromDate, toDate } = useDayPicker();
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);
  const [panelYear, setPanelYear] = React.useState(currentMonth.getFullYear());

  const minDate = fromDate ?? getToday();
  const maxDate = toDate ?? addMonths(minDate, 12 * FALLBACK_YEARS_AHEAD);

  const handleTogglePanel = () => {
    setPanelYear(currentMonth.getFullYear());
    setIsPanelOpen((open) => !open);
  };

  const handleMonthSelect = (month: Date) => {
    goToMonth(month);
    setIsPanelOpen(false);
  };

  return (
    <div className="relative mb-2 flex items-center justify-between">
      <button
        type="button"
        aria-label="Mês anterior"
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        className="rounded p-1 text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <button
        type="button"
        aria-expanded={isPanelOpen}
        onClick={handleTogglePanel}
        title="Escolher mês e ano"
        className="rounded-md px-2 py-1 font-poppins text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100"
      >
        {formatMonthAndYear(currentMonth)}
      </button>

      <button
        type="button"
        aria-label="Próximo mês"
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        className="rounded p-1 text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {isPanelOpen && (
        <MonthYearPanel
          year={panelYear}
          onYearChange={setPanelYear}
          onMonthSelect={handleMonthSelect}
          minDate={minDate}
          maxDate={maxDate}
        />
      )}
    </div>
  );
}

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  /** Troca o cabeçalho padrão por mês e ano clicáveis. */
  monthYearPicker?: boolean;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  monthYearPicker = false,
  components,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        ...(monthYearPicker ? { Caption: MonthYearCaption } : {}),
        ...components
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
