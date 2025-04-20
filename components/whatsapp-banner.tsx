import Link from "next/link"
import { MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

export function WhatsappBanner() {
  return (
    <div className="bg-green-600 text-white py-4">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-6 w-6" />
          <p className="font-medium">Acompanhe seu pedido pelo WhatsApp</p>
        </div>
        <Link href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
          <Button variant="secondary" className="whitespace-nowrap">
            Falar no WhatsApp
          </Button>
        </Link>
      </div>
    </div>
  )
}
