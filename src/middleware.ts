import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/middleware";
import { EVENT_CONFIG } from "@/libs/data/homepage";

const PUBLIC_ROUTES = ["/login", "/api/auth/callback"];

function isEventStarted(): boolean {
  const eventStartTime =
    process.env.NEXT_PUBLIC_EVENT_START_TIME ||
    EVENT_CONFIG.event_start_date;
  if (!eventStartTime) return true; // No config → assume started (don't block)
  return new Date(eventStartTime) <= new Date();
}

export async function middleware(request: NextRequest) {
  const { supabase, supabaseResponse } = createClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  // Used by the TODO auth redirect block below — kept for when it's re-enabled
  const _isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const eventHasStarted = isEventStarted();

  // Event-based routing: redirect / → /countdown when event not started
  if (user && pathname === "/" && !eventHasStarted) {
    const url = request.nextUrl.clone();
    url.pathname = "/countdown";
    return NextResponse.redirect(url);
  }

  // TODO: Re-enable after preview — redirect /countdown → / when event has started
  // if (pathname === "/countdown" && eventHasStarted) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = "/";
  //   return NextResponse.redirect(url);
  // }

  // Redirect authenticated users away from /login
  if (user && pathname === "/login") {
    const url = request.nextUrl.clone();
    url.pathname = eventHasStarted ? "/" : "/countdown";
    return NextResponse.redirect(url);
  }

  // TODO: Re-enable auth redirect after preview
  // Redirect unauthenticated users to /login from protected routes
  // if (!user && !_isPublicRoute) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = "/login";
  //   return NextResponse.redirect(url);
  // }

  // Add security headers
  const response = supabaseResponse;
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|assets/).*)",
  ],
};
