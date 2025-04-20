"use client"

import Link from "next/link"
import { CheckCircle2, MessageCircle, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function OrderConfirmationPage() {
  const router = useRouter()

  // Dados simulados do pedido
  const orderDetails = {
    orderNumber: "12345",
    date: new Date().toLocaleDateString("pt-BR"),
    total: 364.7,
    items: [
      { name: "Torneira Monocomando", quantity: 2, price: 129.9 },
      { name: "Torneira para Banheiro", quantity: 1, price: 89.9 },
    ],
    shipping: {
      address: "Rua das Torneiras, 123",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
    },
    payment: {
      method: "Cartão de Crédito",
      status: "Aprovado",
    },
    status: "Em processamento",
  }

  return (
    <div className="container py-10 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold">Pedido Confirmado!</h1>
        <p className="text-muted-foreground mt-2">
          Seu pedido #{orderDetails.orderNumber} foi recebido e está sendo processado.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Detalhes do Pedido</CardTitle>
          <CardDescription>Pedido realizado em {orderDetails.date}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-1">Número do Pedido</h3>
              <p className="text-muted-foreground">#{orderDetails.orderNumber}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Status</h3>
              <p className="text-muted-foreground">{orderDetails.status}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Data</h3>
              <p className="text-muted-foreground">{orderDetails.date}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Pagamento</h3>
              <p className="text-muted-foreground">
                {orderDetails.payment.method} - {orderDetails.payment.status}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Itens do Pedido</h3>
            {orderDetails.items.map((item, index) => (
              <div key={index} className="flex justify-between py-2">
                <div>
                  <p>
                    {item.name} x {item.quantity}
                  </p>
                </div>
                <p>R$ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <p>Total</p>
              <p>R$ {orderDetails.total.toFixed(2)}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Endereço de Entrega</h3>
            <p className="text-muted-foreground">
              {orderDetails.shipping.address}
              <br />
              {orderDetails.shipping.city}, {orderDetails.shipping.state}
              <br />
              CEP: {orderDetails.shipping.zipCode}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <MessageCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-green-800 mb-1">Acompanhe pelo WhatsApp</h3>
              <p className="text-green-700 text-sm">
                Você receberá atualizações sobre seu pedido diretamente no WhatsApp. Acompanhe o status de "Em
                processamento" até "Entregue".
              </p>
              <Link href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="mt-3 bg-white border-green-300 text-green-700 hover:bg-green-100">
                  Abrir WhatsApp
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={() => router.push("/")} className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4" />
          Continuar Comprando
        </Button>
        <Button variant="outline" onClick={() => router.push("/profile/orders")}>
          Ver Meus Pedidos
        </Button>
      </div>
    </div>
  )
}
