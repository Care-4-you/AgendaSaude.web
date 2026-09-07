"use client";

import Link from "next/link";
import React, { useState } from "react";

import { AlphabeticalContactList } from "@/components/alphabetical-contact-list";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { ChevronLeft } from "lucide-react";

import { clinics } from "@/shared/utils";

export default function ClinicPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredClinics = clinics.filter((clinic) =>
    clinic.name
      .toLocaleLowerCase()
      .includes(debouncedSearchTerm.toLocaleLowerCase())
  );

  return (
    <>
      <div className="flex  w-full flex-1 flex-col  items-start p-8 ">
        <div className="flex w-full flex-col gap-8">
          <Link
            href="/dashboard/medico"
            className="mb-5 flex  items-center gap-2 text-start font-semibold text-black transition-all hover:underline"
          >
            <ChevronLeft size={24} strokeWidth={4} />
            <h2 className=" w-full text-start  font-museo text-2xl font-semibold">
              Clínicas vinculadas
            </h2>
          </Link>

          <div className=" min-h-[600px] w-full rounded-md bg-agenda-saude-purple-300 ">
            <div className="flex flex-col items-center justify-center gap-2 px-5 py-16 md:px-10">
              <Input
                id="search"
                type="text"
                placeholder="Pesquisar médico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-6 h-12 max-w-md bg-background text-black ring-offset-background placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
              />

              <AlphabeticalContactList
                contacts={filteredClinics}
                className="scroll-custom max-h-[500px] w-full max-w-xl overflow-y-auto "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
