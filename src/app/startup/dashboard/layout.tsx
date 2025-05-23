import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/startup-dashboard-sidebar";
// import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Investor Dashboard",
  description: "Track your startup investments and portfolio performance"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
 
        <SidebarProvider>
          <div className="flex h-screen w-full">
            <DashboardSidebar />
            <div className="flex-1 overflow-auto">{children}</div>
          </div>
        </SidebarProvider>
       
      </body>
    </html>
  );
}
