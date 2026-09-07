"use client";

import React from "react";

export default function Dashboard({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className=" min-h-screen overflow-hidden ">{children}</section>
  );
}
