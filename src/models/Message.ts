import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IMessage extends Document {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tokenUsage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

const MessageSchema = new Schema<IMessage>({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  tokenUsage: {
    promptTokens: Number,
    completionTokens: Number,
    totalTokens: Number,
  },
});

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema); 