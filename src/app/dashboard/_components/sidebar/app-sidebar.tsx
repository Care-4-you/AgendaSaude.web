// src/app/dashboard/_components/sidebar/app-sidebar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import iconImg from "@/assets/icon-plus-secondary.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/auth";
import { User, UserRoundPlus, Calendar, Users, Tag } from "lucide-react";

import { NavMain } from "./nav-main";

type UserType = "USER" | "paciente" | "medico";

interface MenuItem {
  title: string;
  url: string;
  icon: React.JSX.Element;
}

type MenuData = Record<UserType, MenuItem[]>;
const data: MenuData = {
  USER: [
    {
      title: "Cadastrar médicos",
      url: "/dashboard/clinica/cadastrar-medico",
      icon: <UserRoundPlus className="h-4 w-4" />
    },
    {
      title: "Calendario",
      url: "/dashboard/clinica/calendario",
      icon: <Calendar className="h-4 w-4" />
    },
    {
      title: "Contatos dos pacientes",
      url: "/dashboard/clinica/contato-pacientes",
      icon: <User className="h-4 w-4" />
    },
    {
      title: "Tabela de preços",
      url: "/dashboard/clinica/tabela-precos",
      icon: <Tag className="h-4 w-4" />
    },
    {
      title: "Médicos vinculados",
      url: "/dashboard/clinica/medicos-vinculados",
      icon: <Users className="h-4 w-4" />
    }
  ],

  paciente: [
    {
      title: "Agendar consulta",
      url: "/dashboard/clinica/agendar-consulta",
      icon: <Calendar className="h-4 w-4" />
    }
  ],

  medico: [
    {
      title: "Calendario de consultas",
      url: "/dashboard/medico/calendario",
      icon: <Calendar className="h-4 w-4" />
    },
    {
      title: "Clinicas Vinculadas",
      url: "/dashboard/medico/clinicas-vinculados",
      icon: <User className="h-4 w-4" />
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user: currentUser } = useAuth();
  const pathName = usePathname();

  const role = (currentUser?.role ?? "USER") as UserType;
  const menuItems = data[role] ?? [];

  return (
    <Sidebar
      collapsible="icon"
      className="z-10 border-r border-slate-200 shadow-sm md:sticky md:!inset-auto md:!h-[calc(100vh+5rem)] [&[data-sidebar=sidebar]]:bg-gradient-to-b [&[data-sidebar=sidebar]]:from-agenda-saude-purple-100 [&[data-sidebar=sidebar]]:to-agenda-saude-purple-200 [&_[data-sidebar=sidebar]]:bg-gradient-to-b [&_[data-sidebar=sidebar]]:from-agenda-saude-purple-100 [&_[data-sidebar=sidebar]]:to-agenda-saude-purple-200"
      {...props}
    >
      <SidebarHeader className=" bg-transparent  py-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:h-11 data-[slot=sidebar-menu-button]:rounded-xl data-[slot=sidebar-menu-button]:px-2.5"
              tooltip="Home"
            >
              <Link
                href="/dashboard"
                className="flex items-center gap-2 hover:bg-transparent"
              >
                <div className="flex w-full flex-row justify-start gap-2 text-left font-museo text-2xl font-bold text-white">
                  <Image src={iconImg} alt="Logo" width={24} height={24} />
                  Funcionalidade
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className=" min-h-screen bg-transparent">
        <NavMain items={menuItems} pathName={pathName} />
      </SidebarContent>
    </Sidebar>
  );
}
