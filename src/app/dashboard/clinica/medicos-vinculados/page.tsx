"use client";

import React, { useState } from "react";
import { AlphabeticalContactList } from "../../../../components/alphabetical-contact-list";
import { Input } from "../../../../components/ui/input";
import { doctors } from "../../../../shared/utils";
import { useDebounce } from "../../../../hooks/useDebounce";


export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLocaleLowerCase().includes(debouncedSearchTerm.toLocaleLowerCase())
  );


  return (
    <>
      <div className="flex w-full flex-1 items-center justify-between ">
        <div className="flex w-full items-center justify-center flex-col">
          <h2 className="mb-6 font-museo text-3xl  text-start w-full font-bold">Médicos vinculados</h2>
          <div className=" w-full rounded-md  bg-agenda-saude-purple-300 min-h-[700px] ">
         
            <div className="flex flex-col gap-2 items-center justify-center px-5 py-16 md:px-10">
            <Input
              labelClassName="text-white"
              id="search"
              type="text"
              className="w-full max-w-sm lg:max-w-md rounded-lg"
              placeholder="Pesquisar médico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
              <AlphabeticalContactList
                contacts={filteredDoctors}
                className="scroll-custom max-h-[500px] w-full max-w-xl overflow-y-auto "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
