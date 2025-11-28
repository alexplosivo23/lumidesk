import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Login siempre permitido
  if (url.pathname.startsWith("/auth/login")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  // Sin token → login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  let user: any;
  try {
    user = jwtDecode(token);
  } catch {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Usuarios normales NO pueden entrar al desk
  if (url.pathname.startsWith("/desk") && user.role === "user") {
    return NextResponse.redirect(new URL("/portal/home", req.url));
  }

  // Agentes y admin NO pueden entrar al portal
  if (
    url.pathname.startsWith("/portal") &&
    (user.role === "agent" || user.role === "admin")
  ) {
    return NextResponse.redirect(new URL("/desk/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/desk/:path*", "/auth/login"],
};