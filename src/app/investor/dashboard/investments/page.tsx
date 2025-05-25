// import { DashboardHeader } from "@/components/dashboard-header"
import { InvestmentHistory } from "@/components/investmentHistory"
import { InvestmentAlerts } from "@/components/investmentAlert"
import { LegalDocuments } from "@/components/legalDocument"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Layout from "@/components/Layout";
export default function InvestmentsPage() {
  return (
    <Layout>
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 space-y-6">
        
            <InvestmentHistory />
        
          
        
      </main>
    </div>
    </Layout>
  )
}
