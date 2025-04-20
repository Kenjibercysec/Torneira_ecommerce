"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  Box,
  DollarSign,
  Download,
  Home,
  LayoutDashboard,
  LogOut,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Dados simulados para o dashboard
  const dashboardData = {
    revenue: {
      total: 12450.75,
      percentage: 12.5,
      isUp: true,
    },
    orders: {
      total: 156,
      percentage: 8.2,
      isUp: true,
      pending: 23,
      processing: 45,
      shipped: 78,
      delivered: 10,
    },
    customersMetrics: {
      total: 89,
      percentage: 5.1,
      isUp: true,
      active: 65,
      new: 12,
    },
    productsMetrics: {
      total: 32,
      percentage: 2.3,
      isUp: false,
      lowStock: 5,
      outOfStock: 2,
    },
    platformMetrics: {
      averageOrderValue: 235.50,
      conversionRate: 3.2,
      cartAbandonmentRate: 25.8,
      averageDeliveryTime: 4.5,
      customerSatisfaction: 4.7,
    },
    recentOrders: [
      {
        id: "12345",
        customer: "Carlos Silva",
        date: "15/04/2025",
        status: "Entregue",
        total: 349.7,
      },
      {
        id: "12346",
        customer: "Maria Oliveira",
        date: "14/04/2025",
        status: "Em processamento",
        total: 129.9,
      },
      {
        id: "12347",
        customer: "João Santos",
        date: "13/04/2025",
        status: "Em trânsito",
        total: 89.9,
      },
      {
        id: "12348",
        customer: "Ana Pereira",
        date: "12/04/2025",
        status: "Entregue",
        total: 199.5,
      },
      {
        id: "12349",
        customer: "Pedro Costa",
        date: "11/04/2025",
        status: "Cancelado",
        total: 259.8,
      },
    ],
    productsList: [
      {
        id: "1",
        name: "Torneira Monocomando",
        price: 129.9,
        stock: 45,
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "2",
        name: "Torneira Bica Alta",
        price: 159.9,
        stock: 32,
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "3",
        name: "Torneira para Banheiro",
        price: 89.9,
        stock: 18,
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "4",
        name: "Torneira Elétrica",
        price: 199.9,
        stock: 27,
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "5",
        name: "Kit Torneira e Ducha",
        price: 249.9,
        stock: 12,
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
    customersList: [
      {
        id: "1",
        name: "Carlos Silva",
        email: "carlos@example.com",
        orders: 8,
        spent: 1245.6,
        lastOrder: "15/04/2025",
      },
      {
        id: "2",
        name: "Maria Oliveira",
        email: "maria@example.com",
        orders: 5,
        spent: 789.3,
        lastOrder: "14/04/2025",
      },
      {
        id: "3",
        name: "João Santos",
        email: "joao@example.com",
        orders: 3,
        spent: 459.7,
        lastOrder: "10/04/2025",
      },
      {
        id: "4",
        name: "Ana Pereira",
        email: "ana@example.com",
        orders: 2,
        spent: 299.8,
        lastOrder: "05/04/2025",
      },
      {
        id: "5",
        name: "Pedro Costa",
        email: "pedro@example.com",
        orders: 1,
        spent: 259.8,
        lastOrder: "01/04/2025",
      },
    ],
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
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link href="/admin" className="flex items-center gap-2 font-bold text-xl text-primary">
              <span>Painel Admin</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                href="/admin"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/admin/products"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Package className="h-4 w-4" />
                Produtos
              </Link>
              <Link
                href="/admin/orders"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ShoppingCart className="h-4 w-4" />
                Pedidos
              </Link>
              <Link
                href="/admin/customers"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Clientes
              </Link>
              <Link
                href="/admin/analytics"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <BarChart3 className="h-4 w-4" />
                Análises
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Settings className="h-4 w-4" />
                Configurações
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6 lg:h-[60px]">
          <Link href="/" className="lg:hidden">
            <Package className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Pesquisar..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <Link href="/" className="flex items-center gap-2 text-sm font-medium">
            <Home className="h-4 w-4" />
            Ir para a loja
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Image src="/placeholder-user.jpg" width="32" height="32" className="rounded-full" alt="Avatar" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="overview">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <TabsList>
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="orders">Pedidos</TabsTrigger>
                <TabsTrigger value="products">Produtos</TabsTrigger>
                <TabsTrigger value="customers">Clientes</TabsTrigger>
                <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ {dashboardData.revenue.total.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <span className={`mr-1 ${dashboardData.revenue.isUp ? "text-green-500" : "text-red-500"}`}>
                        {dashboardData.revenue.isUp ? "↑" : "↓"} {dashboardData.revenue.percentage}%
                      </span>
                      em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.orders.total}</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <span className={`mr-1 ${dashboardData.orders.isUp ? "text-green-500" : "text-red-500"}`}>
                        {dashboardData.orders.isUp ? "↑" : "↓"} {dashboardData.orders.percentage}%
                      </span>
                      em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Clientes</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.customersMetrics.total}</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <span className={`mr-1 ${dashboardData.customersMetrics.isUp ? "text-green-500" : "text-red-500"}`}>
                        {dashboardData.customersMetrics.percentage}%
                      </span>
                      em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Produtos</CardTitle>
                    <Box className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.productsMetrics.total}</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <span className={`mr-1 ${dashboardData.productsMetrics.isUp ? "text-green-500" : "text-red-500"}`}>
                        {dashboardData.productsMetrics.percentage}%
                      </span>
                      em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Pedidos Recentes</CardTitle>
                      <CardDescription>Últimos 5 pedidos realizados</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Exportar
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Pedido</TableHead>
                          <TableHead>Cliente</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dashboardData.recentOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">#{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>
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
                            </TableCell>
                            <TableCell className="text-right">R$ {order.total.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Ver Todos os Pedidos
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Produtos em Estoque Baixo</CardTitle>
                    <CardDescription>Produtos com menos de 20 unidades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.productsList
                        .filter((product) => product.stock < 20)
                        .map((product) => (
                          <div key={product.id} className="flex items-center gap-4">
                            <div className="relative h-10 w-10 overflow-hidden rounded">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium leading-none">{product.name}</p>
                              <p className="text-sm text-muted-foreground">R$ {product.price.toFixed(2)}</p>
                            </div>
                            <div className="text-sm font-medium">
                              {product.stock < 10 ? (
                                <span className="text-red-500">{product.stock} un.</span>
                              ) : (
                                <span className="text-yellow-500">{product.stock} un.</span>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Gerenciar Estoque
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Produtos Mais Vendidos</CardTitle>
                    <CardDescription>Top 5 produtos mais vendidos este mês</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produto</TableHead>
                          <TableHead>Preço</TableHead>
                          <TableHead>Vendas</TableHead>
                          <TableHead className="text-right">Receita</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Torneira Monocomando</TableCell>
                          <TableCell>R$ 129,90</TableCell>
                          <TableCell>42</TableCell>
                          <TableCell className="text-right">R$ 5.455,80</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Torneira Bica Alta</TableCell>
                          <TableCell>R$ 159,90</TableCell>
                          <TableCell>38</TableCell>
                          <TableCell className="text-right">R$ 6.076,20</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Kit Torneira e Ducha</TableCell>
                          <TableCell>R$ 249,90</TableCell>
                          <TableCell>25</TableCell>
                          <TableCell className="text-right">R$ 6.247,50</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Torneira Elétrica</TableCell>
                          <TableCell>R$ 199,90</TableCell>
                          <TableCell>18</TableCell>
                          <TableCell className="text-right">R$ 3.598,20</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Torneira para Banheiro</TableCell>
                          <TableCell>R$ 89,90</TableCell>
                          <TableCell>15</TableCell>
                          <TableCell className="text-right">R$ 1.348,50</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Ações Rápidas</CardTitle>
                    <CardDescription>Acesso rápido às principais funções</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full justify-start" size="lg">
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Produto
                    </Button>
                    <Button className="w-full justify-start" variant="outline" size="lg">
                      <Truck className="mr-2 h-4 w-4" />
                      Atualizar Status de Pedido
                    </Button>
                    <Button className="w-full justify-start" variant="outline" size="lg">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Gerar Relatório
                    </Button>
                    <Button className="w-full justify-start" variant="outline" size="lg">
                      <Settings className="mr-2 h-4 w-4" />
                      Configurações da Loja
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Status dos Pedidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Pendentes</span>
                      <span className="font-bold">{dashboardData.orders.pending}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Em Processamento</span>
                      <span className="font-bold">{dashboardData.orders.processing}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Enviados</span>
                      <span className="font-bold">{dashboardData.orders.shipped}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Entregues</span>
                      <span className="font-bold">{dashboardData.orders.delivered}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Métricas de Produtos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Total de Produtos</span>
                      <span className="font-bold">{dashboardData.productsMetrics.total}</span>
                    </div>
                    <div className="flex items-center justify-between text-yellow-600">
                      <span>Estoque Baixo</span>
                      <span className="font-bold">{dashboardData.productsMetrics.lowStock}</span>
                    </div>
                    <div className="flex items-center justify-between text-red-600">
                      <span>Fora de Estoque</span>
                      <span className="font-bold">{dashboardData.productsMetrics.outOfStock}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="customers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Clientes</CardTitle>
                  <CardDescription>Análise detalhada dos clientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.customersList.map((customer) => (
                      <div key={customer.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R$ {customer.spent.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">{customer.orders} pedidos</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.platformMetrics.conversionRate}%</div>
                    <p className="text-xs text-muted-foreground">Taxa de conversão de visitantes em compradores</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Abandono de Carrinho</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.platformMetrics.cartAbandonmentRate}%</div>
                    <p className="text-xs text-muted-foreground">Taxa de carrinhos abandonados</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tempo Médio de Entrega</CardTitle>
                    <Truck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.platformMetrics.averageDeliveryTime} dias</div>
                    <p className="text-xs text-muted-foreground">Tempo médio de entrega dos pedidos</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Status dos Pedidos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Pendentes</span>
                        <span className="font-bold">{dashboardData.orders.pending}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Em Processamento</span>
                        <span className="font-bold">{dashboardData.orders.processing}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Enviados</span>
                        <span className="font-bold">{dashboardData.orders.shipped}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Entregues</span>
                        <span className="font-bold">{dashboardData.orders.delivered}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Métricas de Produtos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Total de Produtos</span>
                        <span className="font-bold">{dashboardData.productsMetrics.total}</span>
                      </div>
                      <div className="flex items-center justify-between text-yellow-600">
                        <span>Estoque Baixo</span>
                        <span className="font-bold">{dashboardData.productsMetrics.lowStock}</span>
                      </div>
                      <div className="flex items-center justify-between text-red-600">
                        <span>Fora de Estoque</span>
                        <span className="font-bold">{dashboardData.productsMetrics.outOfStock}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
