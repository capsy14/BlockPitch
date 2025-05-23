import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { StartupData } from "@/models/StartupData";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    // Use cookies() from next/headers to get the auth_token
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "startup") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Find all startups where founderEmail matches user email
    const startups = await StartupData.find({ founderEmail: decoded.email });
    return NextResponse.json(startups);
  } catch (err) {
    console.error("Failed to fetch startups:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();

  // Auth check (optional but recommended)
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const decoded = verifyToken(token);

  // Only allow the founder to delete their own startup
  const startup = await StartupData.findById(params.id);
  if (!startup || startup.founderEmail !== decoded.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await (StartupData as any).findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}