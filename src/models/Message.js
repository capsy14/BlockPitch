import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Sender's user ID
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Recipient's user ID
  content: { type: String, required: true }, // Message content
  timestamp: { type: Date, default: Date.now }, // When the message was sent
});

export default mongoose.models.Message || mongoose.model("Message", messageSchema);