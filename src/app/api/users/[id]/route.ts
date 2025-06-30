import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// ✅ Extract ID from context
function getIdFromParams(context: { params: { id?: string } }): string | null {
  return context?.params?.id ?? null;
}

// ✅ Auth middleware
async function requireAuth(): Promise<string | null> {
  const { userId } = await auth();
  return userId ?? null;
}

// ✅ GET user by ID
export async function GET(request: Request, context: { params: { id: string } }) {
  const userId = await requireAuth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const id = getIdFromParams(context);
  if (!id) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  const user = await User.findOne({ clerkId: id });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ data: user }, { status: 200 });
}

// ✅ DELETE user by ID
export async function DELETE(request: Request, context: { params: { id: string } }) {
  const userId = await requireAuth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const id = getIdFromParams(context);
  if (!id) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  if (userId !== id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const deletedUser = await User.findOneAndDelete({ clerkId: id });
  if (!deletedUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}

// ✅ POST to update user by ID
export async function POST(request: Request, context: { params: { id: string } }) {
  const userId = await requireAuth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const id = getIdFromParams(context);
  if (!id) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  if (userId !== id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();

  // ✅ Only allow updating these fields
  const allowedFields = ["email", "name", "image"];
  const updateData: Record<string, string> = {};
  for (const field of allowedFields) {
    if (field in body) {
      updateData[field] = body[field];
    }
  }

  const updatedUser = await User.findOneAndUpdate(
    { clerkId: id },
    { $set: updateData },
    { new: true }
  );

  if (!updatedUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ data: updatedUser }, { status: 200 });
}
