import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { sanitizeInput, validateCSRFToken } from "@/lib/security"

// Validação do schema de pagamento
const paymentSchema = z.object({
  paymentMethod: z.enum(["credit", "pix", "boleto"]),
  amount: z.number().positive(),
  orderId: z.string(),
  csrfToken: z.string(),

  // Campos específicos para cartão de crédito
  cardDetails: z
    .object({
      number: z.string().regex(/^\d{16}$/),
      name: z.string().min(3),
      expMonth: z.string().regex(/^(0[1-9]|1[0-2])$/),
      expYear: z.string().regex(/^\d{4}$/),
      cvv: z.string().regex(/^\d{3,4}$/),
    })
    .optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Verificar origem da requisição
    const origin = request.headers.get("origin")
    if (!origin || !origin.includes("torneirinhadocarlao.com.br")) {
      return NextResponse.json({ error: "Origem não autorizada" }, { status: 403 })
    }

    // Verificar CSRF token
    const storedToken = request.cookies.get("csrf_token")?.value
    const body = await request.json()

    if (!storedToken || !validateCSRFToken(body.csrfToken, storedToken)) {
      return NextResponse.json({ error: "Token CSRF inválido" }, { status: 403 })
    }

    // Validar dados de entrada
    const validatedData = paymentSchema.safeParse(body)
    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Dados de pagamento inválidos", details: validatedData.error.format() },
        { status: 400 },
      )
    }

    const payment = validatedData.data

    // Sanitizar dados
    if (payment.cardDetails?.name) {
      payment.cardDetails.name = sanitizeInput(payment.cardDetails.name)
    }

    // Processar pagamento (simulado)
    const paymentResult = await processPayment(payment)

    // Registrar transação no banco de dados
    await saveTransaction(payment, paymentResult)

    // Enviar confirmação por WhatsApp (simulado)
    await sendWhatsAppConfirmation(payment.orderId)

    return NextResponse.json({
      success: true,
      transactionId: paymentResult.transactionId,
      status: paymentResult.status,
      message: "Pagamento processado com sucesso",
    })
  } catch (error) {
    console.error("Erro ao processar pagamento:", error)
    return NextResponse.json({ error: "Erro ao processar pagamento" }, { status: 500 })
  }
}

// Funções auxiliares simuladas
async function processPayment(payment: any) {
  // Simulação de processamento de pagamento
  return {
    transactionId: `TX-${Math.floor(Math.random() * 1000000)}`,
    status: "approved",
    timestamp: new Date().toISOString(),
  }
}

async function saveTransaction(payment: any, result: any) {
  // Simulação de salvamento no banco de dados
  console.log("Transação salva:", { payment, result })
  return true
}

async function sendWhatsAppConfirmation(orderId: string) {
  // Simulação de envio de mensagem pelo WhatsApp
  console.log(`Mensagem WhatsApp enviada para o pedido ${orderId}`)
  return true
}
