import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Torneirinha do Carlão
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                As melhores torneiras e acessórios para sua casa com qualidade e preço justo. Entrega rápida para todo o
                Brasil.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/products">
                <Button size="lg" className="px-8">
                  Ver Produtos
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="px-8">
                  Fale Conosco
                </Button>
              </Link>
            </div>
          </div>
          <div className="mx-auto lg:mx-0 relative aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src="/placeholder.svg?height=720&width=1280"
              alt="Torneiras de alta qualidade"
              width={1280}
              height={720}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
