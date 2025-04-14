import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/User"
import Startup from "@/models/Startup"  // Import the Startup model
import { hashPassword, createToken, createAuthCookie } from "@/lib/auth"
import { v4 as uuidv4 } from "uuid"  // Import uuid to generate unique IDs

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password, role, name, ...rest } = body

    console.log("Signup received:", body) // ✅ Debugging log

    // Validate required fields
    if (!email || !password || !role || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate role
    if (!["investor", "startup"].includes(role)) {
      return NextResponse.json({ error: 'Invalid role. Must be either "investor" or "startup"' }, { status: 400 })
    }

    await connectToDatabase()
    console.log("✅ Connected to MongoDB")

    // Check if the user already exists
    const existingUser = await User.findOne({ email })
    const existingStartup = await Startup.findOne({ email })
    if (existingUser || existingStartup) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash the password
    const hashedPassword = await hashPassword(password)

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    })

    console.log("✅ User saved:", user)

    // If the role is "startup", create a corresponding Startup entry
    if (role === "startup") {
      const startup = new Startup({
        _id: uuidv4(),
        name,
        email,
        password: hashedPassword,
        founders: [],  // Customize founders as needed
        currentInvestors: [],
        totalInvestors: 0,
        fundsRaised: 0,
        pitchViews: 0,
        pitchMaterials: [],
        ...rest,  // Additional fields (if any) for the startup
      })

      await startup.save()
      console.log("✅ Startup created:", startup)
    }

    // Create authentication token
    const token = createToken({
      id: user._id,
      email: user.email,
      role: user.role,
    })

    // Create the response object
    const response = NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User created successfully",
    })

    // Set the authentication cookie
    response.cookies.set(createAuthCookie(token))

    return response
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
