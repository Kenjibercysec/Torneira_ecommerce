import { type NextRequest, NextResponse } from "next/server"
import { RateLimiter } from "@/lib/security"

// Inicializar rate limiter
const loginRateLimiter = new RateLimiter(5, 15 * 60) // 5 tentativas em 15 minutos
const apiRateLimiter = new RateLimiter(100, 60) // 100 requisições por minuto

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Adicionar headers de segurança
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  // Configurar Content Security Policy
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'",
  )

  // Obter IP do cliente
  const ip = request.ip || "127.0.0.1"

  // Aplicar rate limiting para rotas sensíveis
  if (request.nextUrl.pathname.startsWith("/api/")) {
    if (apiRateLimiter.isRateLimited(ip)) {
      return new NextResponse(JSON.stringify({ error: "Muitas requisições. Tente novamente mais tarde." }), {
        status: 429,
        headers: response.headers,
      })
    }
  }

  // Rate limiting específico para login
  if (
    (request.nextUrl.pathname === "/api/auth/login" || request.nextUrl.pathname === "/api/auth/register") &&
    request.method === "POST"
  ) {
    if (loginRateLimiter.isRateLimited(ip)) {
      return new NextResponse(JSON.stringify({ error: "Muitas tentativas de login. Tente novamente mais tarde." }), {
        status: 429,
        headers: response.headers,
      })
    }
  }

  // Verificar CSRF para requisições POST, PUT, DELETE
  if (
    ["POST", "PUT", "DELETE"].includes(request.method) &&
    request.nextUrl.pathname.startsWith("/api/") &&
    !request.nextUrl.pathname.includes("/auth/")
  ) {
    const csrfToken = request.headers.get("x-csrf-token")
    const storedToken = request.cookies.get("csrf_token")?.value

    if (!csrfToken || !storedToken || csrfToken !== storedToken) {
      return new NextResponse(JSON.stringify({ error: "Token CSRF inválido" }), {
        status: 403,
        headers: response.headers,
      })
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Corresponde a todas as rotas de API exceto as de autenticação do Next Auth
     * Corresponde a todas as rotas de páginas exceto as de arquivos estáticos
     */
    "/api/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
