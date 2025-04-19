import mongoose, { models, model, Schema } from 'mongoose'

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['investor', 'startup'], required: true },
  profileImage: { type: String },
  walletAddress: { type: String },
  bio: { type: String },
  preferredCategories: [{ type: String }],
  minInvestment: { type: Number },
  maxInvestment: { type: Number },
  portfolioURL: { type: String },
  linkedIn: { type: String },
  createdAt: { type: Date, default: Date.now },

  investedStartups: [{
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup' },
    startupName: { type: String },
    investedAmount: { type: Number, default: 0 }
  }],
  totalInvestedAmount: { type: Number, default: 0 },
  investmentContracts: [{ type: String }]
})

export default models?.User || model('User', UserSchema)
