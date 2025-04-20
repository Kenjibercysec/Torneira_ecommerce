"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, CreditCard, Edit, Home, Loader2, LogOut, Package, Save, ShoppingBag, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

const profileSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().regex(/^$$\d{2}$$ \d{5}-\d{4}$/, { message: "Telefone inválido (formato: (99) 99999-9999)" }),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Dados simulados do usuário
  const userData = {
    name: "Carlos Silva",
    email: "carlos@example.com",
    phone: "(11) 99999-9999",
    addresses: [
      {
        id: "1",
        name: "Casa",
        street: "Rua das Torneiras",
        number: "123",
        complement: "Apto 45",
        neighborhood: "Centro",
        city: "São Paulo",
        state: "SP",
        zipCode: "01234-567",
        isDefault: true,
      },
      {
        id: "2",
        name: "Trabalho",
        street: "Avenida Paulista",
        number: "1000",
        complement: "Sala 123",
        neighborhood: "Bela Vista",
        city: "São Paulo",
        state: "SP",
        zipCode: "01310-100",
        isDefault: false,
      },
    ],
    orders: [
      {
        id: "12345",
        date: "15/04/2025",
        status: "Entregue",
        total: 349.7,
        items: 3,
      },
      {
        id: "12346",
        date: "02/04/2025",
        status: "Em trânsito",
        total: 129.9,
        items: 1,
      },
      {
        id: "12347",
        date: "20/03/2025",
        status: "Cancelado",
        total: 89.9,
        items: 1,
      },
    ],
    paymentMethods: [
      {
        id: "1",
        type: "credit",
        brand: "Visa",
        lastDigits: "4242",
        expiryDate: "12/28",
        isDefault: true,
      },
      {
        id: "2",
        type: "credit",
        brand: "Mastercard",
        lastDigits: "5555",
        expiryDate: "10/26",
        isDefault: false,
      },
    ],
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
    },
  })

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true)

    // Simulação de atualização de perfil
    setTimeout(() => {
      setIsLoading(false)
      setIsEditing(false)
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso",
      })
    }, 1500)
  }

  const formatPhone = (value: string) => {
    const v = value.replace(/\D/g, "")
    if (v.length <= 2) return `(${v}`
    if (v.length <= 7) return `(${v.slice(0, 2)}) ${v.slice(2)}`
    return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7, 11)}`
  }

  const handleLogout = () => {
    // Simulação de logout
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    })
    router.push("/")
  }

  return (
    <div className="container py-10">
      <div className="flex items-center mb-8">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para a loja
        </Link>
        <h1 className="text-3xl font-bold ml-auto">Minha Conta</h1>
        <Button variant="ghost" size="icon" className="ml-4" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Sair</span>
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col items-center space-y-2">
                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold">{userData.name}</h2>
                <p className="text-sm text-muted-foreground">{userData.email}</p>
              </div>
              <Separator />
              <nav className="flex flex-col space-y-1">
                <Link href="/profile" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary">
                  <User className="h-4 w-4" />
                  Meu Perfil
                </Link>
                <Link
                  href="/profile/orders"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Meus Pedidos
                </Link>
                <Link
                  href="/profile/addresses"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Home className="h-4 w-4" />
                  Endereços
                </Link>
                <Link
                  href="/profile/payment"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <CreditCard className="h-4 w-4" />
                  Formas de Pagamento
                </Link>
              </nav>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3 space-y-8">
          <Tabs defaultValue="info">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="orders">Pedidos</TabsTrigger>
              <TabsTrigger value="addresses">Endereços</TabsTrigger>
              <TabsTrigger value="payment">Pagamento</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center">
                  <div>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>Gerencie suas informações pessoais</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? (
                      <>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Cancelar
                      </>
                    ) : (
                      <>
                        <Edit className="mr-2 h-4 w-4" /> Editar
                      </>
                    )}
                  </Button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        {isEditing ? (
                          <>
                            <Input id="name" {...register("name")} />
                            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                          </>
                        ) : (
                          <div className="p-2 border rounded-md bg-muted/40">{userData.name}</div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        {isEditing ? (
                          <>
                            <Input id="email" type="email" {...register("email")} />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                          </>
                        ) : (
                          <div className="p-2 border rounded-md bg-muted/40">{userData.email}</div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        {isEditing ? (
                          <>
                            <Input
                              id="phone"
                              {...register("phone")}
                              onChange={(e) => {
                                const formatted = formatPhone(e.target.value)
                                e.target.value = formatted
                              }}
                            />
                            {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                          </>
                        ) : (
                          <div className="p-2 border rounded-md bg-muted/40">{userData.phone}</div>
                        )}
                      </div>
                    </div>

                    {isEditing && (
                      <Button type="submit" className="mt-6" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" /> Salvar Alterações
                          </>
                        )}
                      </Button>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Meus Pedidos</CardTitle>
                  <CardDescription>Histórico dos seus pedidos recentes</CardDescription>
                </CardHeader>
                <CardContent>
                  {userData.orders.length === 0 ? (
                    <div className="text-center py-6">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Nenhum pedido encontrado</h3>
                      <p className="text-muted-foreground mt-1">Você ainda não realizou nenhum pedido.</p>
                      <Button className="mt-4" onClick={() => router.push("/")}>
                        Começar a Comprar
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userData.orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <h3 className="font-medium">Pedido #{order.id}</h3>
                              <p className="text-sm text-muted-foreground">Realizado em {order.date}</p>
                            </div>
                            <div className="text-right">
                              <div
                                className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                  order.status === "Entregue"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "Cancelado"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {order.status}
                              </div>
                              <p className="text-sm font-medium mt-1">R$ {order.total.toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="mt-2 flex justify-between items-center">
                            <p className="text-sm text-muted-foreground">{order.items} itens</p>
                            <Link href={`/profile/orders/${order.id}`}>
                              <Button variant="outline" size="sm">
                                Ver Detalhes
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => router.push("/profile/orders")}>
                    Ver Todos os Pedidos
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="addresses" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center">
                  <div>
                    <CardTitle>Meus Endereços</CardTitle>
                    <CardDescription>Gerencie seus endereços de entrega</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    <Home className="mr-2 h-4 w-4" /> Adicionar Endereço
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.addresses.map((address) => (
                      <div key={address.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{address.name}</h3>
                              {address.isDefault && (
                                <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                                  Padrão
                                </span>
                              )}
                            </div>
                            <p className="text-sm mt-1">
                              {address.street}, {address.number}
                              {address.complement && `, ${address.complement}`}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {address.neighborhood}, {address.city} - {address.state}
                            </p>
                            <p className="text-sm text-muted-foreground">CEP: {address.zipCode}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => router.push("/profile/addresses")}>
                    Gerenciar Endereços
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="payment" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center">
                  <div>
                    <CardTitle>Formas de Pagamento</CardTitle>
                    <CardDescription>Gerencie seus cartões e métodos de pagamento</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    <CreditCard className="mr-2 h-4 w-4" /> Adicionar Cartão
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.paymentMethods.map((method) => (
                      <div key={method.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{method.brand}</h3>
                              {method.isDefault && (
                                <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                                  Padrão
                                </span>
                              )}
                            </div>
                            <p className="text-sm mt-1">•••• •••• •••• {method.lastDigits}</p>
                            <p className="text-sm text-muted-foreground">Expira em {method.expiryDate}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => router.push("/profile/payment")}>
                    Gerenciar Métodos de Pagamento
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
