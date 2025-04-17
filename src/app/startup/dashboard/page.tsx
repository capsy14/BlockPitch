// const { default: StartupDashboard } = require("@/components/startupDashboard");

// const StartupDashboardPage = () => {
//   return <>
//     <StartupDashboard/>
//   </>
// };

// export default StartupDashboardPage;
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardSidebar } from "@/components/startup-dashboard-sidebar";
import StartupDashboard from "@/components/startupDashboard";

export default function StartupDashboardPage() {
  return (
    <div className="flex">
      <StartupDashboard />
    </div>

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
