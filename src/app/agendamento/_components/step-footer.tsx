"use client";

interface StepFooterProps {
  /** Resumo curto da escolha atual, à esquerda do botão. */
  summary: string;
  label?: string;
  isDisabled?: boolean;
  onContinue: () => void;
}

export function StepFooter({
  summary,
  label = "Continuar",
  isDisabled = false,
  onContinue
}: StepFooterProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-4 sm:flex-row sm:items-center">
      <span className="font-poppins text-sm text-slate-500">{summary}</span>

      <button
        type="button"
        disabled={isDisabled}
        onClick={onContinue}
        className="w-full rounded-lg bg-agenda-saude-purple-100 px-10 py-2.5 font-poppins text-sm font-semibold text-white shadow-md transition-colors hover:bg-agenda-saude-purple-200 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none sm:w-auto"
      >
        {label}
      </button>
    </div>
  );
}
