/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import React from "react";

import { cn } from "../../../lib/utils";

import { buttonVariants } from "../../../components/ui/button";

export default function Page() {
  const path = "/dashboard/clinica";
  return (
    <div className="flex  w-full flex-1 flex-col  justify-between ">
      <h2 className="mb-6 font-museo text-3xl font-bold">Funcionalidades</h2>
      <div className=" grid h-full grid-cols-1 justify-center justify-items-center gap-4  font-museo  md:grid-cols-2">
        <Link
          href={`${path}/cadastrar-medico`}
          className={cn(
            buttonVariants({ variant: "default" }),
            "h-32 w-full max-w-[325px] rounded-2xl bg-agenda-saude-purple-300 p-2 font-museo text-2xl"
          )}
        >
          Cadastrar medico
        </Link>

        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "default" }),
            "  h-32 w-full max-w-[325px] rounded-2xl bg-agenda-saude-purple-300 p-2 font-museo text-2xl"
          )}
        >
          Cadastrar medico
        </Link>

        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "default" }),
            "  h-32 w-full max-w-[325px] rounded-2xl bg-agenda-saude-purple-300 p-2 font-museo text-2xl"
          )}
        >
          Cadastrar medico
        </Link>

        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "default" }),
            "  h-32 w-full max-w-[325px] rounded-2xl bg-agenda-saude-purple-300 p-2 font-museo text-2xl"
          )}
        >
          Cadastrar medico
        </Link>

        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "default" }),
            "  h-32 w-full max-w-[325px] rounded-2xl bg-agenda-saude-purple-300 p-2 font-museo text-2xl"
          )}
        >
          Cadastrar medico
        </Link>

        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "default" }),
            "  h-32 w-full max-w-[325px] rounded-2xl bg-agenda-saude-purple-300 p-2 font-museo text-2xl"
          )}
        >
          Cadastrar medico
        </Link>
      </div>
    </div>
  );
}
