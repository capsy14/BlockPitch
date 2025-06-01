import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Message from "@/models/Message";
import StartupData from "@/models/StartupData";
import mongoose from "mongoose";

export async function GET(req) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const senderId = searchParams.get("senderId");
  if (!senderId) return NextResponse.json({ startups: [] });

  const senderObjId = new mongoose.Types.ObjectId(senderId);

  // Find unique recipients (founderUserId) the investor has messaged
  const recentStartups = await Message.aggregate([
    { $match: { sender: senderObjId } },
    { $sort: { timestamp: -1 } },
    {
      $group: {
        _id: "$recipient",
        lastMessageAt: { $first: "$timestamp" }
      }
    },
    { $sort: { lastMessageAt: -1 } }
  ]);

  const startupFounderIds = recentStartups.map(i => i._id);

  // Fetch startup details by founderUserId
  const startups = await StartupData.find(
    { founderUserId: { $in: startupFounderIds } },
    "startupName founderName founderEmail founderUserId _id"
  );

  // Attach lastMessageAt to each startup
  const startupsWithLastMessage = startups.map(st => {
    const match = recentStartups.find(i => String(i._id) === String(st.founderUserId));
    return {
      ...st.toObject(),
      lastMessageAt: match?.lastMessageAt
    };
  });

  return NextResponse.json({ startups: startupsWithLastMessage });
}