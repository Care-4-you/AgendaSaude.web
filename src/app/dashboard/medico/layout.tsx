/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

import clinicPicture2 from "@/assets/clinicwithgreenbg.png";
import { default as LayoutContainer } from "@/components/layout/container";

export default function Dashboard({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const routesWithoutBgImage = [
    "/my-account/email-and-password",
    "/my-account"
  ];

  const shouldHideBgImage = routesWithoutBgImage.some((route) =>
    pathname?.includes(route)
  );

  return (
    <LayoutContainer
      as="section"
      className="flex h-full min-h-[calc(100vh-68px)] gap-4 overflow-x-hidden py-20"
    >
      {children}

      {!shouldHideBgImage && (
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
