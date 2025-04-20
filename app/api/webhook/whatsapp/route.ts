import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Validação do schema de webhook do WhatsApp
const whatsappWebhookSchema = z.object({
  object: z.string(),
  entry: z.array(
    z.object({
      id: z.string(),
      changes: z.array(
        z.object({
          value: z.object({
            messaging_product: z.string(),
            metadata: z.object({
              display_phone_number: z.string(),
              phone_number_id: z.string(),
            }),
            contacts: z
              .array(
                z.object({
                  profile: z.object({
                    name: z.string(),
                  }),
                  wa_id: z.string(),
                }),
              )
              .optional(),
            messages: z
              .array(
                z.object({
                  from: z.string(),
                  id: z.string(),
                  timestamp: z.string(),
                  text: z
                    .object({
                      body: z.string(),
                    })
                    .optional(),
                  type: z.string(),
                }),
              )
              .optional(),
          }),
          field: z.string(),
        }),
      ),
    }),
  ),
})

export async function POST(request: NextRequest) {
  try {
    // Verificar token de verificação do WhatsApp
    const token = process.env.WHATSAPP_VERIFY_TOKEN
    const query = request.nextUrl.searchParams
    const mode = query.get("hub.mode")
    const verifyToken = query.get("hub.verify_token")
    const challenge = query.get("hub.challenge")

    // Verificação inicial do webhook
    if (mode && verifyToken) {
      if (mode === "subscribe" && verifyToken === token) {
        return new NextResponse(challenge, { status: 200 })
      } else {
        return new NextResponse("Verification failed", { status: 403 })
      }
    }

    // Processar mensagens recebidas
    const body = await request.json()
    const validatedData = whatsappWebhookSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json({ error: "Formato de webhook inválido" }, { status: 400 })
    }

    const webhook = validatedData.data

    // Processar mensagens
    for (const entry of webhook.entry) {
      for (const change of entry.changes) {
        if (change.field === "messages") {
          const messages = change.value.messages
          const contacts = change.value.contacts

          if (messages && contacts) {
            for (let i = 0; i < messages.length; i++) {
              const message = messages[i]
              const contact = contacts[i]

              if (message.type === "text" && message.text?.body) {
                // Processar a mensagem de texto
                await processWhatsAppMessage(message.from, contact.profile.name, message.text.body)
              }
            }
          }
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao processar webhook do WhatsApp:", error)
    return NextResponse.json({ error: "Erro ao processar webhook" }, { status: 500 })
  }
}

// Função para processar mensagens do WhatsApp
async function processWhatsAppMessage(from: string, name: string, message: string) {
  console.log(`Mensagem recebida de ${name} (${from}): ${message}`)

  // Verificar se é uma consulta de pedido
  const orderRegex = /pedido\s+#?(\d+)/i
  const match = message.match(orderRegex)

  if (match) {
    const orderNumber = match[1]
    await sendOrderStatus(from, orderNumber)
    return
  }

  // Resposta padrão
  await sendWhatsAppMessage(
    from,
    `Olá ${name}, obrigado por entrar em contato com a Torneirinha do Carlão! Como podemos ajudar?`,
  )
}

// Função para enviar status do pedido
async function sendOrderStatus(to: string, orderNumber: string) {
  // Simulação - em um ambiente real, consultaria o banco de dados
  const statuses = ["Em processamento", "Separado para envio", "Em trânsito", "Entregue"]
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

  await sendWhatsAppMessage(
    to,
    `Seu pedido #${orderNumber} está: *${randomStatus}*\n\nPara mais detalhes, acesse sua conta em nosso site.`,
  )
}

// Função para enviar mensagens pelo WhatsApp
async function sendWhatsAppMessage(to: string, message: string) {
  // Simulação - em um ambiente real, usaria a API do WhatsApp Business
  console.log(`Enviando mensagem para ${to}: ${message}`)
  return true
}
