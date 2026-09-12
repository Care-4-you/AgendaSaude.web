"use client";

import { formatDateBR, fromISODate } from "@/lib/date";
import { formatCurrency } from "@/lib/format";
import { IDoctorSlot } from "@/shared/interfaces/ISchedule";
import { Clock } from "lucide-react";

import { cn } from "@/lib/utils";

interface SlotCardProps {
  slot: IDoctorSlot;
  isSelected: boolean;
  onSelect: (slot: IDoctorSlot) => void;
}

export function SlotCard({ slot, isSelected, onSelect }: SlotCardProps) {
  const { doctorName, specialty, date, time, price } = slot;

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={() => onSelect(slot)}
      className={cn(
        "flex w-full flex-col gap-3 rounded-xl border bg-white p-4 text-left shadow-sm transition-all",
        isSelected
          ? "border-agenda-saude-purple-100 ring-1 ring-agenda-saude-purple-100"
          : "border-slate-100 hover:border-agenda-saude-purple-100 hover:shadow-md"
      )}
    >
      <div className="flex gap-2">
        <span className="h-1 w-6 rounded-full bg-agenda-saude-purple-100" />
        <span className="h-1 w-24 rounded-full bg-agenda-saude-purple-100" />
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-poppins text-xs font-semibold text-slate-400">
            Consulta
          </span>
          <p className="font-poppins text-sm font-extrabold uppercase text-slate-800">
            {doctorName}
          </p>
          <span className="font-poppins text-xs text-slate-500">
            {specialty}
          </span>
        </div>

        <div className="flex flex-shrink-0 flex-col items-end gap-1">
          <span className="font-poppins text-xs font-medium text-slate-400">
            {formatDateBR(fromISODate(date))}
          </span>

          {price !== undefined && (
            <span className="font-poppins text-sm font-bold text-slate-700">
              {formatCurrency(price, { cents: false })}
            </span>
          )}

          <span className="flex items-center gap-1.5 rounded-full bg-agenda-saude-purple-100 px-3 py-1 font-poppins text-xs font-bold text-white">
            {time}
            <Clock size={12} strokeWidth={3} />
          </span>
        </div>
      </div>
    </button>
  );
}
