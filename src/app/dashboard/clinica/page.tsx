/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import React from "react";

import { cn } from "../../../lib/utils";

import { buttonVariants } from "../../../components/ui/button";

export default function Page() {
  const path = "/dashboard/clinica";
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-between ">
      <h2 className="mb-6 w-full text-start font-museo text-3xl font-bold">
        Funcionalidades
      </h2>
      <div className="flex h-full  w-full items-center justify-center">
        <div className="grid h-full grid-cols-1 content-evenly  gap-4 font-museo sm:grid-cols-2 sm:gap-4  capitalize">
          <Link
            href={`${path}/cadastrar-medico`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-32 w-full max-w-[325px] whitespace-normal break-words rounded-2xl bg-agenda-saude-purple-300 px-4 text-center font-museo text-2xl"
            )}
          >
            Cadastrar médico
          </Link>

          <Link
            href={`${path}/calendario`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-32 w-full max-w-[325px] whitespace-normal break-words rounded-2xl bg-agenda-saude-purple-300 px-4 text-center font-museo text-2xl"
            )}
          >
            calendário
          </Link>

          <Link
            href={`${path}/contato-pacientes`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-32 w-full max-w-[325px] whitespace-normal break-words rounded-2xl bg-agenda-saude-purple-300 px-4 text-center font-museo text-2xl"
            )}
          >
            Contato dos pacientes
          </Link>

          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-32 w-full max-w-[325px] whitespace-normal break-words rounded-2xl bg-agenda-saude-purple-300 px-4 text-center font-museo text-2xl"
            )}
          >
            Tabela de preços
          </Link>

          <div className="flex  items-center justify-center sm:col-span-2">
            <Link
              href={`${path}/medicos-vinculados`}
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-32 w-full max-w-[325px] whitespace-normal break-words rounded-2xl bg-agenda-saude-purple-300 px-4 text-center font-museo text-2xl"
              )}
            >
              Médicos vinculados
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
