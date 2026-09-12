"use client";

import { useMemo } from "react";

import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import { useSchedulingStore } from "@/lib/store/scheduling-store";
import { Stethoscope } from "lucide-react";

/** No store "todas" é a ausência de filtro (""), mas o cmdk precisa de valor. */
const ALL_SPECIALTIES = "todas";
const ALL_SPECIALTIES_LABEL = "Todas as especialidades";

/** Busca só ganha espaço quando a lista é longa. */
const SEARCHABLE_FROM = 8;

/**
 * Filtro fixo (marcação 3): já vem com a especialidade escolhida no mapa e as
 * opções são só as que a clínica atende. Clínica de especialidade única não
 * tem o que escolher, então vira texto.
 */
export function SpecialtyFilter() {
  const { clinic, specialty, setSpecialty } = useSchedulingStore();
  const clinicSpecialties = clinic?.specialties;

  const options = useMemo<ComboboxOption[]>(
    () => [
      { value: ALL_SPECIALTIES, label: ALL_SPECIALTIES_LABEL },
      ...(clinicSpecialties ?? []).map((item) => ({
        value: item,
        label: item
      }))
    ],
    [clinicSpecialties]
  );

  const hasChoice = (clinicSpecialties?.length ?? 0) > 1;

  const icon = (
    <Stethoscope className="h-4 w-4 flex-shrink-0 text-agenda-saude-purple-100" />
  );

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="agendamento-especialidade"
        className="font-poppins text-sm font-semibold text-agenda-saude-purple-200"
      >
        Especialidade
      </label>

      {hasChoice ? (
        <Combobox
          id="agendamento-especialidade"
          options={options}
          value={specialty || ALL_SPECIALTIES}
          onChange={(value) =>
            setSpecialty(value === ALL_SPECIALTIES ? "" : value)
          }
          text={ALL_SPECIALTIES_LABEL}
          icon={icon}
          searchable={options.length >= SEARCHABLE_FROM}
          searchPlaceholder="Buscar especialidade"
          emptyText="Nenhuma especialidade encontrada."
          className="h-auto border-slate-300 bg-white py-2 font-poppins text-sm font-normal text-slate-700 hover:bg-white"
        />
      ) : (
        <div
          id="agendamento-especialidade"
          className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 font-poppins text-sm text-slate-700"
        >
          {icon}
          <span className="truncate">{specialty || ALL_SPECIALTIES_LABEL}</span>
        </div>
      )}
    </div>
  );
}
