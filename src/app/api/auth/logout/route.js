import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({
    message: "Logged out successfully",
  })

  response.cookies.set({
    name: "auth_token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0, 
  })

  return response
}

