"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
const socket = io("http://localhost:3000"); // Replace with your server URL

export default function StartupMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [recipientId, setRecipientId] = useState(""); // Set this dynamically based on the investor
  const [startupId, setStartupId] = useState(""); // Replace with logged-in startup's user ID

  useEffect(() => {
    // Fetch existing messages
    const fetchMessages = async () => {
      const res = await fetch(`/api/messages?userId=${startupId}`);
      const data = await res.json();
      setMessages(data.messages || []);
    };

    fetchMessages();

    // Listen for new messages
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [startupId]);

  const handleSendMessage = () => {
    const message = {
      senderId: startupId, // Replace with logged-in startup's user ID
      recipientId,
      content: newMessage,
    };

    // Send the message via Socket.IO
    socket.emit("sendMessage", message);

    // Optimistically update the UI
    setMessages((prevMessages) => [...prevMessages, { ...message, timestamp: new Date() }]);
    setNewMessage("");
  };

  return (
    <Layout>
    <div className="p-6">
      <h1 className="text-2xl font-bold">Messages</h1>
      <div className="mt-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded ${
              msg.senderId === startupId ? "bg-blue-200" : "bg-gray-200"
            }`}
          >
            <p>{msg.content}</p>
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
    </Layout>
  );
}
