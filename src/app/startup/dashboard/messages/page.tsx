// // pages/investor/dashboard/messages/page.tsx
// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { getSocket } from '@/lib/socket'
// import { useRouter } from 'next/navigation'
// import { getSession } from 'next-auth/react'

// interface Message { from: string; to: string; content: string; createdAt: string }

// export default function InvestorChatPage() {
//   const router = useRouter()
//   const { searchParams } = new URL(window.location.href)
//   const toEmail = searchParams.get('toEmail')!
//   const toName  = searchParams.get('toName')!

//   const [me, setMe] = useState<string>('')
//   const [messages, setMessages] = useState<Message[]>([])
//   const [draft, setDraft] = useState('')
//   const roomRef = useRef<string>('')

//   useEffect(() => {
//     getSession().then(s => {
//       if (s?.user?.email) {
//         setMe(s.user.email)
//       }
//     })
//   }, [])

//   useEffect(() => {
//     if (!me) return
//     const room = [me, toEmail].sort().join('#')
//     roomRef.current = room

//     const sock = getSocket()
//     sock.emit('joinRoom', { room })

//     sock.on('newMessage', (msg: Message) => {
//       setMessages(prev => [...prev, msg])
//     })

//     // load history
//     fetch(`/api/messages?with=${encodeURIComponent(toEmail)}`)
//       .then(r => r.json())
//       .then((hist: Message[]) => setMessages(hist))
//   }, [me])

//   const send = () => {
//     if (!draft.trim()) return
//     getSocket().emit('sendMessage', {
//       room: roomRef.current,
//       from: me,
//       to: toEmail,
//       content: draft.trim(),
//     })
//     setDraft('')
//   }

//   return (
//     <div>
//       <h1>Chat with {toName}</h1>
//       <div className="max-h-[60vh] overflow-auto space-y-2 my-4">
//         {messages.map((m,i) => (
//           <div
//             key={i}
//             className={`max-w-xs p-2 rounded ${
//               m.from === me ? 'ml-auto bg-blue-100' : 'bg-gray-200'
//             }`}
//           >
//             {m.content}
//             <div className="text-xs text-right">
//               {new Date(m.createdAt).toLocaleTimeString()}
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="flex gap-2">
//         <input
//           className="flex-1 border rounded px-2"
//           value={draft}
//           onChange={e => setDraft(e.target.value)}
//         />
//         <button className="btn-primary" onClick={send}>Send</button>
//       </div>
//     </div>
//   )
// }
