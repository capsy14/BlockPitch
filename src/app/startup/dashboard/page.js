"use client"

import { useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, LineChart, Users, DollarSign, Briefcase, PlusCircle } from "lucide-react"

export default function StartupDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== "startup")) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Startup Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Funds Raised</h3>
            <DollarSign className="text-indigo-600" />
          </div>
          <p className="text-3xl font-bold">$125,000</p>
          <p className="text-sm text-muted-foreground mt-2">Target: $500,000</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Investors</h3>
            <Users className="text-indigo-600" />
          </div>
          <p className="text-3xl font-bold">18</p>
          <p className="text-sm text-green-600 mt-2">+3 this month</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Pitch Deck Views</h3>
            <Briefcase className="text-indigo-600" />
          </div>
          <p className="text-3xl font-bold">245</p>
          <p className="text-sm text-muted-foreground mt-2">Last 30 days</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Fundraising Progress</h3>
          <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
            <LineChart className="h-12 w-12 text-gray-400" />
            <span className="ml-2 text-gray-500">Progress Chart</span>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Investor Demographics</h3>
          <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
            <BarChart className="h-12 w-12 text-gray-400" />
            <span className="ml-2 text-gray-500">Demographics Chart</span>
          </div>
        </Card>
      </div>

      <Card className="p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Your Pitch Materials</h3>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Pitch Deck", type: "PDF", date: "Updated 2 weeks ago" },
            { name: "Financial Projections", type: "Spreadsheet", date: "Updated 1 month ago" },
            { name: "Demo Video", type: "Video", date: "Updated 3 months ago" },
          ].map((item, i) => (
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
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Interested Investors</h3>
          <Button variant="outline">View All</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2">Investor</th>
                <th className="text-left py-3 px-2">Interest Level</th>
                <th className="text-left py-3 px-2">Last Contact</th>
                <th className="text-left py-3 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "John Smith", level: "High", contact: "2 days ago" },
                { name: "Sarah Johnson", level: "Medium", contact: "1 week ago" },
                { name: "Michael Brown", level: "Low", contact: "3 weeks ago" },
              ].map((investor, i) => (
                <tr key={i} className="border-b">
                  <td className="py-3 px-2">{investor.name}</td>
                  <td className="py-3 px-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        investor.level === "High"
                          ? "bg-green-100 text-green-800"
                          : investor.level === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {investor.level}
                    </span>
                  </td>
                  <td className="py-3 px-2">{investor.contact}</td>
                  <td className="py-3 px-2">
                    <Button size="sm">Contact</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

