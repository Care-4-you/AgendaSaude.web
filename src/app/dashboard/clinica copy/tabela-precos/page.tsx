import Link from "next/link";
import React from "react";

import { PricingTable } from "@/components/pricing-feature/PricingTable";
import { IPricingItem } from "@/shared/interfaces/IPricing";
import { ChevronLeft } from "lucide-react";

const INITIAL_MOCK_DATA: IPricingItem[] = [
  {
    id: "1",
    procedimento: "Consulta geral",
    especialidade: "Clínica Geral",
    cobertura: "Sim",
    valor: 120.0
  },
  {
    id: "2",
    procedimento: "Ortopédica",
    especialidade: "Ortopedista",
    cobertura: "Sim",
    valor: 140.0
  }
];

const CLINIC_SPECIALTIES = ["Clínica Geral", "Cardiologia", "Ortopedista"];

export default function TabelaPrecosPage() {
  return (
    <div className="relative z-20 flex min-h-screen w-full flex-col bg-transparent">
      {/* Header Info */}
      <div className="mx-auto mb-8 w-full max-w-6xl px-6 pt-10">
        <Link
          href="/dashboard/clinica"
          className="mb-1 flex w-fit items-center gap-2 font-bold text-black transition-all hover:underline"
        >
          <ChevronLeft size={28} strokeWidth={4} />{" "}
          <span className="text-3xl font-extrabold tracking-tight">
            Tabela de Preços
          </span>
        </Link>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-12">
        {/* Main Content Area - Dark Blue Card */}
        <div className="relative min-h-[600px] w-full rounded-xl bg-[#0B2149] p-4 shadow-lg sm:p-8 md:p-14">
          <PricingTable
            initialItems={INITIAL_MOCK_DATA}
            specialtiesOptions={CLINIC_SPECIALTIES}
          />
        </div>
      </div>
    </div>
  );
}
