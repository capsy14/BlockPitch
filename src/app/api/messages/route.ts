import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Message from "@/models/Message";

export async function GET(req) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const user1 = new mongoose.Types.ObjectId(searchParams.get("user1"));
  const user2 = new mongoose.Types.ObjectId(searchParams.get("user2"));
  const messages = await Message.find({
    $or: [
      { sender: user1, recipient: user2 },
      { sender: user2, recipient: user1 },
    ],
  }).sort({ timestamp: 1 });
  return NextResponse.json({ messages });
}

export async function POST(req) {
  await connectToDatabase();
  const { sender, recipient, content } = await req.json();

  // Convert to ObjectId
  const senderId = new mongoose.Types.ObjectId(sender);
  const recipientId = new mongoose.Types.ObjectId(recipient);

  const message = await Message.create({ sender: senderId, recipient: recipientId, content });
  return NextResponse.json({ message });
}