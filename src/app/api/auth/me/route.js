import { NextResponse } from "next/server"
import { getUserFromToken } from "@/lib/auth"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/User"

export async function GET(request) {
  try {
    const token = request.cookies.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const decoded = await getUserFromToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    await connectToDatabase()

    const user = await User.findById(decoded.id).select("name email role")
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
