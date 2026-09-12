import { fromISODate } from "@/lib/date";
import { IDoctorSlot } from "@/shared/interfaces/ISchedule";

interface MockDoctor {
  id: string;
  name: string;
  /** Registro no conselho, já formatado: "CRM/SP 118432". */
  crm: string;
  /** Precisa bater com as especialidades das clínicas em src/Api/db.json. */
  specialty: string;
  price: number;
  /** Horários cadastrados na agenda do médico ("HH:mm"). */
  times: string[];
}

/**
 * Agenda cadastrada dos médicos da clínica.
 * Ponto único de troca quando o endpoint real de disponibilidade existir.
 */
export const MOCK_DOCTORS: MockDoctor[] = [
  {
    id: "d1",
    name: "DR. Luiz Gama",
    crm: "CRM/SP 118432",
    specialty: "Clínica Geral",
    price: 150,
    times: ["08:00", "08:30", "09:00", "10:30", "13:00", "14:30", "19:00"]
  },
  {
    id: "d2",
    name: "DRA. Luiza Filho",
    crm: "CRM/SP 204517",
    specialty: "Clínica Geral",
    price: 130,
    times: ["08:00", "09:30", "11:30", "12:00", "16:00", "18:30", "20:00"]
  },
  {
    id: "d3",
    name: "DR. Claudio Ferraz",
    crm: "CRM/SP 097233",
    specialty: "Cardiologia",
    price: 260,
    times: ["07:30", "09:00", "11:00", "14:00", "15:30", "18:00"]
  },
  {
    id: "d4",
    name: "DRA. Marcia Pereira",
    crm: "CRM/RJ 155908",
    specialty: "Dermatologia",
    price: 210,
    times: ["08:30", "10:00", "13:30", "15:00", "17:30", "19:30"]
  },
  {
    id: "d5",
    name: "DR. Carlos Silveira",
    crm: "CRM/SP 143726",
    specialty: "Ortopedia",
    price: 230,
    times: ["09:00", "11:30", "14:00", "16:30", "18:00", "20:30"]
  },
  {
    id: "d6",
    name: "DRA. Renata Bastos",
    crm: "CRN/SP 21884",
    specialty: "Nutrição",
    price: 180,
    times: ["08:00", "09:30", "11:00", "13:30", "16:00", "18:30"]
  },
  {
    id: "d7",
    name: "DRA. Helena Prado",
    crm: "CRP/SP 06-98123",
    specialty: "Psicologia",
    price: 160,
    times: ["08:30", "10:30", "12:30", "15:00", "17:00", "19:00", "20:00"]
  },
  {
    id: "d8",
    name: "DR. Rafael Nunes",
    crm: "CRM/SP 176450",
    specialty: "Pediatria",
    price: 200,
    times: ["07:30", "08:30", "10:00", "13:00", "15:30", "18:00"]
  },
  {
    id: "d9",
    name: "DR. Otavio Camargo",
    crm: "CRM/SP 088914",
    specialty: "Cirurgia",
    price: 320,
    times: ["07:00", "09:00", "11:30", "14:30", "16:30"]
  },
  {
    id: "d10",
    name: "DRA. Beatriz Moraes",
    crm: "CRM/RJ 132077",
    specialty: "Oncologia",
    price: 340,
    times: ["08:00", "10:30", "13:00", "15:30", "18:00"]
  },
  {
    id: "d11",
    name: "DR. Andre Fontes",
    crm: "CRM/SP 121569",
    specialty: "Neurologia",
    price: 300,
    times: ["08:30", "11:00", "14:00", "16:00", "19:30"]
  },
  {
    id: "d12",
    name: "DRA. Patricia Lemos",
    crm: "CRM/SP 159302",
    specialty: "Ginecologia",
    price: 240,
    times: ["08:00", "09:30", "11:30", "14:30", "17:00", "19:00"]
  },
  {
    id: "d13",
    name: "DR. Bruno Tavares",
    crm: "CREFITO-3 84210",
    specialty: "Fisioterapia",
    price: 140,
    times: ["07:00", "08:00", "10:00", "12:00", "15:00", "18:30", "20:00"]
  },
  {
    id: "d14",
    name: "DR. Vinicius Aragao",
    crm: "CRM/SP 103788",
    specialty: "Psiquiatria",
    price: 290,
    times: ["09:00", "11:00", "14:00", "16:30", "18:00"]
  },
  {
    id: "d15",
    name: "DRA. Sofia Rezende",
    crm: "CRM/SP 148655",
    specialty: "Oftalmologia",
    price: 220,
    times: ["08:00", "10:00", "11:30", "13:30", "16:00", "18:30"]
  }
];

/**
 * Ocupação estável para o mesmo dia/horário — sem isso a lista mudaria
 * a cada render e o horário escolhido poderia desaparecer.
 */
function isSlotFree(date: string, doctorIndex: number, timeIndex: number) {
  const dayOfMonth = fromISODate(date).getDate();

  return (dayOfMonth + doctorIndex * 3 + timeIndex) % 4 !== 0;
}

interface MockSlotsParams {
  date: string;
  specialty?: string;
  /** Especialidades da clínica: fora delas não há médico para atender. */
  clinicSpecialties?: string[];
}

/** Horários livres dos médicos cadastrados no dia informado. */
export function buildMockSlots({
  date,
  specialty,
  clinicSpecialties
}: MockSlotsParams) {
  const allowed = specialty
    ? [specialty]
    : clinicSpecialties ?? MOCK_DOCTORS.map((doctor) => doctor.specialty);

  const doctors = MOCK_DOCTORS.filter((doctor) =>
    allowed.includes(doctor.specialty)
  );

  return doctors.reduce<IDoctorSlot[]>((slots, doctor, doctorIndex) => {
    doctor.times.forEach((time, timeIndex) => {
      if (!isSlotFree(date, doctorIndex, timeIndex)) return;

      slots.push({
        id: `${doctor.id}-${date}-${time}`,
        doctorName: doctor.name,
        doctorCrm: doctor.crm,
        specialty: doctor.specialty,
        date,
        time,
        price: doctor.price,
        isFree: true
      });
    });

    return slots;
  }, []);
}
