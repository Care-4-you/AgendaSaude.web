import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
  "/password"
];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("@Saude:token")?.value;
  const { pathname } = req.nextUrl;

  const isPasswordPath = pathname.startsWith("/password");
  const isProtected = blockIfAuthenticated.includes(pathname) || isPasswordPath;

  if (token && isProtected) {
    return NextResponse.redirect(new URL("/", req.url)); // redireciona para home, dashboard, etc.
  }

  // Verifica se a rota acessada é inválida (404)
  const isKnownRoute = validRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!isKnownRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Definir as rotas que o middleware deve verificar
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
