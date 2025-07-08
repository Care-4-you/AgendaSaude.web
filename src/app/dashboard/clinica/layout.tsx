/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React from "react";

import clinicPicture from "@/assets/clinic_picture.jpg";
import { default as LayoutContainer } from "@/components/layout/container";

export default function Dashboard({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutContainer
      as="section"
      className="flex min-h-[calc(100vh-68px)] gap-4 overflow-x-hidden  py-16"
    >
      {children}

      <div className=" relative hidden w-full flex-1  items-center justify-end lg:inline-flex xl:justify-center ">
        <div className=" absolute -right-32 h-full  w-[350px] rounded-[50px]  bg-agenda-saude-green-100 xl:left-1/2 xl:-translate-x-1/2" />
        <div className="absolute -right-32 h-[550px] w-[415px] rounded-[50px] xl:left-1/2 xl:-translate-x-1/2">
          <Image
            alt="foto da clinica"
            src={clinicPicture}
            fill
            className="rounded-[50px] object-cover object-right"
          />
        </div>
      </div>
    </LayoutContainer>
  );
}
