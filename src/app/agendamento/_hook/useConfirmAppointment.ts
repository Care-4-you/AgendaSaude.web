"use client";

import { IDoctorSlot, ISchedulingClinic } from "@/shared/interfaces/ISchedule";
import { useMutation } from "@tanstack/react-query";

export interface ConfirmAppointmentPayload {
  clinicId?: number;
  slotId: string;
  /** yyyy-MM-dd */
  date: string;
  /** HH:mm */
  time: string;
  doctorName: string;
  doctorCrm: string;
  specialty: string;
  price?: number;
}

export interface ConfirmAppointmentResult {
  /** Protocolo mostrado no pop-up de sucesso. */
  protocol: string;
  confirmedAt: string;
}

/**
 * Confirma o agendamento.
 * Hoje é mockado; trocar só o corpo desta função quando o endpoint existir.
 */
async function confirmAppointment(
  payload: ConfirmAppointmentPayload
): Promise<ConfirmAppointmentResult> {
  // Simula a latência de uma chamada de rede
  await new Promise((resolve) => setTimeout(resolve, 900));

  const protocol = `AS-${payload.date.replace(/-/g, "")}-${payload.time.replace(":", "")}`;

  return { protocol, confirmedAt: new Date().toISOString() };
}

export function buildConfirmPayload({
  clinic,
  slot,
  date
}: {
  clinic: ISchedulingClinic | null;
  slot: IDoctorSlot;
  date: string;
}): ConfirmAppointmentPayload {
  return {
    clinicId: clinic?.id,
    slotId: slot.id,
    date,
    time: slot.time,
    doctorName: slot.doctorName,
    doctorCrm: slot.doctorCrm,
    specialty: slot.specialty,
    price: slot.price
  };
}

export function useConfirmAppointment() {
  const {
    mutate: confirm,
    data: confirmation,
    isPending: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
    reset: resetConfirmation
  } = useMutation({
    mutationKey: ["confirm-appointment"],
    mutationFn: confirmAppointment
  });

  return {
    confirm,
    confirmation,
    isConfirming,
    isConfirmed,
    confirmError,
    resetConfirmation
  };
}
