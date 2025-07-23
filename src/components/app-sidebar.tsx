"use client";

import * as React from "react";
import {
  BookOpen,
  BookUserIcon,
  Bot,
  Command,
  LifeBuoy,
  Send,
  Settings,
  Settings2,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { useCurrentUser } from "@/hooks/auth/use-current-user";

const navMainData = [
  {
    title: "Afiliados",
    url: "/dashboard/affiliates",
    icon: Users,
    isActive: true
  },
  {
    title: "Cuotas",
    url: "/dashboard/quotas",
    icon: BookUserIcon,
  },
  {
    title: "Configuración de cuotas",
    url: "/dashboard/quotas-config",
    icon: Settings,
  }
];

const navSecondaryData = [
  {
    title: "Soporte",
    url: "/dashboard/support",
    icon: LifeBuoy,
  }
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, loading } = useCurrentUser();

  // Crear datos del usuario para NavUser
  const userData = user ? {
    name: user.username,
    avatar: "/favicon.webp",
  } : {
    name: "Usuario",
    avatar: "/favicon.webp",
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-center items-center gap-x-1">
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainData} />
        <NavSecondary items={navSecondaryData} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
