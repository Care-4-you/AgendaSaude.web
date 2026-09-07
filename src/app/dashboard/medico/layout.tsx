"use client";

import React from "react";

export default function Dashboard({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="max-h-screen scroll-custom overflow-y-auto ">{children}</section>;
}
