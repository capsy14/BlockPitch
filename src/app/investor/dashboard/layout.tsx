import type React from "react";
import type { Metadata } from "next";
// import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/investorDashboardSidebar";

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
    <html lang="en" suppressHydrationWarning>
      <body 
     
      >
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
        <SidebarProvider>
          <div className="flex h-screen w-full">
            <DashboardSidebar />
            <div className="flex-1 overflow-auto">{children}</div>
          </div>
        </SidebarProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
