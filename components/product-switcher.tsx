"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MynLogo } from "@/components/brand/myn-logo"
import { EthosLogo } from "@/components/brand/ethos-logo"
import { ContinuumLogo } from "@/components/brand/continuum-logo"
import { ChevronDown } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

type Product = "myn" | "ethos" | "continuum"

const products = [
  {
    id: "myn" as Product,
    name: "Myn",
    description: "Personal Wallet",
    logo: MynLogo,
    href: "/myn/dashboard",
    color: "#C5B6F7"
  },
  {
    id: "ethos" as Product,
    name: "Ethos",
    description: "CRM",
    logo: EthosLogo,
    href: "/ethos/dashboard",
    color: "#8b5cf6"
  },
  {
    id: "continuum" as Product,
    name: "Continuum",
    description: "Network",
    logo: ContinuumLogo,
    href: "/continuum/dashboard",
    color: "#00D4FF"
  }
]

export function ProductSwitcher() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product>("ethos")

  useEffect(() => {
    // Detect current product from URL and save to localStorage and database
    let product: Product | null = null

    if (pathname.startsWith("/myn")) {
      product = "myn"
    } else if (pathname.startsWith("/ethos")) {
      product = "ethos"
    } else if (pathname.startsWith("/continuum")) {
      product = "continuum"
    }

    if (product) {
      setCurrentProduct(product)
      localStorage.setItem("lastUsedProduct", product)

      // Also save to database
      const updateProductPreference = async () => {
        try {
          const supabase = createClient()
          const { data: { user } } = await supabase.auth.getUser()

          if (user) {
            await supabase
              .from("ownbase_user_profiles")
              .update({ last_product: product })
              .eq("id", user.id)
          }
        } catch (error) {
          console.error("Failed to update product preference:", error)
        }
      }

      updateProductPreference()
    }
  }, [pathname])

  const current = products.find(p => p.id === currentProduct) || products[1]
  const CurrentLogo = current.logo

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-all"
      >
        <CurrentLogo className="h-6 w-6" style={{ color: current.color }} />
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold text-white">{current.name}</span>
          <span className="text-[10px] text-white/40 uppercase tracking-[0.15em]">
            {current.description}
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 text-white/40 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-2 w-64 bg-[#1a1f2e] border border-white/[0.08] rounded-lg shadow-2xl z-50 overflow-hidden">
            {products.map((product) => {
              const Logo = product.logo
              const isCurrent = product.id === currentProduct

              return (
                <Link
                  key={product.id}
                  href={product.href}
                  onClick={() => {
                    setIsOpen(false)
                    localStorage.setItem("lastUsedProduct", product.id)
                  }}
                  className={`flex items-center gap-3 px-4 py-3 transition-all relative overflow-hidden ${
                    isCurrent
                      ? "bg-white/[0.05]"
                      : "hover:bg-white/[0.03]"
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                  )}
                  <Logo className="h-6 w-6" style={{ color: product.color }} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{product.name}</div>
                    <div className="text-xs text-white/40">{product.description}</div>
                  </div>
                  {isCurrent && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </Link>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
