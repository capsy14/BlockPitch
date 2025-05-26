import mongoose, { Schema, Model, HydratedDocument } from 'mongoose';

// 1. TypeScript interface for a Message
export interface IMessage {
  sender: mongoose.Types.ObjectId;   // Reference to User._id
  recipient: mongoose.Types.ObjectId;// Reference to User._id
  content: string;
  timestamp: Date;
}

// 2. Hydrated document type
export type MessageDocument = HydratedDocument<IMessage>;

// 3. Define the Message schema
const MessageSchema = new Schema<IMessage>(
  {
    sender:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content:   { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

// 4. Create & export a typed model
const MessageModel: Model<IMessage> =
  (mongoose.models.Message as Model<IMessage>) ||
  mongoose.model<IMessage>('Message', MessageSchema);

export default MessageModel;