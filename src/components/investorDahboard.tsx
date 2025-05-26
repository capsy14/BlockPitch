
"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, Users, PieChartIcon, ArrowRight, FileText, Sparkles, DollarSign } from "lucide-react"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"

export default function InvestorDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [investorData, setInvestorData] = useState(null)
  const [startups, setStartups] = useState([])
  const [ethTransactions, setEthTransactions] = useState([])

  useEffect(() => {
    if (!loading && (!user || user.role !== "investor")) {
      router.push("/login")
    }

    if (user) {
      axios
        .get("/api/investordata", {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => setInvestorData(response.data))
        .catch((error) => console.error("Error fetching investor data:", error))
    }
  }, [user, loading, router])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("uploadedLinks")) || []
    setEthTransactions(stored)
  }, [])

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const res = await axios.get("/api/startup")
        setStartups(res.data)
      } catch (err) {
        console.error("Error fetching startups:", err)
      }
    }
    fetchStartups()
  }, [])

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  if (!user || !investorData) return null

  // Calculate from transactions
  const totalInvestedAmount = ethTransactions.reduce((sum, tx) => sum + Number(tx.amount || 0), 0)
  const activeInvestments = ethTransactions.length
  const startupMatches = new Set(ethTransactions.map((tx) => tx.startupId)).size

  const { startupsCount = 0 } = investorData

  const portfolioChartData = ethTransactions.map((tx, i) => ({
    name: `Tx ${i + 1}`,
    amount: Number(tx.amount),
  }))

  const allocationData = Object.values(
    ethTransactions.reduce((acc, tx) => {
      const name = tx.startupName || "Unknown"
      acc[name] = acc[name] || { name, value: 0 }
      acc[name].value += Number(tx.amount)
      return acc
    }, {}),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 border-slate-200 dark:border-slate-800">
          <div className="absolute top-0 right-0 w-20 h-20 bg-slate-500/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-slate-500/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-slate-600 dark:text-slate-400" />
              </div>
              <Sparkles className="h-5 w-5 text-slate-500" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Portfolio Value</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                ${totalInvestedAmount.toFixed(9)}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +5.23% today
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 border-gray-200 dark:border-gray-800">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gray-500/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-500/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
              <Sparkles className="h-5 w-5 text-gray-500" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Investments</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{activeInvestments}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Across {startupsCount} startups</p>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-emerald-200 dark:border-emerald-800">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <Sparkles className="h-5 w-5 text-emerald-500" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Startup Matches</p>
              <p className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">{startupMatches}</p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">5 new this week</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 border-slate-200 dark:border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-gray-500/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Portfolio Performance</h3>
            </div>
            <div className="h-64">
              <ChartContainer
                config={{
                  amount: {
                    label: "Investment Amount",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={portfolioChartData}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={3}
                      fill="url(#colorAmount)"
                      dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "hsl(var(--chart-1))", strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 border-slate-200 dark:border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <PieChartIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Asset Allocation</h3>
            </div>
            <div className="h-64">
              <ChartContainer
                config={{
                  allocation: {
                    label: "Allocation",
                  },
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocationData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      stroke="hsl(var(--background))"
                      strokeWidth={2}
                    >
                      {allocationData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`hsl(${220 + index * 60}, 70%, ${60 + index * 5}%)`}
                          className="hover:opacity-80 transition-opacity duration-200"
                        />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} formatter={(value, name) => [`$${value}`, name]} />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                      wrapperStyle={{ fontSize: "12px", color: "hsl(var(--muted-foreground))" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Recommended Startups</h3>
          <Link href="./dashboard/startups">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {startups.slice(0, 3).map((startup) => (
            <Card
              key={startup._id}
              className="group overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              <CardHeader className="p-0 overflow-hidden">
                <div className="relative h-[220px] w-full overflow-hidden">
                  <Image
                    src={startup.image || "/image.png"}
                    alt={startup.name || "Startup Image"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ objectPosition: "center" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors duration-200">
                    {startup.startupName}
                  </h2>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {startup.industry}
                  </span>
                </div>
                <p className="line-clamp-2 text-muted-foreground leading-relaxed">{startup.description}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link href={`./startups/${startup._id}`} className="w-full">
                  <Button
                    className="w-full group/button relative overflow-hidden transition-all duration-300 hover:bg-primary/90"
                    size="lg"
                  >
                    <span className="flex items-center justify-center gap-2 transition-transform duration-300 group-hover/button:translate-x-1">
                      Invest Now
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                    </span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Recent Transactions</h3>
          <Link href="./dashboard/investments">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2">Startup ID</th>
                <th className="text-left py-3 px-2">Startup Name</th>
                <th className="text-left py-3 px-2">Amount</th>
                <th className="text-left py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {ethTransactions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-muted-foreground">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                ethTransactions.slice(0, 3).map((tx, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-3 px-2">{tx.startupId}</td>
                    <td className="py-3 px-2">{tx.startupName}</td>
                    <td className="py-3 px-2">{tx.amount}</td>
                    <td className="py-3 px-2">
                      <a href={tx.ipfsUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          View Proof
                        </Button>
                      </a>
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
