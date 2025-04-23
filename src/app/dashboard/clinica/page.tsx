/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import React from "react";

import { default as LayoutContainer } from "@/components/layout/container";

import { cn } from "../../../lib/utils";

import { buttonVariants } from "../../../components/ui/button";

export default function Dashboard() {
  return (
    <LayoutContainer
      as="section"
      className="flex min-h-[calc(100vh-68px)] gap-4 py-16"
    >
      <div className="flex  w-full flex-1 flex-col  justify-between ">
        <h2 className="mb-6 text-3xl font-bold">Funcionalidades</h2>
        <div className=" grid  h-full grid-cols-1 justify-center justify-items-center  gap-4  md:grid-cols-2">
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-32 w-full max-w-[325px] bg-agenda-saude-purple-300 p-2 font-museo text-2xl"
            )}
          >
            Cadastrar medico
          </Link>

          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-32 w-full max-w-[325px] bg-agenda-saude-purple-300 p-2 font-museo text-2xl"
            )}
          >
            Cadastrar medico
          </Link>

          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-32 w-full max-w-[325px] bg-agenda-saude-purple-300 p-2 font-museo text-2xl"
            )}
          >
            Cadastrar medico
          </Link>

          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-32 w-full max-w-[325px] bg-agenda-saude-purple-300 p-2 font-museo text-2xl"
            )}
          >
            Cadastrar medico
          </Link>

          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-32 w-full max-w-[325px] bg-agenda-saude-purple-300 p-2 font-museo text-2xl"
            )}
          >
            Cadastrar medico
          </Link>

          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-32 w-full max-w-[325px] bg-agenda-saude-purple-300 p-2 font-museo text-2xl"
            )}
          >
            Cadastrar medico
          </Link>
        </div>
      </div>
      <div className="hidden w-full flex-1 bg-black lg:inline-block">
        <div></div>
      </div>
    </LayoutContainer>
  );
}
