"use client";

import { cn } from "@/lib/utils";

export interface FilterPillOption {
  value: string;
  label: string;
}

interface BaseProps {
  options: FilterPillOption[];
  size?: "xs" | "sm";
  shape?: "pill" | "rounded";
  className?: string;
  "aria-label"?: string;
}

type FilterPillsProps = BaseProps &
  (
    | { multiple: true; value: string[]; onChange: (value: string) => void }
    | { multiple?: false; value: string; onChange: (value: string) => void }
  );

const sizes = {
  xs: "px-2 py-0.5 text-[11px] font-semibold",
  sm: "px-6 py-1.5 text-sm font-semibold"
};

const shapes = {
  pill: "rounded-full",
  rounded: "rounded-lg"
};

/**
 * Grupo de botões de filtro. `onChange` recebe o valor clicado — quem chama
 * decide se alterna (multiple) ou substitui a seleção.
 */
export function FilterPills({
  options,
  value,
  onChange,
  multiple = false,
  size = "sm",
  shape = "pill",
  className,
  "aria-label": ariaLabel
}: FilterPillsProps) {
  const isSelected = (option: string) =>
    multiple ? (value as string[]).includes(option) : value === option;

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {options.map((option) => {
        const selected = isSelected(option.value);

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "font-poppins transition-colors",
              sizes[size],
              shapes[shape],
              selected
                ? "bg-agenda-saude-purple-100 text-white"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
