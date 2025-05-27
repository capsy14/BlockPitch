import { NextResponse } from "next/server"
import { jwtVerify } from "jose" // <- Import from jose

export const runtime = 'experimental-edge';
 // Ensure you're using the edge runtime

const protectedRoutes = [
  { path: "/dashboard", roles: ["investor", "startup"] },
  { path: "/investor", roles: ["investor"] },
  { path: "/startup", roles: ["startup"] },
]

export async function middleware(request) {
  const { pathname } = request.nextUrl
  const JWT_SECRET = process.env.JWT_SECRET

  // console.log("currently at", pathname)

  const matchedRoute = protectedRoutes.find(
    (route) => pathname === route.path || pathname.startsWith(`${route.path}/`)
  )

  if (matchedRoute) {
    const token = request.cookies.get("auth_token")?.value
    console.log(token)
    

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET)) // Use jose to verify
      // console.log("✅ Token verified:", payload)
      
      return NextResponse.next() // Allow the request to proceed
    } catch (error) {
      console.error("❌ Token verification failed:", error.message)
      return NextResponse.redirect(new URL("/login", request.url)) // Redirect if token is invalid
    }
  }

  return NextResponse.next() // Continue to the requested path if no matching route is found
}

export const config = {
  matcher: ["/dashboard/:path*", "/investor/:path*", "/startup/:path*"],
}
