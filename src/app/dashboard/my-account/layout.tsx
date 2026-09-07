import React from "react";

export default function Dashboard({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className=" md:max-h-screen">{children}</section>;
}
