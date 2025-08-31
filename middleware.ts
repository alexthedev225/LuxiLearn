import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const url = new URL(req.url);

  if (
    url.pathname.startsWith("/admin") ||
    url.pathname.startsWith("/api/admin")
  ) {
    const token = req.cookies.get("token")?.value;

    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      if (!payload.isAdmin)
        return NextResponse.redirect(new URL("/login", req.url));

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
