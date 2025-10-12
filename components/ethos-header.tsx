"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { ProductSwitcher } from "@/components/product-switcher"
import { ButtonPurple } from "@/components/ui/plural"
import { supabase } from "@/lib/supabase/client"

interface EthosHeaderProps {
  currentPage?: 'dashboard' | 'contacts' | 'deals' | 'activities' | 'tasks' | 'data-access'
}

export function EthosHeader({ currentPage }: EthosHeaderProps) {
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-background/80 backdrop-blur-xl">
      <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
        <ProductSwitcher />

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/ethos/dashboard"
            className={`text-sm transition tracking-wide ${
              currentPage === 'dashboard' ? 'text-primary' : 'text-white/60 hover:text-white'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/ethos/contacts"
            className={`text-sm transition tracking-wide ${
              currentPage === 'contacts' ? 'text-primary' : 'text-white/60 hover:text-white'
            }`}
          >
            Contacts
          </Link>
          <Link
            href="/ethos/deals"
            className={`text-sm transition tracking-wide ${
              currentPage === 'deals' ? 'text-primary' : 'text-white/60 hover:text-white'
            }`}
          >
            Deals
          </Link>
          <Link
            href="/ethos/activities"
            className={`text-sm transition tracking-wide ${
              currentPage === 'activities' ? 'text-primary' : 'text-white/60 hover:text-white'
            }`}
          >
            Activities
          </Link>
          <Link
            href="/ethos/tasks"
            className={`text-sm transition tracking-wide ${
              currentPage === 'tasks' ? 'text-primary' : 'text-white/60 hover:text-white'
            }`}
          >
            Tasks
          </Link>
          <div className="h-6 w-px bg-white/[0.08]" />
          <ButtonPurple className="h-9 px-5 text-sm" asChild>
            <Link href="/ethos/data-access">Request Data</Link>
          </ButtonPurple>
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
