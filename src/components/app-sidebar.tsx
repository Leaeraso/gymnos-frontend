"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Settings,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
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

const data = {
  user: {
    name: "gymnos",
    email: "gymnos@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Afiliados",
      url: "/dashboard/affiliates",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Cuotas",
      url: "/dashboard/quotas",
      icon: Bot,
    },
    {
      title: "Configuración de cuota",
      url: "/dashboard/quotas-config",
      icon: Settings,
    },
    {
      title: "Documentación",
      url: "/dashboard/docs",
      icon: BookOpen,
    },
    {
      title: "Configuración",
      url: "/dashboard/settings",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-center items-center gap-x-1">
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Gymnos</span>
                </div>
              </a>
            </SidebarMenuButton>
            <ModeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
