"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ComboboxOption {
  value: string;
  label: string;
}

interface Props {
  options: ComboboxOption[];
  /** Texto do gatilho quando nada está escolhido. */
  text?: string;
  /** Passe `value` + `onChange` para controlar de fora. */
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
  disabled?: boolean;
  /** Campo de busca: útil só em listas longas. */
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyText?: string;
  /** Ícone à esquerda do valor. */
  icon?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function Combobox({
  options,
  text = "Selecione",
  value,
  onChange,
  id,
  disabled = false,
  searchable = true,
  searchPlaceholder,
  emptyText = "Nenhuma opção encontrada.",
  icon,
  className,
  contentClassName
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [uncontrolledValue, setUncontrolledValue] = React.useState("");

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : uncontrolledValue;
  const selected = options.find((option) => option.value === currentValue);

  const handleSelect = (optionValue: string) => {
    // Escolher de novo o item atual limpa a seleção.
    const nextValue = optionValue === currentValue ? "" : optionValue;

    if (!isControlled) setUncontrolledValue(nextValue);
    onChange?.(nextValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("w-full justify-between gap-2 px-3", className)}
        >
          <span className="flex min-w-0 items-center gap-2">
            {icon}
            <span className="truncate">{selected?.label ?? text}</span>
          </span>
          <ChevronsUpDown className="h-4 w-4 flex-shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={cn(
          "w-[--radix-popover-trigger-width] p-0",
          contentClassName
        )}
        align="start"
      >
        <Command>
          {searchable && (
            <CommandInput
              placeholder={searchPlaceholder ?? text}
              className="h-9"
            />
          )}
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  // cmdk usa este valor na busca e o devolve em minúsculas,
                  // então a seleção vem do closure e não do callback.
                  value={option.label}
                  onSelect={() => handleSelect(option.value)}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentValue === option.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
