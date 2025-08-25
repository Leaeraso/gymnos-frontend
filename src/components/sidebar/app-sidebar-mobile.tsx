"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { menuItems } from "@/app/dashboard/layout";
import { Dumbbell, LogOut } from "lucide-react";
import { MenuItems } from "@/types/sidebar.types";
import { useLogout } from "@/hooks/auth/use-logout";

export function AppSidebarMobile() {
    const isMobile = useIsMobile();
    const pathname = usePathname();
    const logout = useLogout();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    if (!isMobile) return null;

    const allMenuItems: MenuItems[] = [
        {
            title: "Usuario",
            url: "#",
            icon: Dumbbell,
            isUserMenu: true
        },
        ...menuItems
    ];

    return (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
            {isUserMenuOpen && (
                <div className="
                    absolute bottom-full left-0 mb-2 w-full
                    bg-background rounded-xl shadow-lg border border-muted
                    overflow-hidden animate-in fade-in slide-in-from-bottom-2
                ">
                    <button className="
                        flex items-center w-full p-3 space-x-3
                        hover:bg-accent transition-colors text-red-500
                    "
                        onClick={logout}
                    >
                        <LogOut className="size-5" />
                        <span className="text-sm">Cerrar sesión</span>
                    </button>
                </div>
            )}

            <nav className="
                flex rounded-2xl bg-background shadow-lg border border-muted
                w-[calc(100vw-2rem)] max-w-[420px] p-1
            ">
                <div className="flex flex-1 justify-evenly">
                    {allMenuItems.map((item) => {
                        const active = pathname === item.url;
                        return item.isUserMenu ? (
                            <button
                                key={item.title}
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className={`
                                    flex flex-col items-center justify-center 
                                    p-3 rounded-xl relative
                                    transition-colors duration-150
                                    ${isUserMenuOpen ? "text-primary font-semibold bg-muted" : "text-white hover:bg-accent"}
                                    text-primary
                                `}
                                aria-label={item.title}
                            >
                                <item.icon className={`size-6 ${isUserMenuOpen ? "text-primary" : "text-white"}`} />
                            </button>
                        ) : (
                            <Link
                                key={item.title}
                                href={item.url}
                                className={`
                                    flex flex-col items-center justify-center 
                                    p-3 rounded-xl
                                    transition-colors duration-150
                                    ${active ? "text-primary font-semibold bg-muted" : "text-white hover:bg-accent"}
                                `}
                                aria-label={item.title}
                            >
                                <item.icon className={`size-6 ${active ? "text-primary" : "text-white"}`} />
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}