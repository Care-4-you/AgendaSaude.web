"use client";

import { sortByTime } from "@/lib/day-periods";
import { IDoctorSlot } from "@/shared/interfaces/ISchedule";
import { useQuery } from "@tanstack/react-query";

import { buildMockSlots } from "../_utils/mock-slots";

interface UseAvailableSlotsParams {
  clinicId?: number;
  specialty?: string;
  /** Especialidades da clínica, usadas quando nenhuma está filtrada. */
  clinicSpecialties?: string[];
  /** yyyy-MM-dd */
  date: string | null;
}

/**
 * Horários livres dos médicos da clínica no dia selecionado.
 * Hoje resolve o mock local; trocar só o corpo desta função quando o
 * endpoint de disponibilidade estiver disponível.
 */
async function fetchAvailableSlots({
  date,
  specialty,
  clinicSpecialties
}: UseAvailableSlotsParams): Promise<IDoctorSlot[]> {
  if (!date) return [];

  return sortByTime(buildMockSlots({ date, specialty, clinicSpecialties }));
}

export function useAvailableSlots({
  clinicId,
  specialty,
  clinicSpecialties,
  date
}: UseAvailableSlotsParams) {
  const {
    data: slots,
    isLoading,
    error
  } = useQuery({
    queryKey: ["available-slots", clinicId, specialty, clinicSpecialties, date],
    queryFn: () =>
      fetchAvailableSlots({ clinicId, specialty, clinicSpecialties, date }),
    enabled: !!date
  });

  return { slots: slots ?? [], isLoading, error };
}
