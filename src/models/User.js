// src/models/User.js
import mongoose, { models, model, Schema } from 'mongoose'

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['investor', 'startup'], required: true },
    createdAt: { type: Date, default: Date.now },
  })
  
  // ✅ Safe model export
  export default mongoose.models?.User || mongoose.model('User', UserSchema)
  
