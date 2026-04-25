export interface IAppointment {
  id: string;
  medico: string;
  especialidade: string;
  data: string; // ISO format or string "yyyy-MM-dd"
  hora: string; // "HH:mm"
  pacienteNome?: string; // If undefined/null, it's a "Livre" slot
  isLivre: boolean;
}

export interface IShiftAvailability {
  id: string;
  medico: string;
  data: string;
  hora: string;
  turno: "Manhã" | "Tarde" | "Noite";
}
