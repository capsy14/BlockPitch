"use client";

import { useEffect, useState, useRef, KeyboardEvent } from "react";
import axios from "axios";
import { Send, CheckCheck, Loader2 } from "lucide-react";

export function MessageChat({ sender, recipient }: { sender: string; recipient: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  // Fetch messages every 2 seconds
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/messages?user1=${sender}&user2=${recipient}`);
        setMessages(res.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [sender, recipient]);

  // Send a new message
  const sendMessage = async () => {
    if (!input.trim()) return;
    setIsSending(true);
    try {
      await axios.post("/api/messages", {
        sender,
        recipient,
        content: input,
      });
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  // Send on Enter (no shift)
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Ref to auto-scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Whenever messages change, scroll to bottom if already near bottom
  useEffect(() => {
    const container = messagesEndRef.current?.parentElement;
    if (!container) return;

    // If user is within 50px of bottom, auto scroll
    const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 50;
    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    // A flex-column that fills the entire viewport
    <div className="flex flex-col  max-h-screen h-[75vh] pt-6 bg-white">
      {/* =========================
            1) Messages Area (scrollable)
         ========================= */}
      <div className="flex-1 overflow-y-auto  space-y-2 p-4 mb-1 pr-2">
        {isLoading && messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-6 w-6 text-slate-400 animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-slate-400 text-sm">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m._id}
              className={`flex ${m.sender === sender ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                  m.sender === sender
                    ? "bg-slate-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
              >
                {m.content}
                <div className="text-xs mt-1 text-right flex items-center justify-end gap-1">
                  <span className={m.sender === sender ? "text-slate-300" : "text-gray-400"}>
                    {new Date(m.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {m.sender === sender && <CheckCheck className="h-3 w-3 text-slate-300" />}
                </div>
              </div>
            </div>
          ))
        )}
        {/* Dummy div for auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* =========================
            2) Send Area (fixed at bottom)
         ========================= */}
      <div className="p-3 border-t bg-white">
        <div className="flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message"
            disabled={isSending}
            className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
          <button
            onClick={sendMessage}
            disabled={isSending || !input.trim()}
            className="bg-slate-600 text-white px-3 py-2 rounded-r-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
