import React from "react";
import { Clock } from "lucide-react";
import { IShiftAvailability } from "../../shared/interfaces/IAppointment";

interface ConsultCalendarCardProps {
  shift: IShiftAvailability;
  onClick: (id: string) => void;
}

export function ConsultCalendarCard({ shift, onClick }: ConsultCalendarCardProps) {
  const { medico, data, hora, turno } = shift;

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between hover:border-[#4E3FB4] hover:shadow-md transition-all cursor-pointer group"
      onClick={() => onClick(shift.id)}
      title="Clique para agendar"
    >
      {/* Top Header */}
      <div className="flex justify-center items-center w-full mb-3 text-sm text-gray-500 relative">
        <span className="font-semibold">{data}</span>
        {/* Decorative dots based on markup, can be simple plus sign as shown in mockup */}
        <span className="absolute right-0 text-gray-300 group-hover:text-[#4E3FB4]">+</span>
      </div>

      {/* Body */}
      <div className="text-center mb-6">
        <h3 className="font-bold text-gray-800 text-base">{medico}</h3>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center w-full border-t border-gray-50 pt-3">
        <p className="font-bold text-gray-800 text-sm">
          Período: <span className="text-gray-500 font-medium">{turno}</span>
        </p>
        <div className="bg-[#4E3FB4] text-white px-3 py-1.5 rounded-full flex items-center gap-2 font-bold text-xs">
          {hora} <Clock size={12} />
        </div>
      </div>
    </div>
  );
}
