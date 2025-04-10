import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/User"
import { hashPassword, createToken, createAuthCookie } from "@/lib/auth"

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password, role, name } = body

    console.log("Signup received:", body) // ✅ this will now work
    console.log("Signup received:", body)
    if (!email || !password || !role || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!["investor", "startup"].includes(role)) {
      return NextResponse.json({ error: 'Invalid role. Must be either "investor" or "startup"' }, { status: 400 })
    }

    await connectToDatabase()
    console.log("✅ Connected to MongoDB")

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    const hashedPassword = await hashPassword(password)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    })

    console.log("✅ User saved:", user)

    const token = createToken({
      id: user._id,
      email: user.email,
      role: user.role,
    })

    const response = NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User created successfully",
    })

    response.cookies.set(createAuthCookie(token))
    return response
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
