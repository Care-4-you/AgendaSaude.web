import React from "react";
import { Clock, Calendar as CalendarIcon } from "lucide-react";
import { IAppointment } from "../../shared/interfaces/IAppointment";

interface AppointmentCardProps {
  appointment: IAppointment;
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
}

export function AppointmentCard({ appointment, onConfirm, onCancel }: AppointmentCardProps) {
  const { especialidade, medico, data, hora, isLivre } = appointment;

  return (
    <div className="bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.05)] border border-gray-100 p-6 flex flex-col relative w-full h-full justify-between gap-4">
      
      {/* Decorative top bar */}
      <div className="flex gap-2 mb-2">
        <div className="h-1 w-6 bg-[#4E3FB4] rounded-full"></div>
        <div className="h-1 w-32 bg-[#4E3FB4] rounded-full"></div>
      </div>

      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <span className="text-gray-400 font-semibold text-sm">Consulta</span>
          <h3 className="font-black text-xl text-gray-900">Clinica Fast</h3>
          <p className="text-gray-500 font-medium text-sm">{especialidade}</p>
          <p className="font-extrabold text-gray-800 text-sm mt-1">{medico}</p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1 font-extrabold text-gray-900">
            <CalendarIcon size={16} />
            {isLivre ? "Livre" : "Agendado"}
          </div>
          <span className="text-gray-400 font-medium text-xs mb-1">{data}</span>
          <div className="bg-[#4E3FB4] text-white px-3 py-1 rounded-full flex items-center gap-1.5 font-bold text-xs">
            {hora} <Clock size={12} strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* Patient Section (Only if not livre) */}
      {!isLivre && (
        <div className="flex flex-col mt-2">
          <span className="text-gray-500 font-medium text-sm">Paciente</span>
          <span className="font-bold text-gray-800 text-sm">{appointment.pacienteNome || "N/A"}</span>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-row justify-center items-center mt-4 gap-4">
        {isLivre ? (
          <button
            onClick={() => onConfirm(appointment.id)}
            className="flex-1 bg-[#4E3FB4] hover:bg-[#3D318F] text-white font-bold py-2 px-4 rounded-md transition-colors text-xs text-center shadow-sm"
          >
            Marcar Consulta
          </button>
        ) : (
          <button
            onClick={() => onCancel(appointment.id)}
            className="flex-1 bg-[#4E3FB4] hover:bg-[#3D318F] text-white font-bold py-2 px-4 rounded-md transition-colors text-xs text-center shadow-sm"
          >
            Desmarcar Consulta
          </button>
        )}
      </div>
    </div>
  );
}
