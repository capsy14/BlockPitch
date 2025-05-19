import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import User from "@/models/User"
export async function GET(req) {
  try {
    await connectToDatabase()

    const token = req.cookies.get("auth_token")?.value


    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "investor") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const user = await User.findById(decoded.id)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // const startup = await Startup.findOne({ email:decoded.email })
    // if (!startup) {
    //   return NextResponse.json({ error: "Startup not found" }, { status: 404 })
    // }

    return NextResponse.json({ user })
  } catch (err) {
    console.error("Failed to fetch investor:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}