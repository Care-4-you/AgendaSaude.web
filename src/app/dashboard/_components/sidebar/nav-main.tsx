"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
  pathName
}: {
  items: {
    title: string;
    url: string;
    icon?: React.JSX.Element;
  }[];
  pathName: string;
}) {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarGroup className="min-h-screen">
      <SidebarGroupContent className="flex h-full flex-col gap-2 !bg-transparent">
        <SidebarMenu className="flex h-full flex-col gap-6 ">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={`font-poppins text-base font-medium text-white hover:bg-white/10 hover:text-white ${pathName === item.url ? "bg-white/15 text-white" : ""}`}
              >
                <Link
                  href={item.url}
                  className="flex flex-row gap-4"
                  onClick={() => {
                    if (isMobile) {
                      setOpenMobile(false);
                    }
                  }}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
