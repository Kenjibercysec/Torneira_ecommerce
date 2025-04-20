import { hash, compare } from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import { z } from "zod"

// Constantes de segurança
const SALT_ROUNDS = 10
const TOKEN_EXPIRY = 60 * 60 * 24 * 7 // 7 dias em segundos

// Validadores
export const emailValidator = z.string().email({ message: "Email inválido" })

export const passwordValidator = z
  .string()
  .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
  .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula" })
  .regex(/[a-z]/, { message: "A senha deve conter pelo menos uma letra minúscula" })
  .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" })
  .regex(/[^A-Za-z0-9]/, { message: "A senha deve conter pelo menos um caractere especial" })

// Funções de segurança
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword)
}

export function generateToken(): string {
  return uuidv4()
}

export function generateCSRFToken(): string {
  return uuidv4()
}

// Sanitização de entrada
export function sanitizeInput(input: string): string {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").trim()
}

// Proteção contra XSS
export function escapeHTML(html: string): string {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

// Proteção contra CSRF
export function validateCSRFToken(token: string, storedToken: string): boolean {
  return token === storedToken
}

// Validação de headers para segurança
export function validateSecurityHeaders(headers: Headers): boolean {
  const contentType = headers.get("content-type")
  const xRequestedWith = headers.get("x-requested-with")

  // Verificar se é uma requisição AJAX legítima
  if (xRequestedWith !== "XMLHttpRequest") {
    return false
  }

  // Verificar Content-Type para APIs
  if (contentType && !contentType.includes("application/json")) {
    return false
  }

  return true
}

// Proteção contra ataques de força bruta
export class RateLimiter {
  private attempts: Map<string, { count: number; timestamp: number }> = new Map()
  private maxAttempts: number
  private timeWindow: number // em segundos

  constructor(maxAttempts = 5, timeWindow = 60 * 15) {
    // 15 minutos padrão
    this.maxAttempts = maxAttempts
    this.timeWindow = timeWindow
  }

  isRateLimited(ip: string): boolean {
    const now = Math.floor(Date.now() / 1000)
    const record = this.attempts.get(ip)

    if (!record) {
      this.attempts.set(ip, { count: 1, timestamp: now })
      return false
    }

    // Verificar se está dentro da janela de tempo
    if (now - record.timestamp > this.timeWindow) {
      // Reset se estiver fora da janela
      this.attempts.set(ip, { count: 1, timestamp: now })
      return false
    }

    // Incrementar contagem
    record.count++
    this.attempts.set(ip, record)

    // Verificar se excedeu o limite
    return record.count > this.maxAttempts
  }

  reset(ip: string): void {
    this.attempts.delete(ip)
  }
}
