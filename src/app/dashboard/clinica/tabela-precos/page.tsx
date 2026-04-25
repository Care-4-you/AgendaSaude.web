import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { IPricingItem } from "@/shared/interfaces/IPricing";
import { PricingTable } from "@/components/pricing-feature/PricingTable";

const INITIAL_MOCK_DATA: IPricingItem[] = [
  {
    id: "1",
    procedimento: "Consulta geral",
    especialidade: "Clínica Geral",
    cobertura: "Sim",
    valor: 120.00
  },
  {
    id: "2",
    procedimento: "Ortopédica",
    especialidade: "Ortopedista",
    cobertura: "Sim",
    valor: 140.00
  }
];

const CLINIC_SPECIALTIES = ["Clínica Geral", "Cardiologia", "Ortopedista"];

export default function TabelaPrecosPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-transparent relative z-20">
      
      {/* Header Info */}
      <div className="mb-8 w-full max-w-6xl mx-auto px-6 pt-10">
        <Link 
          href="/dashboard/clinica" 
          className="flex items-center gap-2 text-black hover:underline mb-1 font-bold transition-all w-fit"
        >
          <ChevronLeft size={28} strokeWidth={4} /> <span className="text-3xl tracking-tight font-extrabold">Tabela de Preços</span>
        </Link>
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 flex flex-col pb-12">
        {/* Main Content Area - Dark Blue Card */}
        <div className="w-full bg-[#0B2149] rounded-xl p-4 sm:p-8 md:p-14 min-h-[600px] shadow-lg relative">
           <PricingTable 
             initialItems={INITIAL_MOCK_DATA} 
             specialtiesOptions={CLINIC_SPECIALTIES} 
           />
        </div>
      </div>
    </div>
  );
}
