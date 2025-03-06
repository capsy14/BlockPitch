import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { hashPassword, createToken, createAuthCookie } from "@/lib/auth"

export async function POST(request) {
  try {
    const { email, password, role, name } = await request.json()

    if (!email || !password || !role || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (role !== "investor" && role !== "startup") {
      return NextResponse.json({ error: 'Invalid role. Must be either "investor" or "startup"' }, { status: 400 })
    }

    const existingUser = await db.users.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    const hashedPassword = await hashPassword(password)

    const user = await db.users.create({
      email,
      password: hashedPassword,
      role,
      name,
      createdAt: new Date(),
    })

    const token = createToken({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
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

