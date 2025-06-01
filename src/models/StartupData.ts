import mongoose, { Model, Document, Schema, Types } from "mongoose";

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
  founderUserId: Types.ObjectId;
      founderLinkedIn?: string;
  cofounderName?: string;
  cofounderEmail?: string;
  cofounderLinkedin?: string;
  pitchDeck?: string;
  walletAddress?: string;
  imageUrl?: string; // Optional field for image URL
  messages: IMessage[];
  currentInvestors: {
    investorId: string;
    name: string;
    email: string;
    amount: number;
    walletAddress: string;
    date: Date;
  }[];
}
const MessageSchema = new Schema<IMessage>({
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
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
  // src/models/StartupData.ts
founderUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  founderLinkedIn: String,
  cofounderName: String,
  cofounderEmail: String,
  cofounderLinkedin: String,
  imageUrl: { type: String, default: "" }, // Optional field for image URL
  walletAddress: { type: String },
  pitchDeck: { type: String, required: true },

  messages: [MessageSchema],
  currentInvestors: [
    {
      investorId: String,
      name: String,
      email: String,
      amount: Number,
      walletAddress: String,
      date: { type: Date, default: Date.now }
    }
  ]
});

// Create and export the model
// export const StartupData =
//   mongoose.models.StartupData ||
//   mongoose.model<IStartup>("StartupData", StartupSchema);


const StartupData = (mongoose.models.StartupData as Model<IStartup>) ||
                    mongoose.model<IStartup>('StartupData', StartupSchema);

export default StartupData;