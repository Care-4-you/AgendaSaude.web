/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";

export default function Dashboard({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="scroll-custom max-h-screen overflow-y-auto">
      {children}
    </section>
  );
}
