import mongoose, { Schema, Document, Types } from 'mongoose';
import { IMessage } from './Message';

export interface IChat extends Document {
  userId: string;
  title: string;
  messages: Types.ObjectId[] | IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new Schema<IChat>(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  },
  {
    timestamps: true,
  }
);

// Create indexes
ChatSchema.index({ userId: 1, updatedAt: -1 });

const Chat = mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema);

export default Chat; 