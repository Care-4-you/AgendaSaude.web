const currencyFormatters = new Map<number, Intl.NumberFormat>();

function getCurrencyFormatter(fractionDigits: number) {
  const cached = currencyFormatters.get(fractionDigits);

  if (cached) return cached;

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  });

  currencyFormatters.set(fractionDigits, formatter);

  return formatter;
}

interface FormatCurrencyOptions {
  /** false devolve "R$ 150" em vez de "R$ 150,00". */
  cents?: boolean;
  /** Texto para valor ausente. */
  fallback?: string;
}

/** Valor em reais. Aceita string porque campos editáveis chegam como texto. */
export function formatCurrency(
  value?: number | string | null,
  { cents = true, fallback = "-" }: FormatCurrencyOptions = {}
) {
  if (value === undefined || value === null || value === "") return fallback;

  const amount =
    typeof value === "string"
      ? parseFloat(value.replace(/[^\d.-]/g, "")) || 0
      : value;

  return getCurrencyFormatter(cents ? 2 : 0).format(amount);
}
