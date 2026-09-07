// src/app/dashboard/layout.tsx
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "./_components/sidebar/app-sidebar";
import { SiteHeader } from "./_components/sidebar/site-header";

export default function RootLayoutDashboard({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-[calc(100vh-100px)] w-full pt-20">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "16rem",
            "--header-height": "calc(var(--spacing) * 12)"
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset className="bg-slate-100">
          <SiteHeader />
          <main className="w-full flex-1">
            <div className=" ">{children}</div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
