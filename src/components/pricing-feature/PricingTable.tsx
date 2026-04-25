'use client'
import React, { useState } from "react";
import { IPricingItem } from "@/shared/interfaces/IPricing";
import { PricingTableRow } from "./PricingTableRow";
import { Search, ChevronUp } from "lucide-react";

interface PricingTableProps {
  initialItems: IPricingItem[];
  specialtiesOptions: string[];
}

export function PricingTable({ initialItems, specialtiesOptions }: PricingTableProps) {
  const [items, setItems] = useState<IPricingItem[]>(initialItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [newlyAddedIds, setNewlyAddedIds] = useState<Set<string>>(new Set());

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const handleUpdate = (updatedItem: IPricingItem) => {
    setItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    // Remove from newly added set if it was there, so it doesn't autofocus randomly
    setNewlyAddedIds(prev => {
      const next = new Set(prev);
      next.delete(updatedItem.id);
      return next;
    });
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddRow = (afterId?: string) => {
    const newItem: IPricingItem = {
      id: generateId(),
      procedimento: "",
      especialidade: "",
      cobertura: "",
      valor: ""
    };

    setNewlyAddedIds(prev => new Set(prev).add(newItem.id));

    if (!afterId) {
      setItems(prev => [newItem, ...prev]);
    } else {
      setItems(prev => {
        const index = prev.findIndex(item => item.id === afterId);
        if (index === -1) return [...prev, newItem];
        const next = [...prev];
        next.splice(index + 1, 0, newItem);
        return next;
      });
    }
  };

  const filteredItems = items.filter(item => 
    item.procedimento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.especialidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full h-full max-w-5xl mx-auto gap-8">
      
      {/* Search Bar Area */}
      <div className="flex items-center justify-center w-full">
        <div className="flex items-center gap-3 bg-white rounded-md px-4 py-3 w-full max-w-md shadow-sm">
          <Search size={20} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Pesquisar..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-sm text-gray-700"
          />
        </div>
      </div>

      {/* Table Area */}
      <div className="w-full bg-white flex flex-col shadow-sm rounded-sm relative">
        
        {/* Absolute Tiny Add Button at Bottom Left */}
        <button 
          onClick={() => handleAddRow()}
          className="absolute -left-3 -bottom-3 z-20 flex items-center justify-center w-6 h-6 bg-white border border-gray-200 rounded-full shadow-md text-black hover:bg-gray-50 transition-colors"
          title="Adicionar Linha"
        >
          <span className="text-lg leading-none font-bold mt-[-2px]">+</span>
        </button>

        {/* Table Body (Scrollable with sticky header) */}
        <div className="max-h-[500px] overflow-y-auto overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px] relative">
            <thead className="bg-[#7CB99E] text-white font-semibold text-sm sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="p-3 w-[30%] font-semibold">
                  <div className="flex items-center justify-between gap-2">
                    Procedimento <ChevronUp size={16} className="text-white/80 shrink-0" />
                  </div>
                </th>
                <th className="p-3 w-[25%] border-l border-[#6DA38B] font-semibold">
                  <div className="flex items-center justify-between gap-2">
                    Especialidade <ChevronUp size={16} className="text-white/80 shrink-0" />
                  </div>
                </th>
                <th className="p-3 w-[25%] border-l border-[#6DA38B] font-semibold">
                  <div className="flex items-center justify-between gap-2">
                    Cobertura <ChevronUp size={16} className="text-white/80 shrink-0" />
                  </div>
                </th>
                <th className="p-3 w-[20%] border-l border-[#6DA38B] font-semibold">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <PricingTableRow 
                    key={item.id}
                    item={item}
                    isNew={newlyAddedIds.has(item.id)}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    onAddRow={handleAddRow}
                    specialtiesOptions={specialtiesOptions}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    Nenhum procedimento encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
