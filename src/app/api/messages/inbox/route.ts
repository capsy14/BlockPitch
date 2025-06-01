import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Message from "@/models/Message";
import User from "@/models/User";
import mongoose from "mongoose";

export async function GET(req) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const recipientId = searchParams.get("recipientId");
  if (!recipientId) return NextResponse.json({ investors: [] });

  // Convert to ObjectId
  const recipientObjId = new mongoose.Types.ObjectId(recipientId);

  // Aggregate to get the most recent message per sender
  const recentInvestors = await Message.aggregate([
    { $match: { recipient: recipientObjId } },
    { $sort: { timestamp: -1 } },
    {
      $group: {
        _id: "$sender",
        lastMessageAt: { $first: "$timestamp" }
      }
    },
    { $sort: { lastMessageAt: -1 } }
  ]);

  const investorIds = recentInvestors.map(i => i._id);

  // Fetch investor details
  const investors = await User.find({ _id: { $in: investorIds } }, "name email _id");

  // Attach lastMessageAt to each investor
  const investorsWithLastMessage = investors.map(inv => {
    const match = recentInvestors.find(i => String(i._id) === String(inv._id));
    return {
      ...inv.toObject(),
      lastMessageAt: match?.lastMessageAt
    };
  });

  return NextResponse.json({ investors: investorsWithLastMessage });
}
