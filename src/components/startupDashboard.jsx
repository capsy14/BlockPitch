


"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Users, DollarSign, PlusCircle } from "lucide-react"
import Link from "next/link"
export default function StartupDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [startups, setStartups] = useState([])

  useEffect(() => {
    if (!loading && (!user || user.role !== "startup")) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    axios
      .get("/api/startupdata")
      .then((res) => {
        setStartups(res.data.startups || [])
      })
      .catch((err) => {
        console.error("Failed to fetch startup data:", err)
      })
  }, [])

  if (loading || !startups) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  // Flatten all transactions with startup name
  const allTransactions = startups.flatMap((startup) =>
    (startup.currentInvestors ?? []).map((investor) => ({
      ...investor,
      startupName: startup.startupName,
    })),
  )

  // Calculate total volume and unique investors (same as AllCredits)
  const totalAmount = allTransactions.reduce((sum, tx) => sum + tx.amount, 0)
  const totalInvestors = new Set(allTransactions.map((tx) => tx.email)).size

  // For summary cards, show the first startup or aggregate as needed
  const firstStartup = startups[0] || {}

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-3xl font-bold mb-6">{firstStartup.name}</h1> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Funds Raised */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 border-slate-200 dark:border-slate-800">
          <div className="absolute top-0 right-0 w-20 h-20 bg-slate-500/10 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-slate-500/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-slate-600 dark:text-slate-400" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Funds Raised</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{totalAmount.toFixed(9)} ETH</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Target: ${firstStartup.targetFund ?? 100}</p>
            </div>
          </div>
        </Card>

        {/* Investors */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 border-gray-200 dark:border-gray-800">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gray-500/10 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-500/10 rounded-lg">
                <Users className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Investors</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{totalInvestors}</p>
              <p className="text-sm text-green-600 dark:text-green-400">+{firstStartup.investorGrowthThisMonth ?? 0} this month</p>
            </div>
          </div>
        </Card>

        {/* Total Transactions */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-emerald-200 dark:border-emerald-800">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Total Transactions</p>
              <p className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">{allTransactions.length}</p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">All time</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Fundraising and Investor Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Fundraising Progress</h3>
          <ChartContainer
            config={{
              amount: {
                label: "Funds Raised (ETH)",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={(() => {
                  // Generate fundraising progress data over time
                  const progressData = []
                  let cumulativeAmount = 0

                  // Sort all transactions by date
                  const sortedTransactions = allTransactions.sort((a, b) => new Date(a.date) - new Date(b.date))

                  // Group by month and calculate cumulative amounts
                  const monthlyData = {}
                  sortedTransactions.forEach((tx) => {
                    const month = new Date(tx.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })
                    if (!monthlyData[month]) {
                      monthlyData[month] = 0
                    }
                    monthlyData[month] += tx.amount
                  })

                  // Convert to cumulative progress
                  Object.entries(monthlyData).forEach(([month, amount]) => {
                    cumulativeAmount += amount
                    progressData.push({
                      month,
                      amount: Number.parseFloat(cumulativeAmount.toFixed(6)),
                    })
                  })

                  // If no data, show sample data
                  if (progressData.length === 0) {
                    return [
                      { month: "Jan", amount: 0 },
                      { month: "Feb", amount: 0.5 },
                      { month: "Mar", amount: 1.2 },
                      { month: "Apr", amount: 2.1 },
                      { month: "May", amount: 3.5 },
                      { month: "Jun", amount: totalAmount || 5.2 },
                    ]
                  }

                  return progressData
                })()}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="var(--color-amount)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-amount)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Investor Demographics</h3>
          <ChartContainer
            config={{
              transactions: {
                label: "Transactions",
                color: "hsl(var(--chart-2))",
              },
              investors: {
                label: "Unique Investors",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={(() => {
                  // Generate investor demographics data
                  const monthlyStats = {}

                  allTransactions.forEach((tx) => {
                    const month = new Date(tx.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })

                    if (!monthlyStats[month]) {
                      monthlyStats[month] = {
                        month,
                        transactions: 0,
                        investorEmails: new Set(),
                      }
                    }

                    monthlyStats[month].transactions += 1
                    monthlyStats[month].investorEmails.add(tx.email)
                  })

                  const demographicsData = Object.values(monthlyStats).map((stat) => ({
                    month: stat.month,
                    transactions: stat.transactions,
                    investors: stat.investorEmails.size,
                  }))

                  // If no data, show sample data
                  if (demographicsData.length === 0) {
                    return [
                      { month: "Jan", transactions: 0, investors: 0 },
                      { month: "Feb", transactions: 2, investors: 2 },
                      { month: "Mar", transactions: 5, investors: 4 },
                      { month: "Apr", transactions: 8, investors: 6 },
                      { month: "May", transactions: 12, investors: 9 },
                      { month: "Jun", transactions: allTransactions.length || 15, investors: totalInvestors || 11 },
                    ]
                  }

                  return demographicsData.sort((a, b) => new Date(a.month) - new Date(b.month))
                })()}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="transactions" fill="var(--color-transactions)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="investors" fill="var(--color-investors)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>
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
          {firstStartup.pitchMaterials?.length === 0 ? (
            <p className="text-sm text-muted-foreground">No pitch materials uploaded yet.</p>
          ) : (
            firstStartup.pitchMaterials?.map((item, i) => (
              <Card key={i} className="p-4">
                <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{item.type}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </Card>

      {/* Current Investors */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Current Investors</h3>
          <Link href="./dashboard/credits">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2">Investor Name</th>
                <th className="text-left py-3 px-2">Email</th>
                <th className="text-left py-3 px-2">Amount (ETH)</th>
                <th className="text-left py-3 px-2">Wallet Address</th>
                <th className="text-left py-3 px-2">Date</th>
              </tr>
            </thead>

            <tbody>
              {(() => {
                // Flatten all investors from all startups
                const allInvestors = startups.flatMap((startup) =>
                  (startup.currentInvestors ?? []).map((investor) => ({
                    ...investor,
                    startupName: startup.startupName,
                  })),
                )
                // Sort by date descending and take top 3
                const latestInvestors = allInvestors.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)

                if (latestInvestors.length === 0) {
                  return (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-muted-foreground">
                        No investors yet.
                      </td>
                    </tr>
                  )
                }

                return latestInvestors.map((investor, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-3 px-2">{investor.name}</td>
                    <td className="py-3 px-2">{investor.email}</td>
                    <td className="py-3 px-2">{investor.amount}</td>
                    <td className="py-3 px-2 font-mono">{investor.walletAddress}</td>
                    <td className="py-3 px-2">{new Date(investor.date).toLocaleDateString()}</td>
                  </tr>
                ))
              })()}
            </tbody>
          </table>
        </div>
      </Card>

      {/* All Credits Component */}
    </div>
  )
}
