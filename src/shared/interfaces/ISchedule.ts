export type DayPeriod = "manha" | "tarde" | "noite";

export interface IDayPeriodOption {
  id: DayPeriod;
  label: string;
}

/** Horário de um médico em uma clínica. */
export interface IDoctorSlot {
  id: string;
  doctorName: string;
  /** Registro no conselho, já formatado: "CRM/SP 123456". */
  doctorCrm: string;
  specialty: string;
  /** yyyy-MM-dd */
  date: string;
  /** HH:mm */
  time: string;
  price?: number;
  isFree: boolean;
}

/** Clínica escolhida no mapa e usada durante todo o fluxo de agendamento. */
export interface ISchedulingClinic {
  id: number;
  name: string;
  /** Especialidades atendidas pela clínica: alimentam o filtro do agendamento. */
  specialties: string[];
  title?: string;
  address?: string;
  houseNumber?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

export interface ISchedulingStep {
  id: number;
  label: string;
}
