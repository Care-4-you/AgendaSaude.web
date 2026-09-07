// src/app/dashboard/_components/sidebar/site-header.tsx
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  return (
    <header className="h-(--header-height) sticky top-0 z-40 flex shrink-0 items-center p-2">
      <div className="flex w-full items-center ">
        <SidebarTrigger className="-ml-1" />
      </div>
    </header>
  );
}
