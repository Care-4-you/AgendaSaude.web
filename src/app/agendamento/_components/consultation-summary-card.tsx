"use client";

import { useAuth } from "@/hooks/auth";
import { formatDateLong, fromISODate } from "@/lib/date";
import { formatCurrency } from "@/lib/format";
import { useSchedulingStore } from "@/lib/store/scheduling-store";
import { ISchedulingClinic } from "@/shared/interfaces/ISchedule";

/** "R. da Saúde, nº 200, Vila Mariana" */
export function buildClinicAddress(clinic: ISchedulingClinic) {
  return [
    clinic.address,
    clinic.houseNumber && `nº ${clinic.houseNumber}`,
    clinic.neighborhood
  ]
    .filter(Boolean)
    .join(", ");
}

/**
 * O conselho vem no início do registro ("CRM/SP 204517", "CRN/SP 21884"),
 * então o rótulo acompanha a profissão em vez de fixar "CRM".
 */
function getCouncilLabel(register: string) {
  const council = register.split(/[/\s]/)[0];

  return council || "Registro";
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-3 last:border-b-0">
      <span className="font-poppins text-sm text-slate-500">{label}</span>
      <span className="text-right font-poppins text-sm font-bold text-agenda-saude-purple-200">
        {value}
      </span>
    </div>
  );
}

/** Cartão com os dados da consulta escolhida, usado no resumo e na confirmação. */
export function ConsultationSummaryCard() {
  const { clinic, selectedDate, selectedSlot } = useSchedulingStore();
  const { user } = useAuth();

  if (!selectedSlot || !selectedDate) return null;

  const clinicSubtitle = clinic
    ? [clinic.title, buildClinicAddress(clinic)].filter(Boolean).join(" · ")
    : "";

  return (
    <div className="max-w-2xl rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex gap-2">
        <span className="h-1 w-6 rounded-full bg-agenda-saude-purple-100" />
        <span className="h-1 w-24 rounded-full bg-agenda-saude-purple-100" />
      </div>

      <div className="mt-4 border-b border-slate-100 pb-4">
        <h3 className="font-museo text-lg font-bold text-agenda-saude-purple-200">
          {clinic?.name ?? "Clínica não informada"}
        </h3>
        {clinicSubtitle && (
          <p className="mt-0.5 font-poppins text-xs text-slate-500">
            {clinicSubtitle}
          </p>
        )}
      </div>

      <div className="mt-2 flex flex-col">
        <SummaryRow label="Paciente" value={user?.name ?? "-"} />
        <SummaryRow label="Especialidade" value={selectedSlot.specialty} />
        <SummaryRow label="Médico(a)" value={selectedSlot.doctorName} />
        <SummaryRow
          label={getCouncilLabel(selectedSlot.doctorCrm)}
          value={selectedSlot.doctorCrm}
        />
        <SummaryRow
          label="Data"
          value={formatDateLong(fromISODate(selectedDate))}
        />
        <SummaryRow label="Horário" value={selectedSlot.time} />
        <SummaryRow
          label="Valor"
          value={formatCurrency(selectedSlot.price, { cents: false })}
        />
      </div>
    </div>
  );
}
