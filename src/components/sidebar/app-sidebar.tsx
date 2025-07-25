"use client";

import { Dumbbell, LogOut } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import config from "@/config";
import { menuItems } from "@/app/dashboard/layout";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove(config.ACCESS_TOKEN_COOKIE_KEY);
    localStorage.removeItem("gymnos_user");
    router.push("/login");
  };

  return (
    <Sidebar className="border-r-0 bg-sidebar-background text-sidebar-foreground" variant="inset" {...props}>
      <SidebarHeader className="border-b border-sidebar-border pb-4 pt-6 px-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="group flex w-full items-center gap-3 rounded-xl px-2 py-2 transition-colors duration-200 hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md transition-all group-hover:scale-105">
                <Dumbbell className="size-5" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-bold text-base tracking-tight">starsgym</span>
                <span className="text-xs text-muted-foreground">Sistema de gestión</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2 pt-4 pb-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[15px] font-medium transition-colors duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-primary/90 data-[active=true]:text-primary-foreground"
                  >
                    <a href={item.url} className="flex items-center gap-3 w-full">
                      <item.icon className="size-5 opacity-80 group-hover:opacity-100 transition-opacity" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border px-4 py-3 mt-auto bg-sidebar-background/95">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Cerrar sesión"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[15px] font-medium transition-colors duration-150 hover:bg-destructive hover:text-destructive-foreground"
              onClick={handleLogout}
            >
              <LogOut className="size-5 opacity-80 group-hover:opacity-100 transition-opacity" />
              <span>Cerrar sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
