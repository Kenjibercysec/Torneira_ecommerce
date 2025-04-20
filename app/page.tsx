import Link from "next/link"
import { ShoppingCart, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { HeroSection } from "@/components/hero-section"
import { WhatsappBanner } from "@/components/whatsapp-banner"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <span>Torneirinha do Carlão</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Carrinho</span>
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Perfil</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button>Entrar</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <HeroSection />
        <WhatsappBanner />
        <section className="container py-12">
          <h2 className="text-3xl font-bold mb-8">Nossos Produtos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ProductCard
              id="1"
              name="Torneira Monocomando"
              price={129.9}
              image="/placeholder.svg?height=300&width=300"
              description="Torneira monocomando para cozinha com design moderno"
            />
            <ProductCard
              id="2"
              name="Torneira Bica Alta"
              price={159.9}
              image="/placeholder.svg?height=300&width=300"
              description="Torneira com bica alta para cozinha, acabamento cromado"
            />
            <ProductCard
              id="3"
              name="Torneira para Banheiro"
              price={89.9}
              image="/placeholder.svg?height=300&width=300"
              description="Torneira para banheiro com acabamento fosco"
            />
            <ProductCard
              id="4"
              name="Torneira Elétrica"
              price={199.9}
              image="/placeholder.svg?height=300&width=300"
              description="Torneira elétrica com aquecimento instantâneo"
            />
            <ProductCard
              id="5"
              name="Kit Torneira e Ducha"
              price={249.9}
              image="/placeholder.svg?height=300&width=300"
              description="Kit completo com torneira e ducha para banheiro"
            />
            <ProductCard
              id="6"
              name="Torneira Automática"
              price={179.9}
              image="/placeholder.svg?height=300&width=300"
              description="Torneira com sensor automático para economia de água"
            />
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Torneirinha do Carlão</h3>
              <p className="text-muted-foreground">
                Sua loja especializada em torneiras e acessórios para banheiro e cozinha.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-muted-foreground hover:text-foreground">
                    Produtos
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <address className="not-italic text-muted-foreground">
                <p>Rua das Torneiras, 123</p>
                <p>São Paulo, SP</p>
                <p>contato@torneirinhadocarlao.com.br</p>
                <p>(11) 99999-9999</p>
              </address>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Torneirinha do Carlão. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
