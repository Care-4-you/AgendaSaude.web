"use client";
import React, { useState } from "react";

import { IPricingItem } from "@/shared/interfaces/IPricing";
import { Search, ChevronUp } from "lucide-react";

import { PricingTableRow } from "./PricingTableRow";

interface PricingTableProps {
  initialItems: IPricingItem[];
  specialtiesOptions: string[];
}

export function PricingTable({
  initialItems,
  specialtiesOptions
}: PricingTableProps) {
  const [items, setItems] = useState<IPricingItem[]>(initialItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [newlyAddedIds, setNewlyAddedIds] = useState<Set<string>>(new Set());

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const handleUpdate = (updatedItem: IPricingItem) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    // Remove from newly added set if it was there, so it doesn't autofocus randomly
    setNewlyAddedIds((prev) => {
      const next = new Set(prev);
      next.delete(updatedItem.id);
      return next;
    });
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddRow = (afterId?: string) => {
    const newItem: IPricingItem = {
      id: generateId(),
      procedimento: "",
      especialidade: "",
      cobertura: "",
      valor: ""
    };

    setNewlyAddedIds((prev) => new Set(prev).add(newItem.id));

    if (!afterId) {
      setItems((prev) => [newItem, ...prev]);
    } else {
      setItems((prev) => {
        const index = prev.findIndex((item) => item.id === afterId);
        if (index === -1) return [...prev, newItem];
        const next = [...prev];
        next.splice(index + 1, 0, newItem);
        return next;
      });
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.procedimento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.especialidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto flex h-full w-full max-w-5xl flex-col gap-8">
      {/* Search Bar Area */}
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full max-w-md items-center gap-3 rounded-md bg-white px-4 py-3 shadow-sm">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-none bg-transparent text-sm text-gray-700 outline-none"
          />
        </div>
      </div>

      {/* Table Area */}
      <div className="relative flex w-full flex-col rounded-sm bg-white shadow-sm">
        {/* Absolute Tiny Add Button at Bottom Left */}
        <button
          onClick={() => handleAddRow()}
          className="absolute -bottom-3 -left-3 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-black shadow-md transition-colors hover:bg-gray-50"
          title="Adicionar Linha"
        >
          <span className="mt-[-2px] text-lg font-bold leading-none">+</span>
        </button>

        {/* Table Body (Scrollable with sticky header) */}
        <div className="max-h-[500px] overflow-x-auto overflow-y-auto">
          <table className="relative w-full min-w-[600px] border-collapse text-left">
            <thead className="sticky top-0 z-10 bg-[#7CB99E] text-sm font-semibold text-white shadow-sm">
              <tr>
                <th className="w-[30%] p-3 font-semibold">
                  <div className="flex items-center justify-between gap-2">
                    Procedimento{" "}
                    <ChevronUp size={16} className="shrink-0 text-white/80" />
                  </div>
                </th>
                <th className="w-[25%] border-l border-[#6DA38B] p-3 font-semibold">
                  <div className="flex items-center justify-between gap-2">
                    Especialidade{" "}
                    <ChevronUp size={16} className="shrink-0 text-white/80" />
                  </div>
                </th>
                <th className="w-[25%] border-l border-[#6DA38B] p-3 font-semibold">
                  <div className="flex items-center justify-between gap-2">
                    Cobertura{" "}
                    <ChevronUp size={16} className="shrink-0 text-white/80" />
                  </div>
                </th>
                <th className="w-[20%] border-l border-[#6DA38B] p-3 font-semibold">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
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
