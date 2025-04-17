"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Phone, Video, MoreVertical } from "lucide-react"

// Sample data for conversations
const conversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hey, are we still meeting today?",
    time: "10:30 AM",
    unread: 2,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I sent you the files you requested",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for your help!",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 4,
    name: "Team Project",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "David: Let's schedule a call",
    time: "Monday",
    unread: 0,
  },
]

// Sample messages for a conversation
const sampleMessages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    content: "Hey there! How's your project coming along?",
    time: "10:15 AM",
    isSelf: false,
  },
  {
    id: 2,
    sender: "You",
    content: "It's going well! I'm just finishing up the last few tasks.",
    time: "10:18 AM",
    isSelf: true,
  },
  {
    id: 3,
    sender: "Sarah Johnson",
    content: "That's great to hear! Do you think you'll be done by tomorrow?",
    time: "10:20 AM",
    isSelf: false,
  },
  {
    id: 4,
    sender: "You",
    content: "Yes, I should be able to submit everything by end of day tomorrow.",
    time: "10:22 AM",
    isSelf: true,
  },
  {
    id: 5,
    sender: "Sarah Johnson",
    content: "Perfect! Let me know if you need any help or have questions.",
    time: "10:25 AM",
    isSelf: false,
  },
  {
    id: 6,
    sender: "Sarah Johnson",
    content: "Hey, are we still meeting today?",
    time: "10:30 AM",
    isSelf: false,
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [messages, setMessages] = useState(sampleMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    const message = {
      id: messages.length + 1,
      sender: "You",
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isSelf: true,
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar with conversations */}
      <div className="w-full max-w-xs border-r bg-white">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Messages</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-64px)]">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 ${
                selectedConversation.id === conversation.id ? "bg-gray-100" : ""
              }`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <Avatar>
                <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium truncate">{conversation.name}</h3>
                  <span className="text-xs text-gray-500">{conversation.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
              </div>
              {conversation.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                  {conversation.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="p-4 border-b bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} alt={selectedConversation.name} />
              <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="font-bold">{selectedConversation.name}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isSelf ? "justify-end" : "justify-start"}`}>
                <div className="flex gap-2 max-w-[70%]">
                  {!message.isSelf && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} alt={message.sender} />
                      <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <Card className={`border-0 ${message.isSelf ? "bg-blue-500 text-white" : "bg-white"}`}>
                      <CardContent className="p-3">
                        <p>{message.content}</p>
                      </CardContent>
                    </Card>
                    <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message input */}
        <div className="p-4 border-t bg-white">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
