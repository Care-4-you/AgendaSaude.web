import React from "react";

import { cn } from "@/lib/utils";

export type ActionType = "manage_appointments" | "consult_calendar";

interface ActionSelectorProps {
  selectedAction: ActionType | null;
  onChange: (action: ActionType) => void;
}

export function ActionSelector({
  selectedAction,
  onChange
}: ActionSelectorProps) {
  return (
    <div className="mt-6 flex flex-col items-start gap-4 md:flex-row">
      <span
        className={cn(
          "mt-2 min-w-[200px] whitespace-nowrap text-xl font-extrabold transition-colors md:text-2xl",
          selectedAction ? "text-gray-900" : "text-gray-300"
        )}
      >
        Você deseja?
      </span>
      <div className="flex w-full max-w-2xl flex-col gap-6 rounded-md border border-[#BCE1DD] bg-transparent p-6">
        <label className="group flex cursor-pointer items-center gap-4">
          <div className="relative flex h-6 w-6 flex-shrink-0 items-center justify-center">
            <input
              type="radio"
              name="actionSelector"
              className="peer h-6 w-6 appearance-none rounded-full border border-gray-300 bg-white transition-colors checked:border-black"
              checked={selectedAction === "manage_appointments"}
              onChange={() => onChange("manage_appointments")}
            />
            {selectedAction === "manage_appointments" && (
              <div className="pointer-events-none absolute h-3 w-3 rounded-full bg-black"></div>
            )}
          </div>
          <span
            className={cn(
              "text-lg font-bold transition-colors",
              selectedAction === "manage_appointments"
                ? "text-gray-900"
                : "text-gray-300 group-hover:text-gray-400"
            )}
          >
            Cadastrar ou cancelar uma consulta avulsa
          </span>
        </label>

        <label className="group flex cursor-pointer items-center gap-4">
          <div className="relative flex h-6 w-6 flex-shrink-0 items-center justify-center">
            <input
              type="radio"
              name="actionSelector"
              className="peer h-6 w-6 appearance-none rounded-full border border-gray-300 bg-white transition-colors checked:border-black"
              checked={selectedAction === "consult_calendar"}
              onChange={() => onChange("consult_calendar")}
            />
            {selectedAction === "consult_calendar" && (
              <div className="pointer-events-none absolute h-3 w-3 rounded-full bg-black"></div>
            )}
          </div>
          <span
            className={cn(
              "text-lg font-bold transition-colors",
              selectedAction === "consult_calendar"
                ? "text-gray-900"
                : "text-gray-300 group-hover:text-gray-400"
            )}
          >
            Consultar calendários de Médicos
          </span>
        </label>
      </div>
    </div>
  );
}
