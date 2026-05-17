import React from "react";
import { cn } from "@/lib/utils";

export type ActionType = "manage_appointments" | "consult_calendar";

interface ActionSelectorProps {
  selectedAction: ActionType | null;
  onChange: (action: ActionType) => void;
}

export function ActionSelector({ selectedAction, onChange }: ActionSelectorProps) {
  return (
    <div className="flex flex-col md:flex-row items-start gap-4 mt-6">
      <span className={cn(
        "font-extrabold text-xl md:text-2xl whitespace-nowrap min-w-[200px] mt-2 transition-colors",
        selectedAction ? "text-gray-900" : "text-gray-300"
      )}>
        Você deseja?
      </span>
      <div className="flex flex-col gap-6 bg-transparent border border-[#BCE1DD] p-6 rounded-md w-full max-w-2xl">
        <label className="flex items-center gap-4 cursor-pointer group">
          <div className="relative flex items-center justify-center w-6 h-6 flex-shrink-0">
            <input
              type="radio"
              name="actionSelector"
              className="peer appearance-none w-6 h-6 border border-gray-300 rounded-full checked:border-black bg-white transition-colors"
              checked={selectedAction === "manage_appointments"}
              onChange={() => onChange("manage_appointments")}
            />
            {selectedAction === "manage_appointments" && (
              <div className="absolute w-3 h-3 bg-black rounded-full pointer-events-none"></div>
            )}
          </div>
          <span className={cn(
             "text-lg font-bold transition-colors",
             selectedAction === "manage_appointments" ? "text-gray-900" : "text-gray-300 group-hover:text-gray-400"
          )}>
             Cadastrar ou cancelar uma consulta avulsa
          </span>
        </label>

        <label className="flex items-center gap-4 cursor-pointer group">
          <div className="relative flex items-center justify-center w-6 h-6 flex-shrink-0">
            <input
              type="radio"
              name="actionSelector"
              className="peer appearance-none w-6 h-6 border border-gray-300 rounded-full checked:border-black bg-white transition-colors"
              checked={selectedAction === "consult_calendar"}
              onChange={() => onChange("consult_calendar")}
            />
            {selectedAction === "consult_calendar" && (
              <div className="absolute w-3 h-3 bg-black rounded-full pointer-events-none"></div>
            )}
          </div>
          <span className={cn(
             "text-lg font-bold transition-colors",
             selectedAction === "consult_calendar" ? "text-gray-900" : "text-gray-300 group-hover:text-gray-400"
          )}>
             Consultar calendários de Médicos
          </span>
        </label>
      </div>
    </div>
  );
}
