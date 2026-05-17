import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus, Search } from "lucide-react";

interface FilterSpecialtyProps {
  options: string[];
  selectedOption: string;
  onChange: (option: string) => void;
  onAddOption: (option: string) => void;
}

export function FilterSpecialty({ options, selectedOption, onChange, onAddOption }: FilterSpecialtyProps) {
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
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
      <span className={cn(
        "font-extrabold text-xl md:text-2xl whitespace-nowrap min-w-[200px] transition-colors",
        selectedOption ? "text-gray-900" : "text-gray-300"
      )}>
        Qual especialidade?
      </span>
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 border border-gray-400 bg-transparent rounded-md p-2 w-fit">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onChange(option)}
              className={cn(
                "px-3 py-1.5 text-xs font-bold rounded flex items-center justify-center transition-colors border",
                selectedOption === option
                  ? "border-[#4E3FB4] bg-[#4E3FB4] text-white"
                  : "border-black text-black bg-white hover:bg-gray-100"
              )}
            >
              {option}
            </button>
          ))}
          <button 
             onClick={() => setIsSearchOpen(!isSearchOpen)}
             className="w-6 h-6 rounded-full bg-black text-white ml-2 flex items-center justify-center flex-shrink-0"
          >
             <Plus size={14} strokeWidth={3} />
          </button>
        </div>
        
        {isSearchOpen && (
          <div className="flex items-center gap-2 border border-gray-400 rounded-md p-2 px-3 bg-transparent w-full">
            <Search size={18} className="text-black" />
            <div className="w-[1px] h-5 bg-gray-300 mx-1"></div>
            <input 
               type="text" 
               placeholder="Adicionar especialidade..."
               value={searchValue}
               onChange={(e) => setSearchValue(e.target.value)}
               onKeyDown={handleKeyDown}
               className="outline-none text-sm w-full bg-transparent text-black font-semibold" 
             />
          </div>
        )}
      </div>
    </div>
  );
}
