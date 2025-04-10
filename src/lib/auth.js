import { hash, compare } from "bcryptjs"
import { sign, verify } from "jsonwebtoken"
import { connectToDatabase } from "./db"
import User from "@/models/User"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export async function hashPassword(password) {
  return await hash(password, 12)
}

export async function verifyPassword(password, hashedPassword) {
  return await compare(password, hashedPassword)
}

export function createToken(payload) {
  return sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token) {
  try {
    return verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export async function getUserFromToken(token) {
  const payload = verifyToken(token)
  if (!payload || !payload.id) return null

  await connectToDatabase()
  const user = await User.findById(payload.id).select("name email role")
  return user
}

export function createAuthCookie(token) {
  return {
    name: "auth_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: "lax", // optional, but helps with CSRF protection
  }
}
