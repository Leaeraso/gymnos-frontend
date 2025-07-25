import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { AppSidebarMobile } from "@/components/sidebar/app-sidebar-mobile";
import { Users, CreditCard, Settings } from "lucide-react";

export const menuItems = [
  {
    title: "Afiliados",
    url: "/dashboard/affiliates",
    icon: Users,
  },
  {
    title: "Cuotas",
    url: "/dashboard/quotas",
    icon: CreditCard,
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
