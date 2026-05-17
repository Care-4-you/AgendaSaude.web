"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

import { FilterSpecialty } from "@/components/calendar-feature/FilterSpecialty";
import { ActionSelector, ActionType } from "@/components/calendar-feature/ActionSelector";
import { AppointmentCard } from "@/components/calendar-feature/AppointmentCard";
import { ConsultCalendarCard } from "@/components/calendar-feature/ConsultCalendarCard";
import { IAppointment, IShiftAvailability } from "@/shared/interfaces/IAppointment";

const MOCK_APPOINTMENTS: IAppointment[] = [
  {
    id: "1",
    medico: "Doutor Claudio Ferraz",
    especialidade: "Cardiologia",
    data: "22/03/2026",
    hora: "08:30",
    isLivre: true,
  },
  {
    id: "2",
    medico: "Doutora Marcia Pereira",
    especialidade: "Clínica Geral",
    data: "22/03/2026",
    hora: "09:00",
    pacienteNome: "João da Silva",
    isLivre: false,
  },
  {
    id: "3",
    medico: "Fernanda Atriz",
    especialidade: "Ortopedista",
    data: "22/03/2026",
    hora: "13:00",
    isLivre: true,
  },
  {
    id: "4",
    medico: "Doutor Claudio Ferraz",
    especialidade: "Cardiologia",
    data: "22/03/2026",
    hora: "15:00",
    pacienteNome: "Maria Oliveira",
    isLivre: false,
  },
  {
    id: "5",
    medico: "Doutor Carlos Silveira",
    especialidade: "Ortopedista",
    data: "22/03/2026",
    hora: "10:30",
    isLivre: true,
  },
  {
    id: "6",
    medico: "Doutora Ana Lucia",
    especialidade: "Clínica Geral",
    data: "22/03/2026",
    hora: "14:00",
    pacienteNome: "José Carlos",
    isLivre: false,
  },
  {
    id: "7",
    medico: "Doutor Roberto Alves",
    especialidade: "Cardiologia",
    data: "22/03/2026",
    hora: "16:00",
    isLivre: true,
  },
  {
    id: "8",
    medico: "Fernanda Atriz",
    especialidade: "Ortopedista",
    data: "22/03/2026",
    hora: "11:00",
    pacienteNome: "Camila Ribeiro",
    isLivre: false,
  },
  {
    id: "9",
    medico: "Doutor Silva Santos",
    especialidade: "Clínica Geral",
    data: "22/03/2026",
    hora: "10:00",
    isLivre: true,
  },
  {
    id: "10",
    medico: "Doutora Ana Lucia",
    especialidade: "Clínica Geral",
    data: "22/03/2026",
    hora: "15:30",
    isLivre: true,
  },
];

const MOCK_SHIFTS: IShiftAvailability[] = [
  {
    id: "s1",
    medico: "Doutor Claudio Ferraz",
    data: "22/03/2026",
    hora: "08:00",
    turno: "Manhã",
  },
  {
    id: "s2",
    medico: "Doutora Marcia Pereira",
    data: "22/03/2026",
    hora: "08:00",
    turno: "Manhã",
  },
  {
    id: "s3",
    medico: "Fernanda Atriz",
    data: "22/03/2026",
    hora: "13:00",
    turno: "Tarde",
  },
  {
    id: "s4",
    medico: "Doutor Claudio Ferraz",
    data: "22/03/2026",
    hora: "15:00",
    turno: "Tarde",
  },
];

export default function CalendarioPage() {
  const [appointmentsList, setAppointmentsList] = useState<IAppointment[]>(MOCK_APPOINTMENTS);
  const [specialtiesList, setSpecialtiesList] = useState<string[]>(["Clínica Geral", "Cardiologia", "Ortopedista"]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 2, 22)); // Mocking 22/03/2026
  
  // For the shifts functionality
  const [selectedShifts, setSelectedShifts] = useState<string[]>(["Manhã"]);

  const toggleShift = (shift: string) => {
    setSelectedShifts(prev => 
      prev.includes(shift) 
        ? prev.filter(s => s !== shift)
        : [...prev, shift]
    );
  };

  const [appointmentStatusFilters, setAppointmentStatusFilters] = useState<string[]>(["Marcadas", "Livres"]);

  const toggleAppointmentStatus = (status: string) => {
    setAppointmentStatusFilters(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handleConfirmAppointment = (id: string) => {
    const nome = prompt("Digite o nome do paciente:");
    if (!nome) return;

    setAppointmentsList(prev => prev.map(app => 
      app.id === id ? { ...app, isLivre: false, pacienteNome: nome } : app
    ));
  };

  const handleCancelAppointment = (id: string) => {
    if (!confirm("Tem certeza que deseja desmarcar esta consulta?")) return;

    setAppointmentsList(prev => prev.map(app => 
      app.id === id ? { ...app, isLivre: true, pacienteNome: undefined } : app
    ));
  };
  
  const handleShiftCardClick = (id: string) => {
     // Expected to open scheduling flow for this shift
     alert(`Abrindo fluxo de agendamento para o turno. Ref ID: ${id}`);
  };

  const dateString = date ? format(date, "dd/MM/yyyy") : "";
  const isWeekday = date && date.getDay() >= 1 && date.getDay() <= 5;

  // Filter Data
  const filteredAppointments = isWeekday ? appointmentsList
    .filter(app => app.especialidade === selectedSpecialty || !selectedSpecialty)
    .filter(app => {
       if (app.isLivre && appointmentStatusFilters.includes("Livres")) return true;
       if (!app.isLivre && appointmentStatusFilters.includes("Marcadas")) return true;
       return false;
    })
    .map(app => ({ ...app, data: dateString }))
  : [];

  const filteredShifts = isWeekday ? MOCK_SHIFTS
    .filter(shift => selectedShifts.length === 0 || selectedShifts.includes(shift.turno))
    .map(shift => ({ ...shift, data: dateString }))
  : [];

  const hasSelectedFilters = selectedSpecialty !== "" && actionType !== null;

  return (
    <div className="flex flex-col w-full min-h-screen bg-agenda-saude-blue-100 relative z-20">
      
      {/* Header Info */}
      <div className="mb-12 w-full max-w-6xl mx-auto px-6 pt-10">
        <Link 
          href="/dashboard/clinica" 
          className="flex items-center gap-2 text-black hover:underline mb-1 font-bold transition-all w-fit"
        >
          <ChevronLeft size={28} strokeWidth={4} /> <span className="text-3xl tracking-tight font-extrabold">Funcionalidades</span>
        </Link>
        <h2 className="ml-9 text-gray-400 font-bold text-lg">Calendário de Consulta</h2>
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 flex flex-col gap-10 pb-12">
        {/* Filters and Controls */}
        <div className="flex flex-col gap-6 w-full">
          <FilterSpecialty 
            options={specialtiesList} 
            selectedOption={selectedSpecialty} 
            onChange={setSelectedSpecialty}
            onAddOption={(newOption) => {
              if (!specialtiesList.includes(newOption)) {
                setSpecialtiesList([...specialtiesList, newOption]);
              }
            }}
          />
          
          <ActionSelector 
            selectedAction={actionType}
            onChange={setActionType}
          />
        </div>

        {/* Content Area (Calendar + Cards) */}
        {hasSelectedFilters && (
          <div className="flex flex-col lg:flex-row gap-8 mt-4 items-start">
            
            {/* Left Column - Calendar */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-shrink-0 flex flex-col items-center">
               <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={ptBR}
                  className="rounded-md w-full"
               />
               <button 
                 onClick={() => alert("Funcionalidade em Desenvolvimento: Abrir modal para alocar médico no calendário")}
                 className="mt-6 bg-[#4E3FB4] hover:bg-[#3D318F] text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-md"
                 title="Alocar Médico"
               >
                 <span className="text-2xl font-light mb-1">+</span>
               </button>
            </div>

          {/* Right Column - Results */}
          <div className="flex-1 w-full bg-white border border-gray-100 rounded-xl p-8 min-h-[400px]">
             
             {actionType === "manage_appointments" && (
                <div className="flex flex-col w-full items-center">
                  
                  <div className="flex flex-col items-center justify-center mb-8">
                     <h3 className={`text-lg font-medium mb-4 transition-colors ${
                        appointmentStatusFilters.length > 0 ? "text-gray-800" : "text-gray-300"
                     }`}>
                        Escolha entre consultas:
                     </h3>
                     <div className="flex flex-wrap justify-center gap-3">
                        {["Marcadas", "Livres"].map(status => (
                           <button
                              key={status}
                              onClick={() => toggleAppointmentStatus(status)}
                              className={`px-6 py-1.5 rounded-full text-sm font-semibold transition-all ${
                                appointmentStatusFilters.includes(status) 
                                ? "bg-[#4E3FB4] text-white" 
                                : "bg-gray-300/50 text-gray-600 hover:bg-gray-300"
                              }`}
                           >
                              {status}
                           </button>
                        ))}
                     </div>
                  </div>

                  <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map(app => (
                         <AppointmentCard 
                            key={app.id} 
                            appointment={app} 
                            onConfirm={handleConfirmAppointment} 
                            onCancel={handleCancelAppointment} 
                         />
                      ))
                    ) : (
                      <div className="py-10 text-center text-gray-500">
                        Nenhum agendamento encontrado para os filtros selecionados.
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-center mt-10 w-full">
                     <button 
                        onClick={() => setActionType(null)} 
                        className="bg-[#4E3FB4] hover:bg-[#3D318F] text-white font-bold py-3 px-10 rounded-md transition-colors shadow-md w-full max-w-[250px]"
                     >
                        Voltar ao Calendário
                     </button>
                  </div>
                </div>
             )}

             {actionType === "consult_calendar" && (
                <div className="flex flex-col w-full h-full">
                   <div className="flex flex-col items-center justify-center mb-8">
                      <h3 className={`text-lg font-bold mb-4 transition-colors ${
                         selectedShifts.length > 0 ? "text-gray-800" : "text-gray-300"
                      }`}>
                         Encontre opções nessas datas
                      </h3>
                      <div className="flex flex-wrap justify-center gap-3">
                         {["Manhã", "Tarde", "Noite"].map(turno => (
                            <button
                               key={turno}
                               onClick={() => toggleShift(turno)}
                               className={`px-6 py-1.5 rounded-full text-sm font-semibold transition-all ${
                                 selectedShifts.includes(turno) 
                                 ? "bg-[#4E3FB4] text-white" 
                                 : "bg-gray-300/50 text-gray-600 hover:bg-gray-300"
                               }`}
                            >
                               {turno}
                            </button>
                         ))}
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredShifts.length > 0 ? (
                         filteredShifts.map(shift => (
                           <ConsultCalendarCard
                             key={shift.id}
                             shift={shift}
                             onClick={handleShiftCardClick}
                           />
                         ))
                      ) : (
                        <div className="col-span-full py-10 text-center text-gray-500">
                          Nenhuma opção encontrada para as seleções enviadas.
                        </div>
                      )}
                   </div>
                </div>
             )}
           </div>

          </div>
        )}
      </div>
    </div>
  );
}
