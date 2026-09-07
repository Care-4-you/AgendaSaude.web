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
    <div className="flex  w-full flex-1 flex-col  items-start  p-8 ">
      {/* Header Info */}
      <div className="mx-auto mb-8 w-full  ">
        <Link
          href="/dashboard/clinica"
          className="mb-1 flex w-fit items-center gap-2 font-semibold text-black transition-all hover:underline"
        >
          <ChevronLeft size={24} strokeWidth={4} />{" "}
          <span className="text-2xl font-semibold tracking-tight">
            Tabela de Preços
          </span>
        </Link>
      </div>

      <div className="mx-auto flex w-full  flex-col  pb-12">
        {/* Main Content Area - Dark Blue Card */}
        <div className="min-h-[600px] w-full rounded-md bg-[#0B2149] p-4 shadow-lg sm:p-8 md:p-14">
          <PricingTable
            initialItems={INITIAL_MOCK_DATA}
            specialtiesOptions={CLINIC_SPECIALTIES}
          />
        </div>
      </div>
    </div>
  );
}
