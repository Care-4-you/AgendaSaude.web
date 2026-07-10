"use client";

import Link from "next/link";
import React, { useState } from "react";

import {
  ActionSelector,
  ActionType
} from "@/components/calendar-feature/ActionSelector";
import { AppointmentCard } from "@/components/calendar-feature/AppointmentCard";
import { ConsultCalendarCard } from "@/components/calendar-feature/ConsultCalendarCard";
import { FilterSpecialty } from "@/components/calendar-feature/FilterSpecialty";
import { Calendar } from "@/components/ui/calendar";
import {
  IAppointment,
  IShiftAvailability
} from "@/shared/interfaces/IAppointment";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft } from "lucide-react";

const MOCK_APPOINTMENTS: IAppointment[] = [
  {
    id: "1",
    medico: "Doutor Claudio Ferraz",
    especialidade: "Cardiologia",
    data: "22/03/2026",
    hora: "08:30",
    isLivre: true
  },
  {
    id: "2",
    medico: "Doutora Marcia Pereira",
    especialidade: "Clínica Geral",
    data: "22/03/2026",
    hora: "09:00",
    pacienteNome: "João da Silva",
    isLivre: false
  },
  {
    id: "3",
    medico: "Fernanda Atriz",
    especialidade: "Ortopedista",
    data: "22/03/2026",
    hora: "13:00",
    isLivre: true
  },
  {
    id: "4",
    medico: "Doutor Claudio Ferraz",
    especialidade: "Cardiologia",
    data: "22/03/2026",
    hora: "15:00",
    pacienteNome: "Maria Oliveira",
    isLivre: false
  },
  {
    id: "5",
    medico: "Doutor Carlos Silveira",
    especialidade: "Ortopedista",
    data: "22/03/2026",
    hora: "10:30",
    isLivre: true
  },
  {
    id: "6",
    medico: "Doutora Ana Lucia",
    especialidade: "Clínica Geral",
    data: "22/03/2026",
    hora: "14:00",
    pacienteNome: "José Carlos",
    isLivre: false
  },
  {
    id: "7",
    medico: "Doutor Roberto Alves",
    especialidade: "Cardiologia",
    data: "22/03/2026",
    hora: "16:00",
    isLivre: true
  },
  {
    id: "8",
    medico: "Fernanda Atriz",
    especialidade: "Ortopedista",
    data: "22/03/2026",
    hora: "11:00",
    pacienteNome: "Camila Ribeiro",
    isLivre: false
  },
  {
    id: "9",
    medico: "Doutor Silva Santos",
    especialidade: "Clínica Geral",
    data: "22/03/2026",
    hora: "10:00",
    isLivre: true
  },
  {
    id: "10",
    medico: "Doutora Ana Lucia",
    especialidade: "Clínica Geral",
    data: "22/03/2026",
    hora: "15:30",
    isLivre: true
  }
];

const MOCK_SHIFTS: IShiftAvailability[] = [
  {
    id: "s1",
    medico: "Doutor Claudio Ferraz",
    data: "22/03/2026",
    hora: "08:00",
    turno: "Manhã"
  },
  {
    id: "s2",
    medico: "Doutora Marcia Pereira",
    data: "22/03/2026",
    hora: "08:00",
    turno: "Manhã"
  },
  {
    id: "s3",
    medico: "Fernanda Atriz",
    data: "22/03/2026",
    hora: "13:00",
    turno: "Tarde"
  },
  {
    id: "s4",
    medico: "Doutor Claudio Ferraz",
    data: "22/03/2026",
    hora: "15:00",
    turno: "Tarde"
  }
];

export default function CalendarioPage() {
  const [appointmentsList, setAppointmentsList] =
    useState<IAppointment[]>(MOCK_APPOINTMENTS);
  const [specialtiesList, setSpecialtiesList] = useState<string[]>([
    "Clínica Geral",
    "Cardiologia",
    "Ortopedista"
  ]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 2, 22)); // Mocking 22/03/2026

  // For the shifts functionality
  const [selectedShifts, setSelectedShifts] = useState<string[]>(["Manhã"]);

  const toggleShift = (shift: string) => {
    setSelectedShifts((prev) =>
      prev.includes(shift) ? prev.filter((s) => s !== shift) : [...prev, shift]
    );
  };

  const [appointmentStatusFilters, setAppointmentStatusFilters] = useState<
    string[]
  >(["Marcadas", "Livres"]);

  const toggleAppointmentStatus = (status: string) => {
    setAppointmentStatusFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleConfirmAppointment = (id: string) => {
    const nome = prompt("Digite o nome do paciente:");
    if (!nome) return;

    setAppointmentsList((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, isLivre: false, pacienteNome: nome } : app
      )
    );
  };

  const handleCancelAppointment = (id: string) => {
    if (!confirm("Tem certeza que deseja desmarcar esta consulta?")) return;

    setAppointmentsList((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, isLivre: true, pacienteNome: undefined } : app
      )
    );
  };

  const handleShiftCardClick = (id: string) => {
    // Expected to open scheduling flow for this shift
    alert(`Abrindo fluxo de agendamento para o turno. Ref ID: ${id}`);
  };

  const dateString = date ? format(date, "dd/MM/yyyy") : "";
  const isWeekday = date && date.getDay() >= 1 && date.getDay() <= 5;

  // Filter Data
  const filteredAppointments = isWeekday
    ? appointmentsList
        .filter(
          (app) => app.especialidade === selectedSpecialty || !selectedSpecialty
        )
        .filter((app) => {
          if (app.isLivre && appointmentStatusFilters.includes("Livres"))
            return true;
          if (!app.isLivre && appointmentStatusFilters.includes("Marcadas"))
            return true;
          return false;
        })
        .map((app) => ({ ...app, data: dateString }))
    : [];

  const filteredShifts = isWeekday
    ? MOCK_SHIFTS.filter(
        (shift) =>
          selectedShifts.length === 0 || selectedShifts.includes(shift.turno)
      ).map((shift) => ({ ...shift, data: dateString }))
    : [];

  const hasSelectedFilters = selectedSpecialty !== "" && actionType !== null;

  return (
    <div className="relative z-20 flex min-h-screen w-full flex-col bg-agenda-saude-blue-100">
      {/* Header Info */}
      <div className="mx-auto mb-12 w-full max-w-6xl px-6 pt-10">
        <Link
          href="/dashboard/clinica"
          className="mb-1 flex w-fit items-center gap-2 font-bold text-black transition-all hover:underline"
        >
          <ChevronLeft size={28} strokeWidth={4} />{" "}
          <span className="text-3xl font-extrabold tracking-tight">
            Funcionalidades
          </span>
        </Link>
        <h2 className="ml-9 text-lg font-bold text-gray-400">
          Calendário de Consulta
        </h2>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-12">
        {/* Filters and Controls */}
        <div className="flex w-full flex-col gap-6">
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
          <div className="mt-4 flex flex-col items-start gap-8 lg:flex-row">
            {/* Left Column - Calendar */}
            <div className="flex flex-shrink-0 flex-col items-center rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ptBR}
                className="w-full rounded-md"
              />
              <button
                onClick={() =>
                  alert(
                    "Funcionalidade em Desenvolvimento: Abrir modal para alocar médico no calendário"
                  )
                }
                className="mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#4E3FB4] text-white shadow-md transition-colors hover:bg-[#3D318F]"
                title="Alocar Médico"
              >
                <span className="mb-1 text-2xl font-light">+</span>
              </button>
            </div>

            {/* Right Column - Results */}
            <div className="min-h-[400px] w-full flex-1 rounded-xl border border-gray-100 bg-white p-8">
              {actionType === "manage_appointments" && (
                <div className="flex w-full flex-col items-center">
                  <div className="mb-8 flex flex-col items-center justify-center">
                    <h3
                      className={`mb-4 text-lg font-medium transition-colors ${
                        appointmentStatusFilters.length > 0
                          ? "text-gray-800"
                          : "text-gray-300"
                      }`}
                    >
                      Escolha entre consultas:
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      {["Marcadas", "Livres"].map((status) => (
                        <button
                          key={status}
                          onClick={() => toggleAppointmentStatus(status)}
                          className={`rounded-full px-6 py-1.5 text-sm font-semibold transition-all ${
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

                  <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((app) => (
                        <AppointmentCard
                          key={app.id}
                          appointment={app}
                          onConfirm={handleConfirmAppointment}
                          onCancel={handleCancelAppointment}
                        />
                      ))
                    ) : (
                      <div className="py-10 text-center text-gray-500">
                        Nenhum agendamento encontrado para os filtros
                        selecionados.
                      </div>
                    )}
                  </div>

                  <div className="mt-10 flex w-full justify-center">
                    <button
                      onClick={() => setActionType(null)}
                      className="w-full max-w-[250px] rounded-md bg-[#4E3FB4] px-10 py-3 font-bold text-white shadow-md transition-colors hover:bg-[#3D318F]"
                    >
                      Voltar ao Calendário
                    </button>
                  </div>
                </div>
              )}

              {actionType === "consult_calendar" && (
                <div className="flex h-full w-full flex-col">
                  <div className="mb-8 flex flex-col items-center justify-center">
                    <h3
                      className={`mb-4 text-lg font-bold transition-colors ${
                        selectedShifts.length > 0
                          ? "text-gray-800"
                          : "text-gray-300"
                      }`}
                    >
                      Encontre opções nessas datas
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      {["Manhã", "Tarde", "Noite"].map((turno) => (
                        <button
                          key={turno}
                          onClick={() => toggleShift(turno)}
                          className={`rounded-full px-6 py-1.5 text-sm font-semibold transition-all ${
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

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredShifts.length > 0 ? (
                      filteredShifts.map((shift) => (
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
