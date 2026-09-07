"use client";

import React from "react";

export default function Dashboard({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className=" overflow-hidden md:max-h-screen  ">{children}</section>
  );
}
