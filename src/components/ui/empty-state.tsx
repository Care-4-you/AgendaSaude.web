"use client";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  message: string;
  /** Ação opcional para sair do estado vazio. */
  actionLabel?: string;
  onAction?: () => void;
  /** Moldura tracejada: use quando o vazio for um bloco, não uma lista. */
  bordered?: boolean;
  className?: string;
}

export function EmptyState({
  message,
  actionLabel,
  onAction,
  bordered = false,
  className
}: EmptyStateProps) {
  const hasAction = !!actionLabel && !!onAction;

  return (
    <div
      className={cn(
        "flex min-h-[160px] flex-col items-center justify-center gap-4 px-6 py-10 text-center font-poppins text-sm text-slate-400",
        bordered && "rounded-xl border border-dashed border-slate-300 bg-white",
        className
      )}
    >
      <p>{message}</p>

      {hasAction && (
        <button
          type="button"
          onClick={onAction}
          className="rounded-lg bg-agenda-saude-purple-100 px-6 py-2 font-semibold text-white transition-colors hover:bg-agenda-saude-purple-200"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
