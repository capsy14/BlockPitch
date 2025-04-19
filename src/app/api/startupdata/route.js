import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import Startup from "@/models/Startup"

export async function GET(req) {
  try {
    await connectToDatabase()
    const token = req.cookies.get("auth_token")?.value

    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "startup") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const startup = await Startup.findOne({ email: decoded.email })
    if (!startup) return NextResponse.json({ error: "Startup not found" }, { status: 404 })

    return NextResponse.json({ startup })
  } catch (err) {
    console.error("Failed to fetch startup:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req) {
  try {
    await connectToDatabase()
    const token = req.cookies.get("auth_token")?.value
    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "startup") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const body = await req.json()
    const updatedStartup = await Startup.findOneAndUpdate(
      { email: decoded.email },
      {
        targetFund: body.targetFund,
        pitchDeckLink: body.pitchDeckLink,
        teamSize: body.teamSize,
        founderLinkedIn: body.founderLinkedIn,
        phoneNumber: body.phoneNumber,
        websiteLink: body.websiteLink,
      },
      { new: true }
    )

    return NextResponse.json({ message: "Startup profile updated", startup: updatedStartup })
  } catch (error) {
    console.error("Startup profile update failed:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}