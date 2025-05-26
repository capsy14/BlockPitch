// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/db";
// import Message from "@/models/Message";
// import User from "@/models/User";

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { senderId, recipientId, content } = body;

//     if (!senderId || !recipientId || !content) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     await connectToDatabase();

//     // Check if a chat already exists between the sender and recipient
//     const existingMessages = await Message.find({
//       $or: [
//         { sender: senderId, recipient: recipientId },
//         { sender: recipientId, recipient: senderId },
//       ],
//     });

//     // Create a new message
//     const message = await Message.create({
//       sender: senderId,
//       recipient: recipientId,
//       content,
//     });

//     return NextResponse.json({
//       message: "Message sent successfully",
//       data: message,
//       chatExists: existingMessages.length > 0,
//     });
//   } catch (error) {
//     console.error("Error sending message:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const userId = searchParams.get("userId");
//   const recipientId = searchParams.get("recipientId");

//   if (!userId || !recipientId) {
//     return NextResponse.json({ error: "User ID and Recipient ID are required" }, { status: 400 });
//   }

//   await connectToDatabase();

//   // Fetch messages between the two users
//   const messages = await Message.find({
//     $or: [
//       { sender: userId, recipient: recipientId },
//       { sender: recipientId, recipient: userId },
//     ],
//   }).sort({ timestamp: 1 }); // Sort messages by timestamp

//   return NextResponse.json({ messages });
// }
