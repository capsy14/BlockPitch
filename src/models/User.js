// src/models/User.js
import mongoose, { models, model, Schema } from 'mongoose'

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['investor', 'startup'], required: true },
  createdAt: { type: Date, default: Date.now },

  // ➕ New fields for investors
  investedStartups: [{
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup' },  // Reference to the Startup model
    startupName: { type: String },  // Reference to the Startup model

    investedAmount: { type: Number, default: 0 } // The amount invested in that specific startup
  }],
  totalInvestedAmount: { type: Number, default: 0 },
  investmentContracts: [{ type: String }], // Stores IPFS hashes
})

// ✅ Safe model export
export default mongoose.models?.User || mongoose.model('User', UserSchema)
