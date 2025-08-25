import { LucideIcon } from "lucide-react";

export interface MenuItems {
    title: string;
    url: string;
    icon: LucideIcon;
    isUserMenu?: boolean
}