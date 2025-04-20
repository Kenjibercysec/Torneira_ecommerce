"use client"

import { type ReactNode, useEffect, useState } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

// Inicializar Stripe (em um ambiente real, usaria uma variável de ambiente)
const stripePromise = loadStripe("pk_test_sample_key")

interface StripeProps {
  children: ReactNode
}

export function Stripe({ children }: StripeProps) {
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    // Simulação - em um ambiente real, faria uma chamada à API para criar um intent de pagamento
    const mockClientSecret = "pi_mock_secret_" + Math.random().toString(36).substring(2, 15)
    setClientSecret(mockClientSecret)
  }, [])

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  }

  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          {children}
        </Elements>
      )}
    </div>
  )
}
