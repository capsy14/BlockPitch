import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Startup from "@/models/Startup";

export async function GET() {
  try {
    await connectToDatabase();
    const startups = await Startup.find({});
    return NextResponse.json({ startups });
  } catch (error) {
    console.error("Error fetching startups:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
