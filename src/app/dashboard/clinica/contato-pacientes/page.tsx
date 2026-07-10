"use client";
import Link from "next/link";
import React, { useState } from "react";

import { AlphabeticalContactList } from "@/components/alphabetical-contact-list";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { ChevronLeft, Plus } from "lucide-react";

import { patients } from "@/shared/utils";


export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredPatients = patients.filter((patient) =>
    patient.name
      .toLocaleLowerCase()
      .includes(debouncedSearchTerm.toLocaleLowerCase())
  );

  return (
    <>
      <div className="flex w-full flex-1 items-center justify-between ">
        <div className=" flex w-full flex-col  gap-8">
          <Link
            href="/dashboard/clinica"
            className="mb-6 flex  items-center gap-2 text-start font-bold text-black transition-all hover:underline"
          >
            <ChevronLeft size={32} strokeWidth={4} />
            <h2 className=" w-full text-start  font-museo text-3xl font-bold">
              Contato dos pacientes
            </h2>
          </Link>

          <div className="relative min-h-[700px] w-full  rounded-md bg-agenda-saude-purple-300 ">
            <div className="absolute -top-10 left-1/2 flex h-20 w-80 -translate-x-1/2 transform items-center justify-center rounded-md bg-agenda-saude-green-100">
              <p className="text-2xl font-bold text-white">Contato</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 px-5 py-16 md:px-10">
              <Input
                labelClassName="text-white"
                id="search"
                type="text"
                className="w-full max-w-sm rounded-lg lg:max-w-md"
                placeholder="Pesquisar paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <AlphabeticalContactList
                contacts={filteredPatients}
                className="scroll-custom max-h-[500px] w-full max-w-xl overflow-y-auto "
              />
            </div>

            <Link
              href="/dashboard/clinica/contato-pacientes/new"
              className=" absolute bottom-10 right-20   flex size-14 items-center justify-center rounded-full bg-agenda-saude-blue-100 text-agenda-saude-purple-200 hover:bg-agenda-saude-blue-100"
            >
              <Plus size={43} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
