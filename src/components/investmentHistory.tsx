"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { AreaChart } from "@/components/ui/chart"
import { FileText } from "lucide-react"

export function InvestmentHistory() {
  // Sample investment data
  const investments = [
    {
      id: "1",
      company: "TechFlow AI",
      logo: "/placeholder.svg?height=40&width=40",
      initials: "TF",
      amount: "$150,000",
      date: "Mar 15, 2023",
      type: "Series A",
      equity: "1.2%",
      value: "$177,300",
      roi: "+18.2%",
    },
    {
      id: "2",
      company: "MediSync",
      logo: "/placeholder.svg?height=40&width=40",
      initials: "MS",
      amount: "$120,000",
      date: "Jan 8, 2023",
      type: "Seed",
      equity: "2.5%",
      value: "$149,400",
      roi: "+24.5%",
    },
    {
      id: "3",
      company: "EduSpark",
      logo: "/placeholder.svg?height=40&width=40",
      initials: "ES",
      amount: "$80,000",
      date: "Nov 22, 2022",
      type: "Pre-seed",
      equity: "3.2%",
      value: "$90,240",
      roi: "+12.8%",
    },
    {
      id: "4",
      company: "FinSecure",
      logo: "/placeholder.svg?height=40&width=40",
      initials: "FS",
      amount: "$200,000",
      date: "Aug 5, 2022",
      type: "Series A",
      equity: "0.8%",
      value: "$262,800",
      roi: "+31.4%",
    },
  ]

  // Sample portfolio growth data
  const portfolioData = [
    { month: "Aug '22", value: 200000 },
    { month: "Sep '22", value: 210000 },
    { month: "Oct '22", value: 225000 },
    { month: "Nov '22", value: 305000 },
    { month: "Dec '22", value: 320000 },
    { month: "Jan '23", value: 450000 },
    { month: "Feb '23", value: 480000 },
    { month: "Mar '23", value: 650000 },
    { month: "Apr '23", value: 680000 },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Growth</CardTitle>
          <CardDescription>Total value of your investments over time</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          {/* <AreaChart
            data={portfolioData}
            index="month"
            categories={["value"]}
            colors={["primary"]}
            valueFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            className="h-[300px]"
          /> */}
        </CardContent>
      </Card>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Investments</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="exited">Exited</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Investment History</CardTitle>
              <CardDescription>Track all your startup investments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {investments.map((investment) => (
                  <div
                    key={investment.id}
                    className="flex flex-col md:flex-row md:items-center justify-between border-b pb-6 last:border-0 last:pb-0 gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={investment.logo} alt={investment.company} />
                        <AvatarFallback>{investment.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{investment.company}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {/* <Badge variant="outline">{investment.type}</Badge> */}
                          <span>{investment.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-medium">{investment.amount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Equity</p>
                        <p className="font-medium">{investment.equity}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Current Value</p>
                        <p className="font-medium">{investment.value}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">ROI</p>
                        <p className="font-medium text-emerald-500">{investment.roi}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="md:self-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Investments</CardTitle>
              <CardDescription>Currently active investments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {investments.map((investment) => (
                  <div
                    key={investment.id}
                    className="flex flex-col md:flex-row md:items-center justify-between border-b pb-6 last:border-0 last:pb-0 gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={investment.logo} alt={investment.company} />
                        <AvatarFallback>{investment.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{investment.company}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {/* <Badge variant="outline">{investment.type}</Badge> */}
                          <span>{investment.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-medium">{investment.amount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Equity</p>
                        <p className="font-medium">{investment.equity}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Current Value</p>
                        <p className="font-medium">{investment.value}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">ROI</p>
                        <p className="font-medium text-emerald-500">{investment.roi}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="md:self-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="exited" className="pt-4">
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle>Exited Investments</CardTitle>
              <CardDescription>Investments you've exited</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-muted-foreground">No exited investments yet</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
