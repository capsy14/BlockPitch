import { NextResponse } from "next/server"
import { verifyToken } from "./lib/auth"

const protectedRoutes = [
  { path: "/dashboard", roles: ["investor", "startup"] },
  { path: "/investor", roles: ["investor"] },
  { path: "/startup", roles: ["startup"] },
]

export function middleware(request) {
  const { pathname } = request.nextUrl

  const matchedRoute = protectedRoutes.find((route) => pathname === route.path || pathname.startsWith(`${route.path}/`))

  if (matchedRoute) {
    const token = request.cookies.get("auth_token")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    const payload = verifyToken(token)

    if (!payload || !matchedRoute.roles.includes(payload.role)) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/investor/:path*", "/startup/:path*"],
}

