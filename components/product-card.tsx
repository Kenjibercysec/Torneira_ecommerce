"use client"

import Image from "next/image"
import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  description: string
}

export function ProductCard({ id, name, price, image, description }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleAddToCart = async () => {
    setIsLoading(true)

    // Simulação de adição ao carrinho
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Produto adicionado",
        description: `${name} foi adicionado ao seu carrinho.`,
      })
    }, 1000)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1">{name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{description}</p>
        <p className="font-bold text-lg">R$ {price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button className="w-full" onClick={handleAddToCart} disabled={isLoading}>
          {isLoading ? "Adicionando..." : "Adicionar ao Carrinho"}
        </Button>
        <Button variant="outline" size="icon" onClick={() => router.push(`/product/${id}`)}>
          <ShoppingCart className="h-4 w-4" />
          <span className="sr-only">Ver detalhes</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
