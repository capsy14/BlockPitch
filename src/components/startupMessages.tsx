// "use client";
// import React, { useEffect, useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// import Link from "next/link";

// type Investor = { _id: string; name: string; email: string };

// const StartupMessagesPage = () => {
//   const { user } = useAuth();
//   const [investors, setInvestors] = useState<Investor[]>([]);

//   useEffect(() => {
//     if (!user) return;
//     fetch(`/api/messages/inbox?recipientId=${user.id}`)
//       .then(res => res.json())
//       .then(data => setInvestors(data.investors));
//   }, [user]);

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>Inbox</h2>
   
//       {investors.length === 0 && <div>No messages yet.</div>}
//       <ul>
//         {investors.map(investor => (
//           <li key={investor._id}>
//             <Link href={`/startup/dashboard/messages/chat?recipientId=${investor._id}`}>
//               Message from {investor.name} ({investor.email})
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StartupMessagesPage;

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { Inbox, User, Mail, MessageSquare, Search, RefreshCw, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

type Investor = {
  _id: string
  name: string
  email: string
  unreadCount?: number
  lastMessage?: string
  lastMessageTime?: string
}

export default function StartupMessagesPage() {
  const { user } = useAuth()
  const [investors, setInvestors] = useState<Investor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchMessages = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      const res = await fetch(`/api/messages/inbox?recipientId=${user.id}`)
      const data = await res.json()

      // Enhance the data with mock unread counts and last messages for UI
      const enhancedData = data.investors.map((investor: Investor) => ({
        ...investor,
        unreadCount: Math.floor(Math.random() * 3), // Mock data
        lastMessage: "Let's discuss your startup...", // Mock data
        lastMessageTime: "2h ago", // Mock data
      }))

      setInvestors(enhancedData)
    } catch (error) {
      console.error("Failed to fetch messages:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [user])

  const filteredInvestors = investors.filter(
    (investor) =>
      investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investor.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      <div className="bg-slate-100 dark:bg-slate-800 p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Inbox className="h-6 w-6 text-slate-700 dark:text-slate-300" />
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Message Inbox</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input
                placeholder="Search messages..."
                className="pl-9 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={fetchMessages}
              className="border-slate-300 dark:border-slate-600"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Refresh</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <Card className="border-slate-200 dark:border-slate-700 shadow-sm">
          <CardHeader className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6">
            <CardTitle className="text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              Investor Messages
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredInvestors.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
                  <AlertCircle className="h-8 w-8 text-slate-500 dark:text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-1">No messages yet</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                  When investors reach out to you, their messages will appear here.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredInvestors.map((investor) => (
                  <li key={investor._id}>
                    <Link
                      href={`/startup/dashboard/messages/chat?recipientId=${investor._id}`}
                      className="flex items-center gap-4 p-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="bg-slate-200 dark:bg-slate-700 h-12 w-12 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-slate-600 dark:text-slate-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-medium text-slate-800 dark:text-slate-100 truncate">{investor.name}</h3>
                          <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                            {investor.lastMessageTime}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-slate-600 dark:text-slate-300 truncate">
                            <Mail className="inline h-3 w-3 mr-1" />
                            {investor.email}
                          </p>
                          {investor.unreadCount ? (
                            <Badge variant="default" className="bg-slate-700 hover:bg-slate-800">
                              {investor.unreadCount} new
                            </Badge>
                          ) : null}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
