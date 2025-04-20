"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, CreditCard, Loader2, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

const addressSchema = z.object({
  fullName: z.string().min(3, { message: "Nome completo é obrigatório" }),
  street: z.string().min(5, { message: "Endereço é obrigatório" }),
  number: z.string().min(1, { message: "Número é obrigatório" }),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, { message: "Bairro é obrigatório" }),
  city: z.string().min(2, { message: "Cidade é obrigatória" }),
  state: z.string().length(2, { message: "Estado inválido" }),
  zipCode: z.string().regex(/^\d{5}-\d{3}$/, { message: "CEP inválido (formato: 12345-678)" }),
  phone: z.string().regex(/^$$\d{2}$$ \d{5}-\d{4}$/, { message: "Telefone inválido (formato: (99) 99999-9999)" }),
})

const cardSchema = z.object({
  cardNumber: z
    .string()
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, { message: "Número do cartão inválido (formato: 1234 5678 9012 3456)" }),
  cardName: z.string().min(3, { message: "Nome no cartão é obrigatório" }),
  expiryMonth: z.string().min(1, { message: "Mês é obrigatório" }),
  expiryYear: z.string().min(1, { message: "Ano é obrigatório" }),
  cvv: z.string().regex(/^\d{3,4}$/, { message: "CVV inválido" }),
})

type AddressFormValues = z.infer<typeof addressSchema>
type CardFormValues = z.infer<typeof cardSchema>

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit")
  const router = useRouter()
  const { toast } = useToast()

  const addressForm = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
    },
  })

  const cardForm = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    },
  })

  const onSubmit = async () => {
    if (paymentMethod === "credit" && !cardForm.formState.isValid) {
      cardForm.trigger()
      return
    }

    if (!addressForm.formState.isValid) {
      addressForm.trigger()
      return
    }

    setIsLoading(true)

    // Simulação de processamento de pagamento
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Pedido confirmado!",
        description: "Seu pedido foi processado com sucesso. Você receberá atualizações pelo WhatsApp.",
      })
      router.push("/order-confirmation")
    }, 3000)
  }

  // Formatar inputs
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const formatZipCode = (value: string) => {
    const v = value.replace(/\D/g, "")
    if (v.length <= 5) return v
    return `${v.slice(0, 5)}-${v.slice(5, 8)}`
  }

  const formatPhone = (value: string) => {
    const v = value.replace(/\D/g, "")
    if (v.length <= 2) return `(${v}`
    if (v.length <= 7) return `(${v.slice(0, 2)}) ${v.slice(2)}`
    return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7, 11)}`
  }

  // Dados simulados do resumo do pedido
  const orderSummary = {
    subtotal: 349.7,
    shipping: 15.0,
    total: 364.7,
    items: [
      { name: "Torneira Monocomando", quantity: 2, price: 129.9 },
      { name: "Torneira para Banheiro", quantity: 1, price: 89.9 },
    ],
  }

  return (
    <div className="container py-10">
      <div className="flex items-center mb-8">
        <Link href="/cart" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para o carrinho
        </Link>
        <h1 className="text-3xl font-bold ml-auto">Checkout</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Endereço de Entrega</CardTitle>
              <CardDescription>Informe o endereço onde deseja receber seu pedido</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input id="fullName" {...addressForm.register("fullName")} placeholder="Nome completo" />
                  {addressForm.formState.errors.fullName && (
                    <p className="text-sm text-red-500">{addressForm.formState.errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="street">Endereço</Label>
                  <Input id="street" {...addressForm.register("street")} placeholder="Rua, Avenida, etc." />
                  {addressForm.formState.errors.street && (
                    <p className="text-sm text-red-500">{addressForm.formState.errors.street.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="number">Número</Label>
                  <Input id="number" {...addressForm.register("number")} placeholder="123" />
                  {addressForm.formState.errors.number && (
                    <p className="text-sm text-red-500">{addressForm.formState.errors.number.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    {...addressForm.register("complement")}
                    placeholder="Apto, Bloco, etc. (opcional)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input id="neighborhood" {...addressForm.register("neighborhood")} placeholder="Seu bairro" />
                  {addressForm.formState.errors.neighborhood && (
                    <p className="text-sm text-red-500">{addressForm.formState.errors.neighborhood.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" {...addressForm.register("city")} placeholder="Sua cidade" />
                  {addressForm.formState.errors.city && (
                    <p className="text-sm text-red-500">{addressForm.formState.errors.city.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Select
                    onValueChange={(value) => addressForm.setValue("state", value)}
                    defaultValue={addressForm.getValues("state")}
                  >
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AC">AC</SelectItem>
                      <SelectItem value="AL">AL</SelectItem>
                      <SelectItem value="AP">AP</SelectItem>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="BA">BA</SelectItem>
                      <SelectItem value="CE">CE</SelectItem>
                      <SelectItem value="DF">DF</SelectItem>
                      <SelectItem value="ES">ES</SelectItem>
                      <SelectItem value="GO">GO</SelectItem>
                      <SelectItem value="MA">MA</SelectItem>
                      <SelectItem value="MT">MT</SelectItem>
                      <SelectItem value="MS">MS</SelectItem>
                      <SelectItem value="MG">MG</SelectItem>
                      <SelectItem value="PA">PA</SelectItem>
                      <SelectItem value="PB">PB</SelectItem>
                      <SelectItem value="PR">PR</SelectItem>
                      <SelectItem value="PE">PE</SelectItem>
                      <SelectItem value="PI">PI</SelectItem>
                      <SelectItem value="RJ">RJ</SelectItem>
                      <SelectItem value="RN">RN</SelectItem>
                      <SelectItem value="RS">RS</SelectItem>
                      <SelectItem value="RO">RO</SelectItem>
                      <SelectItem value="RR">RR</SelectItem>
                      <SelectItem value="SC">SC</SelectItem>
                      <SelectItem value="SP">SP</SelectItem>
                      <SelectItem value="SE">SE</SelectItem>
                      <SelectItem value="TO">TO</SelectItem>
                    </SelectContent>
                  </Select>
                  {addressForm.formState.errors.state && (
                    <p className="text-sm text-red-500">{addressForm.formState.errors.state.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    {...addressForm.register("zipCode")}
                    placeholder="12345-678"
                    onChange={(e) => {
                      const formatted = formatZipCode(e.target.value)
                      e.target.value = formatted
                      addressForm.setValue("zipCode", formatted)
                    }}
                  />
                  {addressForm.formState.errors.zipCode && (
                    <p className="text-sm text-red-500">{addressForm.formState.errors.zipCode.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    {...addressForm.register("phone")}
                    placeholder="(99) 99999-9999"
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value)
                      e.target.value = formatted
                      addressForm.setValue("phone", formatted)
                    }}
                  />
                  {addressForm.formState.errors.phone && (
                    <p className="text-sm text-red-500">{addressForm.formState.errors.phone.message}</p>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Método de Pagamento</CardTitle>
              <CardDescription>Escolha como deseja pagar</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="credit" onValueChange={setPaymentMethod}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="credit">Cartão de Crédito</TabsTrigger>
                  <TabsTrigger value="pix">Pix</TabsTrigger>
                  <TabsTrigger value="boleto">Boleto</TabsTrigger>
                </TabsList>
                <TabsContent value="credit" className="pt-4">
                  <form className="grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="cardNumber">Número do Cartão</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          {...cardForm.register("cardNumber")}
                          placeholder="1234 5678 9012 3456"
                          onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value)
                            e.target.value = formatted
                            cardForm.setValue("cardNumber", formatted)
                          }}
                        />
                        <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                      {cardForm.formState.errors.cardNumber && (
                        <p className="text-sm text-red-500">{cardForm.formState.errors.cardNumber.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="cardName">Nome no Cartão</Label>
                      <Input id="cardName" {...cardForm.register("cardName")} placeholder="Nome como está no cartão" />
                      {cardForm.formState.errors.cardName && (
                        <p className="text-sm text-red-500">{cardForm.formState.errors.cardName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expiryMonth">Mês de Expiração</Label>
                      <Select
                        onValueChange={(value) => cardForm.setValue("expiryMonth", value)}
                        defaultValue={cardForm.getValues("expiryMonth")}
                      >
                        <SelectTrigger id="expiryMonth">
                          <SelectValue placeholder="Mês" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => {
                            const month = i + 1
                            return (
                              <SelectItem key={month} value={month.toString().padStart(2, "0")}>
                                {month.toString().padStart(2, "0")}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      {cardForm.formState.errors.expiryMonth && (
                        <p className="text-sm text-red-500">{cardForm.formState.errors.expiryMonth.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expiryYear">Ano de Expiração</Label>
                      <Select
                        onValueChange={(value) => cardForm.setValue("expiryYear", value)}
                        defaultValue={cardForm.getValues("expiryYear")}
                      >
                        <SelectTrigger id="expiryYear">
                          <SelectValue placeholder="Ano" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => {
                            const year = new Date().getFullYear() + i
                            return (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      {cardForm.formState.errors.expiryYear && (
                        <p className="text-sm text-red-500">{cardForm.formState.errors.expiryYear.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" {...cardForm.register("cvv")} placeholder="123" maxLength={4} />
                      {cardForm.formState.errors.cvv && (
                        <p className="text-sm text-red-500">{cardForm.formState.errors.cvv.message}</p>
                      )}
                    </div>
                  </form>
                </TabsContent>
                <TabsContent value="pix" className="pt-4">
                  <div className="text-center space-y-4">
                    <div className="border-2 border-dashed border-muted-foreground p-6 mx-auto max-w-xs">
                      <div className="aspect-square bg-muted flex items-center justify-center">
                        <p className="text-sm text-muted-foreground">Código PIX será gerado após confirmação</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Após confirmar o pedido, você receberá um código PIX para pagamento imediato.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="boleto" className="pt-4">
                  <div className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground">
                      O boleto será gerado após a confirmação do pedido e enviado para seu email. O prazo de entrega
                      começa a contar a partir da confirmação do pagamento.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <p className="font-medium">Importante:</p>
                      <p className="text-sm text-muted-foreground">
                        O boleto tem vencimento em 3 dias úteis. Após esse prazo, o pedido será cancelado
                        automaticamente.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderSummary.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span>R$ {orderSummary.shipping.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>R$ {orderSummary.total.toFixed(2)}</span>
              </div>

              <div className="bg-green-50 p-3 rounded-md flex items-start gap-2">
                <MessageCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-green-700">Você receberá atualizações sobre seu pedido pelo WhatsApp.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={onSubmit} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processando...
                  </>
                ) : (
                  "Confirmar Pedido"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
