"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Building2,
  CreditCard,
  LayoutDashboard,
  LineChart,
  LogOut,
  GalleryVerticalEnd 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
// import { ModeToggle } from "@/components/mode-toggle"

export function DashboardSidebar() {
  const pathname = usePathname();
  const basePath = "/investor/dashboard";

  const routes = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: `${basePath}/`,
      active: pathname === basePath
    },
    {
      title: "All Startups",
      icon: GalleryVerticalEnd ,
      href: `${basePath}/startups`,
      active: pathname === basePath
    },
    {
      title: "Messages",
      icon: Building2,
      href: `${basePath}/messages`,
      active:
        pathname === `${basePath}/messages` ||
        pathname.startsWith(`${basePath}/startups/`)
    },
    {
      title: "Investments",
      icon: CreditCard,
      href: `${basePath}/investments`,
      active: pathname === `${basePath}/investments`
    }
    ,
    // {
    //   title: "Insights",
    //   icon: LineChart,
    //   href: `${basePath}/insights`,
    //   active: pathname === `${basePath}/insights`
    // }
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          
          <Link href="/">
  <span className="font-semibold text-lg">BlockPitch</span>
</Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton asChild isActive={route.active}>
                <Link href={route.href}>
                  <route.icon className="h-5 w-5" />
                  <span>{route.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar> */}
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Angel Investor</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {/* <ModeToggle /> */}
            <Button variant="ghost" size="icon" title="Logout">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
      <SidebarTrigger className="absolute right-4 top-4 md:hidden" />
    </Sidebar>
  );
}
