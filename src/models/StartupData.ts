import mongoose, { Document, Schema } from "mongoose";

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
}

// Define the schema
const StartupSchema = new Schema<IStartup>({
  startupName: { type: String, required: true },
  description: String,
  industry: String,
  location: String,
  problem: String,
  solution: String,
  founderName: String,
  founderEmail: String,
  founderLinkedIn: String,
  cofounderName: String,
  cofounderEmail: String,
  cofounderLinkedin: String,
});

// Create and export the model
export const StartupData =
  mongoose.models.StartupData || mongoose.model<IStartup>("StartupData", StartupSchema);
