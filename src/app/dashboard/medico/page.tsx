/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

export default function Page() {
  const path = "/dashboard/medico";
  return (
    <div className="flex w-full flex-1 flex-col items-start justify-start ">
      <h2 className="mb-6 w-full text-start font-museo text-3xl font-bold">
        Funcionalidades
      </h2>
      <div className="flex h-full  w-full ">
        <div className="grid h-full grid-cols-1 content-start item-center  gap-4 font-museo capitalize sm:grid-cols-2 w-full  sm:gap-4">
          <Link
            href={`${path}/calendario-consulta`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-32 w-full max-w-[325px] whitespace-normal break-words rounded-2xl bg-agenda-saude-purple-300 px-4 text-center font-museo text-2xl"
            )}
          >
            Calendário de consulta
          </Link>


          <Link
            href={`${path}/clinicas-vinculados`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-32 w-full max-w-[325px] whitespace-normal break-words rounded-2xl bg-agenda-saude-purple-300 px-4 text-center font-museo text-2xl"
            )}
          >
            Clinicas vinculados
          </Link>

        </div>
      </div>
    </div>
  );
}
