import React from "react";

import { Clock, Calendar as CalendarIcon } from "lucide-react";

import { IAppointment } from "../../shared/interfaces/IAppointment";

interface AppointmentCardProps {
  appointment: IAppointment;
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
}

export function AppointmentCard({
  appointment,
  onConfirm,
  onCancel
}: AppointmentCardProps) {
  const { especialidade, medico, data, hora, isLivre } = appointment;

  return (
    <div className="relative flex h-full w-full flex-col justify-between gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-[0_0_15px_rgba(0,0,0,0.05)]">
      {/* Decorative top bar */}
      <div className="mb-2 flex gap-2">
        <div className="h-1 w-6 rounded-full bg-[#4E3FB4]"></div>
        <div className="h-1 w-32 rounded-full bg-[#4E3FB4]"></div>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-400">
            Consulta {especialidade}
          </span>
          <p className="mt-1 text-sm font-extrabold text-gray-800">{medico}</p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1 font-extrabold text-gray-900">
            <CalendarIcon size={16} />
            {isLivre ? "Livre" : "Agendado"}
          </div>
          <span className="mb-1 text-xs font-medium text-gray-400">{data}</span>
          <div className="flex items-center gap-1.5 rounded-full bg-[#4E3FB4] px-3 py-1 text-xs font-bold text-white">
            {hora} <Clock size={12} strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* Patient Section */}
      <div className="mt-2 flex flex-col">
        <span className="text-sm font-medium text-gray-500">Paciente</span>
        <span className="text-sm font-bold text-gray-800">
          {!isLivre ? appointment.pacienteNome || "N/A" : "N/A"}
        </span>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex flex-row items-center justify-center gap-4">
        {isLivre ? (
          <button
            onClick={() => onConfirm(appointment.id)}
            className="flex-1 rounded-md bg-[#4E3FB4] px-4 py-2 text-center text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#3D318F]"
          >
            Marcar Consulta
          </button>
        ) : (
          <button
            onClick={() => onCancel(appointment.id)}
            className="flex-1 rounded-md bg-[#4E3FB4] px-4 py-2 text-center text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#3D318F]"
          >
            Desmarcar Consulta
          </button>
        )}
      </div>
    </div>
  );
}
