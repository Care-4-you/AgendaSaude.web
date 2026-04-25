import React, { useState, useEffect } from "react";
import { IPricingItem } from "@/shared/interfaces/IPricing";
import { Edit2, Trash2, PlusCircle, Check } from "lucide-react";

interface PricingTableRowProps {
  item: IPricingItem;
  isNew?: boolean;
  onUpdate: (item: IPricingItem) => void;
  onDelete: (id: string) => void;
  onAddRow: (afterId: string) => void;
  specialtiesOptions: string[];
}

export function PricingTableRow({ 
  item, 
  isNew = false, 
  onUpdate, 
  onDelete, 
  onAddRow,
  specialtiesOptions 
}: PricingTableRowProps) {
  const [isEditing, setIsEditing] = useState(isNew);
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState<IPricingItem>({ ...item });

  useEffect(() => {
    setFormData({ ...item });
  }, [item]);

  const handleSave = () => {
    setIsEditing(false);
    onUpdate(formData);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
      onAddRow(item.id); // Triggers adding a new row right after this one
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setFormData({ ...item }); // Revert
    }
  };

  const formatCurrency = (val: number | string) => {
    const num = typeof val === 'string' ? parseFloat(val.replace(/[^\d.-]/g, '')) || 0 : val;
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
  };

  const inputClass = "w-full bg-transparent border-b border-gray-400 focus:border-black outline-none px-1 py-1 text-sm text-gray-800";

  return (
    <tr 
      className="relative border-b border-gray-200 hover:bg-gray-50/50 group h-12 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <td className="p-3 relative">


        {isEditing ? (
          <input 
            type="text" 
            value={formData.procedimento}
            onChange={e => setFormData({ ...formData, procedimento: e.target.value })}
            onKeyDown={handleKeyDown}
            className={inputClass}
            placeholder="Nome do procedimento"
            autoFocus={isNew}
          />
        ) : (
          <span className="text-sm text-gray-800 font-medium truncate block">{item.procedimento || "-"}</span>
        )}
      </td>
      <td className="p-3 border-l border-gray-200">
        {isEditing ? (
          <select 
            value={formData.especialidade}
            onChange={e => setFormData({ ...formData, especialidade: e.target.value })}
            onKeyDown={handleKeyDown}
            className={inputClass}
          >
            <option value="">Selecione...</option>
            {specialtiesOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <span className="text-sm text-gray-800 truncate block">{item.especialidade || "-"}</span>
        )}
      </td>
      <td className="p-3 border-l border-gray-200">
        {isEditing ? (
          <select 
            value={formData.cobertura}
            onChange={e => setFormData({ ...formData, cobertura: e.target.value })}
            onKeyDown={handleKeyDown}
            className={inputClass}
          >
            <option value="">Selecione...</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
        ) : (
          <span className="text-sm text-gray-800 truncate block">{item.cobertura || "-"}</span>
        )}
      </td>
      <td className="p-3 border-l border-gray-200 relative">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">R$</span>
            <input 
              type="text" 
              value={formData.valor}
              onChange={e => setFormData({ ...formData, valor: e.target.value })}
              onKeyDown={handleKeyDown}
              className={inputClass}
              placeholder="0,00"
            />
          </div>
        ) : (
          <span className="text-sm text-gray-800 font-medium truncate block">{formatCurrency(item.valor)}</span>
        )}

        {/* Action Buttons on Right Hover */}
        <div className={`absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 items-center transition-opacity duration-200 bg-white/80 p-1 rounded-md ${isHovered || isEditing ? 'opacity-100' : 'opacity-0'}`}>
          {isEditing ? (
            <button 
              onClick={handleSave}
              className="text-green-600 hover:text-green-800 p-1"
              title="Salvar"
            >
              <Check size={16} />
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-[#4E3FB4] p-1"
              title="Editar"
            >
              <Edit2 size={16} />
            </button>
          )}
          <button 
            onClick={() => onDelete(item.id)}
            className="text-gray-400 hover:text-red-500 p-1"
            title="Excluir"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
