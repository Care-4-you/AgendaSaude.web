import React from "react";

import { Clock } from "lucide-react";

import { IShiftAvailability } from "../../shared/interfaces/IAppointment";

interface ConsultCalendarCardProps {
  shift: IShiftAvailability;
  onClick: (id: string) => void;
}

export function ConsultCalendarCard({
  shift,
  onClick
}: ConsultCalendarCardProps) {
  const { medico, data, hora, turno } = shift;

  return (
    <div
      className="group flex cursor-pointer flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-[#4E3FB4] hover:shadow-md"
      onClick={() => onClick(shift.id)}
      title="Clique para agendar"
    >
      {/* Top Header */}
      <div className="relative mb-3 flex w-full items-center justify-center text-sm text-gray-500">
        <span className="font-semibold">{data}</span>
        {/* Decorative dots based on markup, can be simple plus sign as shown in mockup */}
        <span className="absolute right-0 text-gray-300 group-hover:text-[#4E3FB4]">
          +
        </span>
      </div>

      {/* Body */}
      <div className="mb-6 text-center">
        <h3 className="text-base font-bold text-gray-800">{medico}</h3>
      </div>

      {/* Footer */}
      <div className="flex w-full items-center justify-between border-t border-gray-50 pt-3">
        <p className="text-sm font-bold text-gray-800">
          Período: <span className="font-medium text-gray-500">{turno}</span>
        </p>
        <div className="flex items-center gap-2 rounded-full bg-[#4E3FB4] px-3 py-1.5 text-xs font-bold text-white">
          {hora} <Clock size={12} />
        </div>
      </div>
    </div>
  );
}
