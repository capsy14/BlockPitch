"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, PieChart, Wallet, TrendingUp, Users } from "lucide-react"
import axios from "axios"
import { CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FileText } from "lucide-react"
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


  const [startups, setStartups] = useState([])


  const [ethTransactions, setEthTransactions] = useState([]);

useEffect(() => {
  // Read from localStorage (same as SendEth)
  const stored = JSON.parse(localStorage.getItem("uploadedLinks")) || [];
  setEthTransactions(stored);
}, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/startup")
        console.log("Fetched data:", res.data)
        setStartups(res.data)
      } catch (err) {
        console.error("Error fetching startups:", err)
      }
    }

    fetchData()
  }, [])
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

{/* +top 3 startup only  */}


      <Card className="p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Recommended Startups</h3>
 <Link href="./dashboard/startups">
          <Button variant="outline">View All</Button>
          </Link>        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4">
              <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
              <h4 className="font-medium">Startup {i}</h4>
              <p className="text-sm text-muted-foreground mb-2">Blockchain Security</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">$2.5M raised</span>
                <Button size="sm">View</Button>
              </div>
            </Card>
          ))} */}
          
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
                <th className="text-left py-3 px-2">Startup Id</th>
                <th className="text-left py-3 px-2">Startup Name</th>
                <th className="text-left py-3 px-2">Amount</th>
                <th className="text-left py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
  {ethTransactions.length === 0 ? (
    <tr>
      <td colSpan={5} className="py-6 text-center text-muted-foreground">
        No transactions found.
      </td>
    </tr>
  ) : (
    ethTransactions.slice(0,3).map((tx, i) => (
      <tr key={i} className="border-b">
        <td className="py-3 px-2">{tx.startupId}</td>
        <td className="py-3 px-2">{tx.startupName}</td>
        <td className="py-3 px-2">{tx.amount}</td>
        <td className="py-3 px-2">
          <a
            href={tx.ipfsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
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

      {/* Optional: Additional sections for other data or charts */}
    {/* </div> */}
    </div>
  )
}