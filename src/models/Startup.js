// src/models/Startup.js
import mongoose, { Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

// Pitch material schema
const pitchMaterialSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['PDF', 'Spreadsheet', 'Video', 'Other'], required: true },
  lastUpdated: { type: Date, required: true }
});

// Startup schema with UUID as _id
const startupSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4  // 👈 generates a UUID v4
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fundsRaised: { type: Number, default: 0 },
  targetFund: { type: Number, default: 0 },
  totalInvestors: { type: Number, default: 0 },
  investorGrowthThisMonth: { type: Number, default: 0 },
  pitchViews: { type: Number, default: 0 },
  founders: [{ type: String }],
  pitchMaterials: [pitchMaterialSchema],

  investors: [{
    investorEmail: { type: String, required: true }, // Investor's email
    investedAmount: { type: Number, default: 0 } // The amount invested by the investor
  }]
}, {
  timestamps: true,
  _id: false // 👈 tells Mongoose not to auto-create _id
})

export default mongoose.models?.Startup || mongoose.model('Startup', startupSchema)
