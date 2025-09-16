"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Menu, X } from "lucide-react";

interface ClinicaFilterProps {
  onFilter: (filters: {
    address: string;
    radiusInKm: number;
    specialties?: string[];
  }) => void;
  onClear: () => void;
}

export default function ClinicaFilter({
  onFilter,
  onClear
}: ClinicaFilterProps) {
  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState(5);
  const [specialty, setSpecialty] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = () => {
    if (address.trim()) {
      onFilter({
        address,
        radiusInKm: radius,
        specialties: specialty ? [specialty] : []
      });
    } else {
      onClear();
    }
    setIsMenuOpen(false);
  };

  const handleClear = () => {
    setAddress("");
    setSpecialty("");
    setRadius(5);
    onClear();
    setIsMenuOpen(false);
  };

  return (
    <div className="relative bg-neutral-50 p-4 shadow-lg">
      {/* Hamburger Button for Mobile */}
      <button
        className="p-2 text-neutral-700 md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Filter Content */}
      <div
        className={`flex flex-col gap-4 transition-all duration-300 md:flex-row md:items-center md:gap-6 ${
          isMenuOpen
            ? "absolute left-0 top-12 z-10 w-64 bg-neutral-50 p-4 shadow-lg"
            : "hidden md:flex"
        }`}
      >
        {/* Endereço */}
        <div className="flex w-full flex-col gap-1 md:w-1/3">
          <label
            htmlFor="endereco"
            className="text-xs font-medium text-neutral-700"
          >
            Endereço
          </label>
          <Input
            id="endereco"
            type="text"
            placeholder="Endereço"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border-neutral-300 py-1 text-sm focus:ring-indigo-500"
          />
        </div>

        {/* Raio */}
        <div className="relative flex w-full flex-col gap-1 md:w-1/4">
          <label className="text-xs font-medium text-neutral-700">Raio</label>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 transform rounded-full bg-indigo-500 px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
            {radius} km
          </div>
          <Slider
            value={[radius]}
            min={1}
            max={60}
            step={1}
            onValueChange={(val) => setRadius(val[0])}
            className="w-full"
          />
        </div>

        {/* Especialidade */}
        <div className="flex w-full flex-col gap-1 md:w-1/3">
          <label
            htmlFor="especialidade"
            className="text-xs font-medium text-neutral-700"
          >
            Especialidade
          </label>
          <Input
            id="especialidade"
            type="text"
            placeholder="Especialidade"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full border-neutral-300 py-1 text-sm focus:ring-indigo-500"
          />
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-2">
          <Button
            onClick={handleSearch}
            className="bg-indigo-600 px-4 py-1 text-sm text-white transition-colors duration-200 hover:bg-indigo-700"
          >
            Buscar
          </Button>
          <Button
            variant="outline"
            onClick={handleClear}
            className="border-neutral-300 px-4 py-1 text-sm text-neutral-700 transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-900"
          >
            Limpar
          </Button>
        </div>
      </div>
    </div>
  );
}
