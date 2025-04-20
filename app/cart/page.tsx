"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2, ArrowLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

// Dados simulados do carrinho
const cartItems = [
  {
    id: "1",
    name: "Torneira Monocomando",
    price: 129.9,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Torneira para Banheiro",
    price: 89.9,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function CartPage() {
  const [items, setItems] = useState(cartItems)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = 15.0
  const total = subtotal + shipping

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return

    setItems(items.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleCheckout = () => {
    setIsLoading(true)

    // Simulação de checkout
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Pedido realizado com sucesso",
        description: "Você será redirecionado para a página de pagamento",
      })
      router.push("/checkout")
    }, 2000)
  }

  return (
    <div className="container py-10">
      <div className="flex items-center mb-8">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continuar comprando
        </Link>
        <h1 className="text-3xl font-bold ml-auto">Seu Carrinho</h1>
      </div>

      {items.length === 0 ? (
        <Card className="text-center p-8">
          <CardHeader>
            <CardTitle>Seu carrinho está vazio</CardTitle>
            <CardDescription>Adicione produtos ao seu carrinho para continuar comprando</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Link href="/products">
              <Button>Ver Produtos</Button>
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Itens do Carrinho</CardTitle>
                <CardDescription>
                  Você tem {items.length} {items.length === 1 ? "item" : "itens"} no seu carrinho
                </CardDescription>
              </CardHeader>
              <CardContent>
                {items.map((item) => (
                  <div key={item.id} className="flex items-center py-4 space-x-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-md">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">R$ {item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value))}
                        className="h-8 w-16 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remover</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span>R$ {shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleCheckout} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processando...
                    </>
                  ) : (
                    "Finalizar Compra"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
