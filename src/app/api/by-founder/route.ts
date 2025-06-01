import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import StartupData from "@/models/StartupData";

export async function GET(req: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const founderUserId = searchParams.get("founderUserId");
  if (!founderUserId) {
    return NextResponse.json({ startup: null }, { status: 400 });
  }

  const startup = await StartupData.findOne({ founderUserId });
  return NextResponse.json({ startup });
}