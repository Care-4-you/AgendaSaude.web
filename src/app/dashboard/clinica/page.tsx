/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import React from "react";

import doctorandpaciente from "@/assets/doctor_and_pacient.jpg";
import { default as LayoutContainer } from "@/components/layout/container";

import { cn } from "../../../lib/utils";

import { buttonVariants } from "../../../components/ui/button";

export default function Dashboard() {
  return (
    <LayoutContainer
      as="section"
      className="flex min-h-[calc(100vh-68px)] gap-4 overflow-x-hidden  py-16"
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
      <div className=" relative hidden w-full flex-1  items-center justify-end lg:inline-flex xl:justify-center ">
        <div className=" absolute -right-32 h-full  w-[350px] rounded-[50px]  bg-agenda-saude-green-100 xl:left-1/2 xl:-translate-x-1/2" />
        <div className="absolute -right-32 h-[550px] w-[415px] rounded-[50px] xl:left-1/2 xl:-translate-x-1/2">
          <Image
            alt="doctor and pacient"
            src={doctorandpaciente}
            fill
            className="rounded-[50px] object-cover object-right"
          />
        </div>
      </div>
    </LayoutContainer>
  );
}
