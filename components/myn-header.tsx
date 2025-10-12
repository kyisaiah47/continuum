"use client"

import Link from "next/link"
import { LogOut } from "lucide-react"
import { ProductSwitcher } from "@/components/product-switcher"
import { ButtonPurple } from "@/components/ui/plural"
import { logout } from "@/lib/api/auth"

interface MynHeaderProps {
  currentPage?: 'dashboard' | 'vault' | 'requests' | 'access' | 'earnings' | 'settings'
}

export function MynHeader({ currentPage }: MynHeaderProps) {
  async function handleLogout() {
    await logout()
  }

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-background/80 backdrop-blur-xl">
      <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
        <ProductSwitcher />

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/myn/dashboard"
            className={`text-sm transition tracking-wide ${
              currentPage === 'dashboard' ? 'text-primary' : 'text-white/60 hover:text-white'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/myn/vault"
            className={`text-sm transition tracking-wide ${
              currentPage === 'vault' ? 'text-primary' : 'text-white/60 hover:text-white'
            }`}
          >
            Vault
          </Link>
          <Link
            href="/myn/requests"
            className={`text-sm transition tracking-wide ${
              currentPage === 'requests' ? 'text-primary' : 'text-white/60 hover:text-white'
            }`}
          >
            Requests
          </Link>
          <Link
            href="/myn/access"
            className={`text-sm transition tracking-wide ${
              currentPage === 'access' ? 'text-primary' : 'text-white/60 hover:text-white'
            }`}
          >
            Access
          </Link>
          <Link
            href="/myn/earnings"
            className={`text-sm transition tracking-wide ${
              currentPage === 'earnings' ? 'text-primary' : 'text-white/60 hover:text-white'
            }`}
          >
            Earnings
          </Link>
          <Link
            href="/myn/settings"
            className={`text-sm transition tracking-wide ${
              currentPage === 'settings' ? 'text-primary' : 'text-white/60 hover:text-white'
            }`}
          >
            Settings
          </Link>
          <div className="h-6 w-px bg-white/[0.08]" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition tracking-wide"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </nav>
      </div>
    </header>
  )
}
