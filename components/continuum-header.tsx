import Link from "next/link"
import { ProductSwitcher } from "@/components/product-switcher"
import { ButtonPurple } from "@/components/ui/plural"

interface ContinuumHeaderProps {
  currentPage?: 'dashboard' | 'contracts' | 'explorer' | 'api-keys' | 'docs' | 'playground'
}

export function ContinuumHeader({ currentPage }: ContinuumHeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-background/80 backdrop-blur-xl">
      <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
        <ProductSwitcher />

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/continuum/dashboard"
            className={`text-sm transition tracking-wide ${
              currentPage === 'dashboard' ? 'text-primary' : 'text-white/60 hover:text-white'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/continuum/contracts"
            className={`text-sm transition tracking-wide ${
              currentPage === 'contracts' ? 'text-primary' : 'text-white/60 hover:text-white'
            }`}
          >
            Contracts
          </Link>
          <Link
            href="/continuum/explorer"
            className={`text-sm transition tracking-wide ${
              currentPage === 'explorer' ? 'text-primary' : 'text-white/60 hover:text-white'
            }`}
          >
            Explorer
          </Link>
          <Link
            href="/continuum/api-keys"
            className={`text-sm transition tracking-wide ${
              currentPage === 'api-keys' ? 'text-primary' : 'text-white/60 hover:text-white'
            }`}
          >
            API Keys
          </Link>
          <Link
            href="/continuum/docs"
            className={`text-sm transition tracking-wide ${
              currentPage === 'docs' ? 'text-primary' : 'text-white/60 hover:text-white'
            }`}
          >
            Docs
          </Link>
          <div className="h-6 w-px bg-white/[0.08]" />
          <ButtonPurple className="h-9 px-5 text-sm" asChild>
            <Link href="/continuum/playground">Playground</Link>
          </ButtonPurple>
        </nav>
      </div>
    </header>
  )
}
