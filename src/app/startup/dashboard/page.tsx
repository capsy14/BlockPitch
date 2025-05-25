
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardSidebar } from "@/components/startup-dashboard-sidebar";
import StartupDashboard from "@/components/startupDashboard";
import Layout from "@/components/Layout"

export default function StartupDashboardPage() {
  return (
    <Layout>
    <div className="flex">
    
      <StartupDashboard />
    </div>
    </Layout>

    // <SidebarProvider>
    //   <main>
    //     <SidebarTrigger />
    //     hi
    //     {/* <AppSidebar /> */}
    //     {/* <DashboardSidebar /> */}
    //   </main>
    // </SidebarProvider>
  );
}
