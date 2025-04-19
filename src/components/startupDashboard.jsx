"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, LineChart, Users, DollarSign, Briefcase, PlusCircle } from "lucide-react"

export default function StartupDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [startupData, setStartupData] = useState(null)

  useEffect(() => {
    if (!loading && (!user || user.role !== "startup")) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    axios.get("/api/startupdata")
      .then(res => {
        setStartupData(res.data.startup)
      })
      .catch(err => {
        console.error("Failed to fetch startup data:", err)
      })
  }, [])

  if (loading || !startupData) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{startupData.name}</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Funds Raised" value={`$${startupData.fundsRaised}`} icon={<DollarSign />} subtitle={`Target: $${startupData.targetFund}`} />
        <StatCard title="Investors" value={startupData.totalInvestors} icon={<Users />} subtitle={`+${startupData.investorGrowthThisMonth} this month`} />
        <StatCard title="Pitch Views" value={startupData.pitchViews} icon={<Briefcase />} subtitle="Last 30 days" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ChartCard title="Fundraising Progress" icon={<LineChart />} />
        <ChartCard title="Investor Demographics" icon={<BarChart />} />
      </div>

      {/* Pitch Materials */}
      <Card className="p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Your Pitch Materials</h3>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {startupData.pitchMaterials.length === 0 ? (
            <p className="text-sm text-muted-foreground">No pitch materials uploaded yet.</p>
          ) : (
            startupData.pitchMaterials.map((item, i) => (
              <Card key={i} className="p-4">
                <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
                <h4 className="font-medium">{item.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{item.type}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {new Date(item.lastUpdated).toLocaleDateString()}
                  </span>
                  <Button size="sm" variant="outline">Edit</Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </Card>

      {/* Investors Table */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Current Investors</h3>
          <Button variant="outline">View All</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2">Investor</th>
                <th className="text-left py-3 px-2">Amount Invested</th>
                <th className="text-left py-3 px-2">Contact</th>
                <th className="text-left py-3 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {!startupData.investors || startupData.investors.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-muted-foreground">
                    No investors yet.
                  </td>
                </tr>
              ) : (
                startupData.investors.map((investor, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-3 px-2">{investor.investorEmail}</td>
                    <td className="py-3 px-2">${investor.investedAmount}</td>
                    <td className="py-3 px-2">N/A</td>
                    <td className="py-3 px-2">
                      <Button size="sm">Contact</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

function StatCard({ title, value, icon, subtitle }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="text-indigo-600">{icon}</div>
      </div>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>
    </Card>
  )
}

function ChartCard({ title, icon }) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
        {icon}
        <span className="ml-2 text-gray-500">Coming Soon</span>
      </div>
    </Card>
  )
}
