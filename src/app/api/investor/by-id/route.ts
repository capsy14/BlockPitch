import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User"; // Use User, not Investor

export async function GET(req: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ investor: null }, { status: 400 });
  }

  // Find user by ID and ensure they are an investor
  const investor = await User.findById(id).select("name email role");
  if (!investor || investor.role !== "investor") {
    return NextResponse.json({ investor: null }, { status: 404 });
  }

  return NextResponse.json({ investor });
}