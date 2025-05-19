"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, PieChart, Wallet, TrendingUp, Users } from "lucide-react"
import axios from "axios"

export default function InvestorDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [investorData, setInvestorData] = useState(null)

  useEffect(() => {
    if (!loading && (!user || user.role !== "investor")) {
      router.push("/login")
    }

    if (user) {
      // Fetch investor data from backend API
      axios
        .get("http://localhost:3000/api/investordata", {
          headers: {
            Authorization: `Bearer ${user.token}`, // Add token if needed for auth
          },
        })
        .then((response) => {
          setInvestorData(response.data)
        })
        .catch((error) => {
          console.error("Error fetching investor data:", error)
        })
    }
  }, [user, loading, router])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!user || !investorData) {
    return null
  }

  // Destructure the investor data with fallback values
  const {
    investedStartups = [],
    totalInvestedAmount = 0,
    activeInvestments = 0,
    startupMatches = 0,
    startupsCount = 0,
  } = investorData

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-3xl font-bold mb-6">Investor Dashboard</h1> */}

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
          <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
            <LineChart className="h-12 w-12 text-gray-400" />
            <span className="ml-2 text-gray-500">Portfolio Chart</span>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Asset Allocation</h3>
          <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
            <PieChart className="h-12 w-12 text-gray-400" />
            <span className="ml-2 text-gray-500">Asset Allocation Chart</span>
          </div>
        </Card>
      </div>


      <Card className="p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Recommended Startups</h3>
          <Button variant="outline">View All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4">
              <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
              <h4 className="font-medium">Startup {i}</h4>
              <p className="text-sm text-muted-foreground mb-2">Blockchain Security</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">$2.5M raised</span>
                <Button size="sm">View</Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Recent Transactions</h3>
          <Button variant="outline">View All</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2">Startup Id</th>
                <th className="text-left py-3 px-2">Startup Name</th>
                <th className="text-left py-3 px-2">Amount</th>
                <th className="text-left py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {investedStartups.map((tx, i) => (
                <tr key={i} className="border-b">
                  {/* <td className="py-3 px-2">{tx.date}</td> */}
                  <td className="py-3 px-2">{tx.startup}</td>
                  {/* <td className="py-3 px-2">{tx.startup}</td> */}
                  <td className="py-3 px-2">{tx.investedAmount}</td>
                  <td className="py-3 px-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        tx.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Optional: Additional sections for other data or charts */}
    {/* </div> */}
    </div>
  )
}
