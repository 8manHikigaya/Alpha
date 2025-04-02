import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // For a real application, you would check for a valid session or token here
  // This is a simplified example using localStorage in the client

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/parent-controls"]

  // Check if the requested path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  // If it's a protected route, redirect to login if not authenticated
  // In a real app, you would check for a valid session token here
  if (isProtectedRoute) {
    // For demonstration purposes only - actual auth check would happen here
    // This middleware can't access localStorage, so in a real app you'd use
    // cookies or headers to check authentication status

    // Redirect to login for now - in a real app, this would only happen if not authenticated
    // return NextResponse.redirect(new URL('/auth/login', request.url))

    // For demo purposes, we'll just continue to the protected route
    // In a real app, you would implement proper authentication checks
    return NextResponse.next()
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/parent-controls/:path*"],
}

