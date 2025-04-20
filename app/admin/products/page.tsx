"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpDown, ChevronDown, Download, Edit, MoreHorizontal, Plus, Search, Trash2, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function AdminProducts() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const { toast } = useToast()

  // Dados simulados de produtos
  const products = [
    {
      id: "1",
      name: "Torneira Monocomando",
      price: 129.9,
      stock: 45,
      category: "Cozinha",
      status: "Ativo",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "2",
      name: "Torneira Bica Alta",
      price: 159.9,
      stock: 32,
      category: "Cozinha",
      status: "Ativo",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "3",
      name: "Torneira para Banheiro",
      price: 89.9,
      stock: 18,
      category: "Banheiro",
      status: "Ativo",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "4",
      name: "Torneira Elétrica",
      price: 199.9,
      stock: 27,
      category: "Cozinha",
      status: "Ativo",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "5",
      name: "Kit Torneira e Ducha",
      price: 249.9,
      stock: 12,
      category: "Banheiro",
      status: "Ativo",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "6",
      name: "Torneira Automática",
      price: 179.9,
      stock: 8,
      category: "Banheiro",
      status: "Baixo estoque",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "7",
      name: "Torneira Cascata",
      price: 219.9,
      stock: 0,
      category: "Banheiro",
      status: "Esgotado",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "8",
      name: "Torneira de Parede",
      price: 149.9,
      stock: 5,
      category: "Cozinha",
      status: "Baixo estoque",
      image: "/placeholder.svg?height=50&width=50",
    },
  ]

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const toggleAllProducts = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(products.map((product) => product.id))
    }
  }

  const handleDeleteProduct = (productId: string) => {
    toast({
      title: "Produto excluído",
      description: "O produto foi excluído com sucesso",
    })
  }

  const handleBulkAction = (action: string) => {
    if (selectedProducts.length === 0) {
      toast({
        title: "Nenhum produto selecionado",
        description: "Selecione pelo menos um produto para realizar esta ação",
      })
      return
    }

    toast({
      title: `${action} aplicada`,
      description: `A ação foi aplicada a ${selectedProducts.length} produtos`,
    })
    setSelectedProducts([])
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Produto
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Produtos</CardTitle>
          <CardDescription>
            Gerencie todos os produtos da sua loja. Atualmente exibindo {products.length} produtos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Buscar produtos..." className="pl-8 w-full md:w-[300px]" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    <SelectItem value="kitchen">Cozinha</SelectItem>
                    <SelectItem value="bathroom">Banheiro</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="low">Baixo estoque</SelectItem>
                    <SelectItem value="out">Esgotado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Importar
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" disabled={selectedProducts.length === 0}>
                      Ações em Massa
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleBulkAction("Atualização de preço")}>
                      Atualizar Preço
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction("Atualização de estoque")}>
                      Atualizar Estoque
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleBulkAction("Exclusão")} className="text-red-600">
                      Excluir Selecionados
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedProducts.length === products.length && products.length > 0}
                        onCheckedChange={toggleAllProducts}
                      />
                    </TableHead>
                    <TableHead className="w-[80px]">Imagem</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        Produto
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        Preço
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        Estoque
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() => toggleProductSelection(product.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="relative h-10 w-10 overflow-hidden rounded">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <span
                          className={product.stock === 0 ? "text-red-500" : product.stock < 10 ? "text-yellow-500" : ""}
                        >
                          {product.stock}
                        </span>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            product.status === "Ativo"
                              ? "bg-green-100 text-green-800"
                              : product.status === "Esgotado"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {product.status}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Plus className="mr-2 h-4 w-4" />
                              Atualizar Estoque
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDeleteProduct(product.id)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Mostrando <strong>1</strong> a <strong>{products.length}</strong> de <strong>{products.length}</strong>{" "}
                resultados
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Próximo
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
