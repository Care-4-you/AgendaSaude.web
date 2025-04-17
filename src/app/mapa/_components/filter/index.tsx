"use client";
import { default as LayoutContainer } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
const especialidadesMedicas = [
  { value: "cardiologia", label: "Cardiologia" },
  { value: "dermatologia", label: "Dermatologia" },
  { value: "ginecologia", label: "Ginecologia" },
  { value: "ortopedia", label: "Ortopedia" },
  { value: "pediatria", label: "Pediatria" }
];
export function Filter() {
  return (
    <div className="bg-purple-900 ">
      <LayoutContainer className=" flex  flex-col items-start justify-between py-5 md:flex-row  md:items-center">
        <Input
          type="text"
          placeholder="Endereço"
          className="w-full items-center  justify-center gap-2 md:flex md:max-w-sm"
          label="Endereço:"
          labelClassName=" text-base text-white font-bold"
        />
        <div className="  inline-flex w-full items-center justify-end gap-4">
          <Combobox options={especialidadesMedicas} text="Especialidade" />
          <Button size="sm" className=" h-10  w-full max-w-min">
            Buscar
          </Button>
        </div>
      </LayoutContainer>
    </div>
  );
}
