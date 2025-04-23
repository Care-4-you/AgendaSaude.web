/* eslint-disable react/no-unescaped-entities */
import React from "react";

import { default as LayoutContainer } from "@/components/layout/container";

export default function Dashboard() {
  return (
    <div className="w-full bg-agenda-saude-blue-100">
      <LayoutContainer as="section" className="py-16">
        <h1 className="mb-6 text-3xl font-bold">Paciente</h1>
      </LayoutContainer>
    </div>
  );
}
