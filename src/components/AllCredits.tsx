// import { Card } from '@tremor/react'
// import React from 'react'

// interface AllCreditsProps {
//   allTransactions: Array<{
//     startupName: string;
//     name: string;
//     email: string;
//     amount: number;
//     walletAddress: string;
//     date: string | Date;
//   }>;
// }

// const AllCredits: React.FC<AllCreditsProps> = ({ allTransactions }) => {
//   return (
//     <div>
//       {/* All Transactions Table */}
//       <Card className="p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-medium">All Investor Transactions</h3>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b">
//                 <th className="text-left py-3 px-2">Startup Name</th>
//                 <th className="text-left py-3 px-2">Investor Name</th>
//                 <th className="text-left py-3 px-2">Email</th>
//                 <th className="text-left py-3 px-2">Amount (ETH)</th>
//                 <th className="text-left py-3 px-2">Wallet Address</th>
//                 <th className="text-left py-3 px-2">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {allTransactions.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="text-center py-4 text-muted-foreground">
//                     No transactions yet.
//                   </td>
//                 </tr>
//               ) : (
//                 allTransactions.map((tx, i) => (
//                   <tr key={i} className="border-b">
//                     <td className="py-3 px-2">{tx.startupName}</td>
//                     <td className="py-3 px-2">{tx.name}</td>
//                     <td className="py-3 px-2">{tx.email}</td>
//                     <td className="py-3 px-2">{tx.amount}</td>
//                     <td className="py-3 px-2 font-mono">{tx.walletAddress}</td>
//                     <td className="py-3 px-2">{new Date(tx.date).toLocaleDateString()}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </Card>
//     </div>
//   )
// }

// export default AllCredits

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Building2, User, Mail, Wallet, Calendar, TrendingUp, Database } from "lucide-react"
import type React from "react"

interface AllCreditsProps {
  allTransactions: Array<{
    startupName: string
    name: string
    email: string
    amount: number
    walletAddress: string
    date: string | Date
  }>
}

const AllCredits: React.FC<AllCreditsProps> = ({ allTransactions }) => {
  const totalAmount = allTransactions.reduce((sum, tx) => sum + tx.amount, 0)
  const totalInvestors = new Set(allTransactions.map((tx) => tx.email)).size

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Volume</p>
                <p className="text-2xl font-bold">{totalAmount.toFixed(9)} ETH</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unique Investors</p>
                <p className="text-2xl font-bold">{totalInvestors}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Database className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
                <p className="text-2xl font-bold">{allTransactions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Transactions Table */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Building2 className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-slate-800">All Investor Transactions</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Complete overview of all investment activities</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {allTransactions.length} Records
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {allTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="p-4 bg-slate-100 rounded-full mb-4">
                <Database className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No transactions yet</h3>
              <p className="text-muted-foreground text-center max-w-sm">
                When investors start funding startups, their transactions will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left py-4 px-6 font-semibold text-slate-700">
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4" />
                        <span>Startup</span>
                      </div>
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Investor</span>
                      </div>
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>Contact</span>
                      </div>
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4" />
                        <span>Amount</span>
                      </div>
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700">
                      <div className="flex items-center space-x-2">
                        <Wallet className="h-4 w-4" />
                        <span>Wallet</span>
                      </div>
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Date</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allTransactions.map((tx, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors duration-200"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600">
                            <AvatarFallback className="text-white text-xs font-semibold">
                              {tx.startupName.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-slate-900">{tx.startupName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8 bg-gradient-to-br from-green-500 to-teal-600">
                            <AvatarFallback className="text-white text-xs font-semibold">
                              {getInitials(tx.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-slate-900">{tx.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <div className="p-1 bg-slate-100 rounded">
                            <Mail className="h-3 w-3 text-slate-500" />
                          </div>
                          <span className="text-slate-600 text-sm">{tx.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className="bg-green-50 border-green-200 text-green-800 font-semibold"
                          >
                            {tx.amount} ETH
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <div className="p-1 bg-slate-100 rounded">
                            <Wallet className="h-3 w-3 text-slate-500" />
                          </div>
                          <code className="text-xs bg-slate-100 px-2 py-1 rounded font-mono text-slate-700">
                            {formatWalletAddress(tx.walletAddress)}
                          </code>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <div className="p-1 bg-slate-100 rounded">
                            <Calendar className="h-3 w-3 text-slate-500" />
                          </div>
                          <span className="text-slate-600 text-sm">
                            {new Date(tx.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AllCredits;
