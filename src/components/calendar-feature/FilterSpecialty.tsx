import React, { useState } from "react";

import { Plus, Search } from "lucide-react";

import { cn } from "@/lib/utils";

interface FilterSpecialtyProps {
  options: string[];
  selectedOption: string;
  onChange: (option: string) => void;
  onAddOption: (option: string) => void;
}

export function FilterSpecialty({
  options,
  selectedOption,
  onChange,
  onAddOption
}: FilterSpecialtyProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim() !== "") {
      onAddOption(searchValue.trim());
      setSearchValue("");
      setIsSearchOpen(false); // optionally close it
    }
  };

  return (
    <div className="flex w-full flex-col items-start gap-4 md:w-auto md:flex-row md:items-center">
      <span
        className={cn(
          "min-w-[200px] whitespace-nowrap text-xl font-extrabold transition-colors md:text-2xl",
          selectedOption ? "text-gray-900" : "text-gray-300"
        )}
      >
        Qual especialidade?
      </span>

      <div className="flex flex-col gap-2">
        <div className="flex w-fit items-center gap-2 rounded-md border border-gray-400 bg-transparent p-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onChange(option)}
              className={cn(
                "flex items-center justify-center rounded border px-3 py-1.5 text-xs font-bold transition-colors",
                selectedOption === option
                  ? "border-[#4E3FB4] bg-[#4E3FB4] text-white"
                  : "border-black bg-white text-black hover:bg-gray-100"
              )}
            >
              {option}
            </button>
          ))}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="ml-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black text-white"
          >
            <Plus size={14} strokeWidth={3} />
          </button>
        </div>

        {isSearchOpen && (
          <div className="flex w-full items-center gap-2 rounded-md border border-gray-400 bg-transparent p-2 px-3">
            <Search size={18} className="text-black" />
            <div className="mx-1 h-5 w-[1px] bg-gray-300"></div>
            <input
              type="text"
              placeholder="Adicionar especialidade..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-sm font-semibold text-black outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}
