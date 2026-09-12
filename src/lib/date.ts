import { format, parse, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";

/** Formato usado no store e nas APIs. */
export const ISO_DATE_FORMAT = "yyyy-MM-dd";

export function toISODate(date: Date) {
  return format(date, ISO_DATE_FORMAT);
}

export function fromISODate(date: string) {
  return startOfDay(parse(date, ISO_DATE_FORMAT, new Date()));
}

/** "15/06/2026" */
export function formatDateBR(date: Date) {
  return format(date, "dd/MM/yyyy");
}

/**
 * "seg, 15 jun 2026" — em ptBR o dia abreviado (`EEE`) devolve o nome inteiro,
 * por isso o formato curto (`EEEEEE`).
 */
export function formatDateLong(date: Date) {
  return format(date, "EEEEEE, dd MMM yyyy", { locale: ptBR });
}

/** "seg, 15 jun 2026 - 09:00" */
export function formatDateTimeLong(date: string, time: string) {
  return `${formatDateLong(fromISODate(date))} - ${time}`;
}

/** "Junho 2026" */
export function formatMonthAndYear(date: Date) {
  const label = format(date, "MMMM yyyy", { locale: ptBR });

  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function getToday() {
  return startOfDay(new Date());
}
