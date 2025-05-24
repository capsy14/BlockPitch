"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Wallet,
  TrendingUp,
  Users,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  ArrowRight,
  FileText,
} from "lucide-react"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

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
        .get("http://localhost:3000/api/investordata", {
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
    }, {})
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Portfolio Value</h3>
            <Wallet className="text-indigo-600" />
          </div>
          <p className="text-3xl font-bold">${totalInvestedAmount}</p>
          <p className="text-sm text-green-600 mt-2">+5.23% today</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Active Investments</h3>
            <TrendingUp className="text-indigo-600" />
          </div>
          <p className="text-3xl font-bold">{activeInvestments}</p>
          <p className="text-sm text-muted-foreground mt-2">Across {startupsCount} startups</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Startup Matches</h3>
            <Users className="text-indigo-600" />
          </div>
          <p className="text-3xl font-bold">{startupMatches}</p>
          <p className="text-sm text-muted-foreground mt-2">5 new this week</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Portfolio Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={portfolioChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Asset Allocation</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {allocationData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(${index * 50}, 70%, 60%)`} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
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
