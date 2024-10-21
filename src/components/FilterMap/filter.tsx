"use client";

import Button from "../Button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ComboboxFilter } from "./components/comboboxfilter";

const FilterMap = () => {
  return (
    <div className="bg-purple-900 p-5">
      <div className="flex flex-col md:flex-row justify-between items-center mx-auto max-w-[1920px] md:px-2 xl:px-20">
        <Input
          type="text"
          placeholder="Endereço"
          className="w-full md:w-96 flex items-center  ml-4 pr-px mb-4 md:mb-0"
          label="Endereço:"
          labelClassName="text-xl text-white font-bold"
        />
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <Label className="text-xl text-white font-bold">Especialidade:</Label>
          <ComboboxFilter />
          <Button className="w-full md:w-auto h-10 flex justify-center text-xl font-bold hover:bg-black hover:text-white">
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterMap;
