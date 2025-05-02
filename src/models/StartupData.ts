import mongoose, { Document, Schema } from "mongoose";


export interface IMessage {
  sender: string; // Email of the sender
  recipient: string; // Email of the recipient
  content: string; // Message content
  timestamp: Date; // When the message was sent
}
// Define the TypeScript interface for the Startup data
export interface IStartup extends Document {
  startupName: string;
  description?: string;
  industry?: string;
  location?: string;
  problem?: string;
  solution?: string;
  founderName?: string;
  founderEmail?: string;
  founderLinkedIn?: string;
  cofounderName?: string;
  cofounderEmail?: string;
  cofounderLinkedin?: string;
  messages: IMessage[];
}
const MessageSchema = new Schema<IMessage>({
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
// Define the schema
const StartupSchema = new Schema<IStartup>({
  startupName: { type: String, required: true },
  description: String,
  industry: String,
  location: String,
  problem: String,
  solution: String,
  founderName: String,
  founderEmail: { type: String, required: true },
  founderLinkedIn: String,
  cofounderName: String,
  cofounderEmail: String,
  cofounderLinkedin: String,
  messages: [MessageSchema],
});

// Create and export the model
export const StartupData =
  mongoose.models.StartupData || mongoose.model<IStartup>("StartupData", StartupSchema);
