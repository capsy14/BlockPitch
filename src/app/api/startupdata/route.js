import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import  StartupData  from "@/models/StartupData";

export async function GET(req) {
  try {
    await connectToDatabase()
    const token = req.cookies.get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }
    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "startup") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }
    // Fetch ALL startups for this founder
    const startups = await StartupData.find({ founderEmail: decoded.email });
    return NextResponse.json({ startups })
  } catch (err) {
    console.error("Failed to fetch startups:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
