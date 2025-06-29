import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  clerkId: string;
  email: string;
  name: string;
  image: string;
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: String,
    image: String,
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
