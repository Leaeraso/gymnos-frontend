import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { AppSidebarMobile } from "@/components/sidebar/app-sidebar-mobile";
import { Users, Settings, DollarSign } from "lucide-react";
import { MenuItems } from "@/types/sidebar.types";

export const menuItems: MenuItems[] = [
  {
    title: "Afiliados",
    url: "/dashboard/affiliates",
    icon: Users,
  },
  {
    title: "Cuotas",
    url: "/dashboard/quotas",
    icon: DollarSign,
  },
  {
    title: "Configuración de cuotas",
    url: "/dashboard/quotas-config",
    icon: Settings,
  },
];

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
      <AppSidebarMobile />
    </SidebarProvider>
  );
}
