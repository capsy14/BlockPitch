"use client";

import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { MessageChat } from "@/components/messageChat";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, User } from "lucide-react";
import Layout from "@/components/Layout";
export default function ChatPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const otherUserId = searchParams.get("recipientId");
  const [investor, setInvestor] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    if (!otherUserId) return;
    fetch(`/api/investor/by-id?id=${otherUserId}`)
      .then((res) => res.json())
      .then((data) => setInvestor(data.investor));
  }, [otherUserId]);

  // While the auth state is resolving
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-slate-600 text-lg">Loading...</div>
      </div>
    );
  }

  // If no recipientId in query string
  if (!otherUserId) {
    return (
      <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-slate-600 text-lg mb-4">No conversation selected.</div>
          <Link
            href="/startup/dashboard/messages"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Messages
          </Link>
        </div>
      </div>
    );
  }

  // Main chat UI
  return (
     <Layout>
    <div className="h-[50vh] max-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/startup/dashboard/messages"
                className="inline-flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back</span>
              </Link>

              <div className="h-8 w-px bg-slate-200" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  {investor ? (
                    <>
                      <h1 className="text-lg font-semibold text-slate-900">{investor.name}</h1>
                      <p className="text-sm text-slate-600">{investor.email}</p>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div className="h-5 bg-slate-200 rounded animate-pulse w-32" />
                      <div className="h-4 bg-slate-200 rounded animate-pulse w-48" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-slate-600">Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col min-h-0 bg-slate-50/50">
        <div className="flex-1 flex flex-col">
          <MessageChat sender={user.id} recipient={otherUserId} />
        </div>
      </main>
    </div>
   </Layout>
  );
}
