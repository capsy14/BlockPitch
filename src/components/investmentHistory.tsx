"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { AreaChart } from "@/components/ui/chart"
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { AreaChart } from "@tremor/react";

export function InvestmentHistory() {
  const [ethTransactions, setEthTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("uploadedLinks")) || [];
    setEthTransactions(stored);
  }, []);
  // Sample investment data
  // const portfolioChartData = ethTransactions.map((tx) => ({
  //   date: new Date(tx.timestamp || tx.date || Date.now()).toLocaleDateString(
  //     "en-US",
  //     {
  //       month: "short",
  //       year: "2-digit"
  //     }
  //   ),
  //   investment: Number(tx.amount) || 0
  // }));

  const portfolioChartData = ethTransactions.map((tx) => ({
  date: tx.timestamp
    ? new Date(tx.timestamp).toLocaleDateString("en-US", { month: "short", year: "2-digit" })
    : (tx.date
        ? new Date(tx.date).toLocaleDateString("en-US", { month: "short", year: "2-digit" })
        : "Unknown"),
  investment: Number(tx.amount) || 0
}));

  // Pagination logic
  const totalPages = Math.ceil(ethTransactions.length / itemsPerPage);
  const paginatedTx = ethTransactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Growth</CardTitle>
          <CardDescription>
            Total value of your investments over time
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          {portfolioChartData.length > 0 ? (
            <AreaChart
              data={portfolioChartData}
              index="date"
              categories={["investment"]}
              colors={["indigo"]}
              valueFormatter={(value) => `${value} ETH`}
              className="h-[300px]"
              showLegend={false}
              yAxisWidth={60}
            />
          ) : (
            <div className="text-muted-foreground text-center py-8">
              No portfolio data yet.
            </div>
          )}
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
              <CardDescription>
                Track all your startup investments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {paginatedTx.length === 0 ? (
                  <div className="text-muted-foreground text-center py-8">
                    No investments found.
                  </div>
                ) : (
                  <>
                    {paginatedTx.map((tx, i) => (
                      <div
                        key={i}
                        className="flex flex-col md:flex-row items-center justify-between border-b py-4 last:border-0 gap-4"
                      >
                        <div className="flex items-center gap-4 w-full md:w-auto">
                          <Avatar className="h-10 w-10 flex-shrink-0">
                            <AvatarImage src={tx.logo} alt={tx.startupName} />
                            <AvatarFallback>
                              {tx.startupName?.charAt(0) || "S"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className=" truncate font-bold text-black">
                              {tx.startupName || "Startup"}
                            </p>
                            <p className="text-sm text-muted-foreground truncate">
                              {tx.startupId}
                            </p>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-black text-sm">Amount</p>
                          <p className="font-medium">{tx.amount} ETH</p>
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-black text-sm">
                            Recipient
                          </p>
                          <p className="font-mono font-medium text-sm truncate">
                            {tx.recipient?.length > 16
                              ? `${tx.recipient.substring(
                                  0,
                                  6
                                )}...${tx.recipient.substring(
                                  tx.recipient.length - 4
                                )}`
                              : tx.recipient}
                          </p>
                        </div>

                        <div className="flex-shrink-0">
                          <a
                            href={tx.ipfsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="outline" size="sm">
                              <FileText className="mr-2 h-4 w-4" />
                              View Proof
                            </Button>
                          </a>
                        </div>
                      </div>
                    ))}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-4 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={page === 1}
                          onClick={() => setPage(page - 1)}
                        >
                          &larr; Prev
                        </Button>
                        <span>
                          Page {page} of {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={page === totalPages}
                          onClick={() => setPage(page + 1)}
                        >
                          Next &rarr;
                        </Button>
                      </div>
                    )}
                  </>
                )}
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
              <div className="space-y-6">active investoers</div>
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
                <p className="text-muted-foreground">
                  No exited investments yet
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
