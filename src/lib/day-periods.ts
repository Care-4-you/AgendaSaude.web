export type DayPeriod = "manha" | "tarde" | "noite";

export interface DayPeriodOption {
  value: DayPeriod;
  label: string;
}

/** Manhã: até 11:59 | Tarde: 12:00 até 17:59 | Noite: a partir de 18:00 */
export const AFTERNOON_START_MINUTES = 12 * 60;
export const NIGHT_START_MINUTES = 18 * 60;

export const DAY_PERIODS: DayPeriodOption[] = [
  { value: "manha", label: "Manhã" },
  { value: "tarde", label: "Tarde" },
  { value: "noite", label: "Noite" }
];

/** Converte "HH:mm" em minutos desde a meia-noite. */
export function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + (minutes || 0);
}

export function getPeriodFromTime(time: string): DayPeriod {
  const minutes = timeToMinutes(time);

  if (minutes < AFTERNOON_START_MINUTES) return "manha";
  if (minutes < NIGHT_START_MINUTES) return "tarde";

  return "noite";
}

export function getPeriodLabel(period: DayPeriod) {
  return DAY_PERIODS.find((option) => option.value === period)?.label ?? "";
}

/** "Manhã" | "Tarde" | "Noite" a partir de um horário "HH:mm". */
export function getPeriodLabelFromTime(time: string) {
  return getPeriodLabel(getPeriodFromTime(time));
}

/** Mantém só os itens cujo horário cai nos períodos escolhidos. */
export function filterByPeriods<T extends { time: string }>(
  items: T[],
  periods: DayPeriod[]
) {
  if (periods.length === 0) return [];

  return items.filter((item) => periods.includes(getPeriodFromTime(item.time)));
}

export function sortByTime<T extends { time: string }>(items: T[]) {
  return [...items].sort(
    (a, b) => timeToMinutes(a.time) - timeToMinutes(b.time)
  );
}
