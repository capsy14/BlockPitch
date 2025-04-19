import mongoose, { Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const pitchMaterialSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['PDF', 'Spreadsheet', 'Video', 'Other'], required: true },
  lastUpdated: { type: Date, required: true }
})

const startupSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  foundersName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // ⬇️ Profile fields
  walletAddress: { type: String },
  description: { type: String },
  location: { type: String },
  category: { type: String },
  websiteLink: { type: String },
  targetFund: { type: Number },
  pitchDeckLink: { type: String },
  teamSize: { type: Number },
  founderLinkedIn: { type: String },
  phoneNumber: { type: String },

  // Existing logic
  fundsRaised: { type: Number, default: 0 },
  targetFund: { type: Number, default: 0 },
  totalInvestors: { type: Number, default: 0 },
  investorGrowthThisMonth: { type: Number, default: 0 },
  pitchViews: { type: Number, default: 0 },
  founders: [{ type: String }],
  pitchMaterials: [pitchMaterialSchema],
  investors: [{
    investorEmail: { type: String, required: true },
    investedAmount: { type: Number, default: 0 }
  }]
}, {
  timestamps: true,
  _id: false
})

export default mongoose.models?.Startup || mongoose.model('Startup', startupSchema)
