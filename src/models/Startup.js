// src/models/Startup.js
import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Pitch material schema
const pitchMaterialSchema = new Schema({
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ["PDF", "Spreadsheet", "Video", "Other"],
    required: true
  },
  lastUpdated: { type: Date, required: true }
});

// Founder schema
const founderSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  linkedIn: { type: String }
});

// Startup schema with UUID as _id
const startupSchema = new Schema(
  {
    _id: {
      type: String, // Change from ObjectId to String
      default: uuidv4, // Use UUID v4 as the default value
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fundsRaised: { type: Number, default: 0 },
    targetFund: { type: Number, default: 0 },
    totalInvestors: { type: Number, default: 0 },
    investorGrowthThisMonth: { type: Number, default: 0 },
    pitchViews: { type: Number, default: 0 },
    founders: [founderSchema],
    pitchMaterials: [pitchMaterialSchema],
    investors: [
      {
        investorEmail: { type: String, required: true },
        investedAmount: { type: Number, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
    _id: false, // Ensure Mongoose does not auto-generate an ObjectId
  }
);

export default mongoose.models?.Startup ||
  mongoose.model("Startup", startupSchema);
