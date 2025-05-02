// import { DashboardHeader } from "@/components/dashboard-header"
import { InvestmentHistory } from "@/components/investmentHistory"
import { InvestmentAlerts } from "@/components/investmentAlert"
import { LegalDocuments } from "@/components/legalDocument"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InvestmentsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <DashboardHeader title="Investment Management" /> */}
      <main className="flex-1 p-6 space-y-6">
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="history">Investment History</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="documents">Legal Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="history" className="mt-6">
            <InvestmentHistory />
          </TabsContent>
          <TabsContent value="alerts" className="mt-6">
            <InvestmentAlerts />
          </TabsContent>
          <TabsContent value="documents" className="mt-6">
            <LegalDocuments />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
