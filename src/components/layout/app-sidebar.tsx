"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/icons";
import { LayoutDashboard, User, Sparkles, Map, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { user } from "@/lib/mock-data";

const menuItems = [
  { href: "/", label: "Inicio", icon: LayoutDashboard },
  { href: "/map", label: "Mapa", icon: Map },
  { href: "/generate-route", label: "Planificador IA", icon: Sparkles },
  { href: "/profile", label: "Perfil", icon: User },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-sidebar-primary" />
          <span className="font-headline text-lg group-data-[collapsible=icon]:hidden">
            Explore BCN
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <div className="flex items-center gap-3 p-2 group-data-[collapsible=icon]:justify-center">
           <Avatar className="h-9 w-9">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
              <span className="font-medium truncate">{user.name}</span>
              <span className="text-xs text-sidebar-foreground/70 truncate">{user.email}</span>
            </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
