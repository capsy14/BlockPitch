// // src/models/User.js
// import mongoose, { Schema } from 'mongoose'

// const messageSchema = new Schema({
//   sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Sender's user ID
//   recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Recipient's user ID
//   content: { type: String, required: true }, // Message content
//   timestamp: { type: Date, default: Date.now }, // When the message was sent
// });


// const UserSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['investor', 'startup'], required: true },
//   // 
//   messages: [messageSchema],
//   // 

//   createdAt: { type: Date, default: Date.now },

//   // ➕ New fields for investors
//   investedStartups: [{
//     // startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup' },

//     startup: { type: String, ref: 'Startup' },
//       // Reference to the Startup model
//     startupName: { type: String },  // Reference to the Startup model

//     investedAmount: { type: Number, default: 0 } // The amount invested in that specific startup
//   }],
//   totalInvestedAmount: { type: Number, default: 0 },
//   investmentContracts: [{ type: String }], // Stores IPFS hashes
// })

// // ✅ Safe model export
// export default mongoose.models?.User || mongoose.model('User', UserSchema)

import mongoose, { Schema, Model, HydratedDocument } from 'mongoose';

// 1. Define subdocument interface for messages
export interface IMessage {
  sender: mongoose.Types.ObjectId;  // Reference to User._id
  recipient: mongoose.Types.ObjectId;
  content: string;
  timestamp: Date;
}

// 2. Define interface for invested startup entries
export interface IInvestedStartup {
  startup: mongoose.Types.ObjectId;
  startupName?: string;
  investedAmount: number;
}

// 3. Define the main User interface (plain object fields)
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'investor' | 'startup';
  messages: IMessage[];
  createdAt: Date;
  investedStartups: IInvestedStartup[];
  totalInvestedAmount: number;
  investmentContracts: string[];
}

// 4. Mongoose document type (hydrated)
export type UserDocument = HydratedDocument<IUser>;

// 5. Message sub-schema
const messageSchema = new Schema<IMessage>(
  {
    sender:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content:   { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

// 6. Invested startup sub-schema
const investedStartupSchema = new Schema<IInvestedStartup>(
  {
    startup:         { type: Schema.Types.ObjectId, ref: 'Startup', required: true },
    startupName:     { type: String },
    investedAmount:  { type: Number, default: 0 },
  },
  { _id: false }
);

// 7. Define the User schema
const UserSchema = new Schema<IUser>(
  {
    name:                  { type: String, required: true },
    email:                 { type: String, required: true, unique: true },
    password:              { type: String, required: true },
    role:                  { type: String, enum: ['investor', 'startup'], required: true },
    messages:              { type: [messageSchema], default: [] },
    createdAt:             { type: Date, default: Date.now },
    investedStartups:      { type: [investedStartupSchema], default: [] },
    totalInvestedAmount:   { type: Number, default: 0 },
    investmentContracts:   { type: [String], default: [] },
  },
  { timestamps: false }
);

// 8. Export a typed model
const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>('User', UserSchema);

export default User;
