import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Bypass Next internals/assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Admin protection (NextAuth)
  if (pathname.startsWith("/admin")) {
    const publicAdmin = ["/admin/login", "/admin/forgot", "/admin/reset"];
    if (publicAdmin.some((p) => pathname.startsWith(p))) {
      return NextResponse.next();
    }
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (!token || (token as any).role !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return NextResponse.next();
  }

  // Presentation lock (site gate)
  const exempt = ["/gate", "/api", "/favicon.ico"];
  const isExempt = exempt.some((p) => pathname.startsWith(p));
  if (!isExempt) {
    const cookie = req.cookies.get("site_access")?.value;
    if (cookie !== "granted") {
      return NextResponse.redirect(new URL("/gate", req.url));
    }
  }

  return NextResponse.next();
}

// Match everything except Next static/image & favicon
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
