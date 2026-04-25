/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";

import clinicPicture2 from "@/assets/clinicwithgreenbg.png";
import { default as LayoutContainer } from "@/components/layout/container";

export default function Dashboard({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isCalendario = pathname?.includes("/calendario");

  return (
    <LayoutContainer
      as="section"
      className={`flex h-full min-h-[calc(100vh-68px)] gap-4 overflow-x-hidden ${!isCalendario ? "py-16" : ""}`}
    >
      {children}

      {!isCalendario && (
        <div className="relative hidden w-full flex-1 items-center justify-end lg:inline-flex xl:justify-center">
          <div className="absolute -right-32 h-full min-h-[550px] w-[415px] xl:left-1/2 xl:-translate-x-1/2">
            <Image
              alt="foto da clinica"
              src={clinicPicture2}
              fill
              className="h-full object-contain"
            />
          </div>
        </div>
      )}
    </LayoutContainer>
  );
}
