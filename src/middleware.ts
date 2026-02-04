import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getServerAuth } from "./hooks/getServerAuth";

const blockIfAuthenticated = [
  "/signin",
  "/register-paciente",
  "/register-clinic"
];

const validRoutes = [
  "/",
  "/signin",
  "/register-paciente",
  "/register-clinic",
  "/register-doctor",
  "/password",
  "/mapa",
  "/dashboard",
  "/sobre-nos"
];

export function middleware(req: NextRequest) {
  const { user } = getServerAuth();

  const token = req.cookies.get("@Saude:token")?.value;
  const { pathname } = req.nextUrl;

  const isPasswordPath = pathname.startsWith("/password");
  const isProtected = blockIfAuthenticated.includes(pathname) || isPasswordPath;

  if (token && isProtected) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const isKnownRoute = validRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!isKnownRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // === Proteção para rotas do dashboard === //
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    try {
      if (
        (pathname.startsWith("/dashboard/medico") && user.role !== "medico") ||
        (pathname.startsWith("/dashboard/paciente") &&
          user.role !== "paciente") ||
        (pathname.startsWith("/dashboard/clinica") && user.role !== "USER")
      ) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    } catch (err) {
      console.error("Erro ao verificar token:", err);
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  return NextResponse.next();
}

// Definir as rotas que o middleware deve verificar
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
