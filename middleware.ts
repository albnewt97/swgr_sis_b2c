import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if coming soon mode is enabled
  const comingSoonEnabled = process.env.COMING_SOON_MODE === "true"

  // Allow access to coming-soon page itself and static assets
  if (
    request.nextUrl.pathname === "/coming-soon" ||
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Redirect to coming soon page if enabled
  if (comingSoonEnabled && request.nextUrl.pathname !== "/coming-soon") {
    return NextResponse.redirect(new URL("/coming-soon", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
