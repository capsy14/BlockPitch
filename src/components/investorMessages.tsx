"use client";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { MessageChat } from "@/components/messageChat";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  MessageCircle,
  User,
  Mail,
  Clock,
  Users
} from "lucide-react";

type Startup = {
  _id: string;
  startupName: string;
  founderName: string;
  founderEmail: string;
  founderUserId: string;
  lastMessageAt?: string;
};

export default function MessagesPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const recipientId = searchParams.get("recipientId");
  const [startups, setStartups] = useState<Startup[]>([]);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/messages/sent?senderId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setStartups(data.startups));
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600"></div>
          <p className="text-slate-600 font-medium">Loading your messages...</p>
        </div>
      </div>
    );
  }

  console.log("startups", startups, "recipientId", recipientId);

  return ( // min-h-screen 
    <div className="bg-gradient-to-br">
      {/* <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8"> */}
      {recipientId ? (
        // Chat View
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {(() => {
            const currentStartup = startups.find(
              (s) => s.founderUserId === recipientId
            );
            if (!currentStartup) {
              return (
                <div className="p-6 border-b border-slate-200/60 animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-slate-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-slate-200 rounded w-1/3 mb-2"></div>
                      <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div className="bg-gradient-to-r from-slate-600 to-slate-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">
                        {currentStartup.startupName}
                      </h1>
                      <div className="flex items-center space-x-2 text-slate-100">
                        <User className="h-4 w-4" />
                        <span className="text-sm">
                          {currentStartup.founderName}
                        </span>
                        <Mail className="h-4 w-4 ml-2" />
                        <span className="text-sm">
                          {currentStartup.founderEmail}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/investor/dashboard/messages"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 text-sm font-medium backdrop-blur-sm"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Conversations</span>
                  </Link>
                </div>
              </div>
            );
          })()}
          <div className="p-6">
            <MessageChat sender={user.id} recipient={recipientId} />
          </div>
        </div>
      ) : (
        // Conversations List View
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-slate-600 to-slate-600 rounded-2xl mb-4">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Your Conversations
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Connect with innovative startups and manage your investment
              conversations in one place.
            </p>
          </div>

          <div className="grid gap-6">
            {startups.length === 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No conversations yet
                </h3>
                <p className="text-slate-600 mb-6">
                  Start connecting with startups to begin your investment
                  journey.
                </p>
                <Link
                  href="/investor/dashboard"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-600 text-white rounded-lg hover:from-slate-700 hover:to-slate-700 transition-all duration-200 font-medium"
                >
                  Explore Startups
                </Link>
              </div>
            )}

            {startups.map((startup, index) => (
              <div
                key={startup._id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards"
                }}
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-slate-500 to-slate-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                          {startup.startupName.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-slate-600 transition-colors">
                          {startup.startupName}
                        </h3>
                        <div className="flex items-center space-x-4 text-slate-600 text-sm mb-2">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{startup.founderName}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Mail className="h-4 w-4" />
                            <span className="truncate">
                              {startup.founderEmail}
                            </span>
                          </div>
                        </div>
                        {startup.lastMessageAt && (
                          <div className="flex items-center space-x-1 text-xs text-slate-400">
                            <Clock className="h-3 w-3" />
                            <span>
                              Last message:{" "}
                              {new Date(startup.lastMessageAt).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {/* <Link
                          href={`/investor/dashboard/messages?recipientId=${startup.founderUserId}`}
                          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-600 text-white rounded-lg hover:from-slate-700 hover:to-slate-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>Open Chat</span>
                        </Link> */}
                      <Link
                        href={`/investor/dashboard/messages/chat?recipientId=${startup.founderUserId}`}
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-600 text-white rounded-lg hover:from-slate-700 hover:to-slate-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Open Chat</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-slate-500 to-slate-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* </div> */}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
