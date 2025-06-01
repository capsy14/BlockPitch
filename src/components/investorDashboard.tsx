// // "use client";
// // import { useAuth } from "@/context/AuthContext";
// // import { useSearchParams } from "next/navigation";
// // import { MessageChat } from "@/components/messageChat";
// // import Link from "next/link";
// // import Layout from "@/components/Layout";
// // import { useEffect, useState } from "react";

// // export default function InvestorChatPage() {
// //   const { user } = useAuth();
// //   const searchParams = useSearchParams();
// //   const recipientId = searchParams.get("recipientId");
// //   const [startup, setStartup] = useState<{ startupName: string; founderName: string; founderEmail: string } | null>(null);

// //   useEffect(() => {
// //     if (!recipientId) return;
// //     fetch(`/api/by-founder?founderUserId=${recipientId}`)
// //       .then(res => res.json())
// //       .then(data => setStartup(data.startup));
// //   }, [recipientId]);

// //   if (!user) return <div>Loading...</div>;
// //   if (!recipientId) return <div>No conversation selected.</div>;

// //   return (
// //     <Layout>
// //       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-50 flex flex-col items-center justify-center">
// //         <div className="w-full p-6 mx-auto">
// //           <div className="flex items-center justify-between mb-4">
// //             <h2 className="text-xl font-semibold">Chat</h2>
// //             <Link
// //               href="/investor/dashboard/messages"
// //               className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 text-sm font-medium"
// //             >
// //               Back to Conversations
// //             </Link>
// //           </div>
// //           {startup ? (
// //             <div className="mb-4 border-b pb-2">
// //               <div className="font-semibold text-lg">{startup.startupName}</div>
// //               <div className="text-gray-600 text-sm">
// //                 Founder: {startup.founderName} ({startup.founderEmail})
// //               </div>
// //             </div>
// //           ) : (
// //             <div className="mb-4 border-b pb-2 animate-pulse h-10 bg-gray-100 rounded" />
// //           )}
// //           <MessageChat sender={user.id} recipient={recipientId} />
// //         </div>
// //       </div>
// //     </Layout>
// //   );
// // }


// "use client";
// import { useAuth } from "@/context/AuthContext";
// import { useSearchParams } from "next/navigation";
// import { MessageChat } from "@/components/messageChat";
// import Link from "next/link";
// import Layout from "@/components/Layout";
// import { useEffect, useState } from "react";

// export default function InvestorChatPage() {
//   const { user } = useAuth();
//   const searchParams = useSearchParams();
//   const recipientId = searchParams.get("recipientId");
//   const [startup, setStartup] = useState<{ startupName: string; founderName: string; founderEmail: string } | null>(null);

//   useEffect(() => {
//     if (!recipientId) return;
//     fetch(`/api/by-founder?founderUserId=${recipientId}`)
//       .then(res => res.json())
//       .then(data => setStartup(data.startup));
//   }, [recipientId]);

//   if (!user) return <div>Loading...</div>;
//   if (!recipientId) return <div>No conversation selected.</div>;

//   return (
//    <>   
//       <div className="min-h-screen  p-6 flex flex-col bg-gradient-to-br from-slate-50 to-slate-50 ">
//         {/* Header */}
    
//         <div className="w-full px-6 py-4 border-b-slate-700 h-[] bg-white/80 flex items-center justify-between">
//           <div>
//             <h2 className="text-xl font-semibold">Chat</h2>
//             {startup ? (
//               <div>
//                 <div className="font-semibold text-lg">{startup.startupName}</div>
//                 <div className="text-gray-600 text-sm">
//                   Founder: {startup.founderName} ({startup.founderEmail})
//                 </div>
//               </div>
//             ) : (
//               <div className="animate-pulse h-8 bg-gray-100 rounded w-48 mt-2" />
//             )}
//           </div>
//           <Link
//             href="/investor/dashboard/messages"
//             className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 text-sm font-medium"
//           >
//             Back to Conversations
//           </Link>
//         </div>
//         {/* Chat Area */}
//         <div className="flex-1 flex flex-col">
//           <MessageChat sender={user.id} recipient={recipientId} />
//         </div>
//       </div>
//     </>
//   );
// }


"use client"
import { useAuth } from "@/context/AuthContext"
import { useSearchParams } from "next/navigation"
import { MessageChat } from "@/components/messageChat"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowLeft, User } from "lucide-react"

export default function InvestorChatPage() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const recipientId = searchParams.get("recipientId")
  const [startup, setStartup] = useState<{ startupName: string; founderName: string; founderEmail: string } | null>(
    null,
  )

  useEffect(() => {
    if (!recipientId) return
    fetch(`/api/by-founder?founderUserId=${recipientId}`)
      .then((res) => res.json())
      .then((data) => setStartup(data.startup))
  }, [recipientId])

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-slate-600 text-lg">Loading...</div>
      </div>
    )
  }

  if (!recipientId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-slate-600 text-lg mb-4">No conversation selected.</div>
          <Link
            href="/investor/dashboard/messages"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Messages
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[50vh] bottom-2  max-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/investor/dashboard/messages"
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
                  {startup ? (
                    <>
                      <h1 className="text-lg font-semibold text-slate-900">{startup.startupName}</h1>
                      <p className="text-sm text-slate-600">
                        {startup.founderName} • {startup.founderEmail}
                      </p>
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
          <MessageChat sender={user.id} recipient={recipientId} />
        </div>
      </main>
    </div>
  )
}
