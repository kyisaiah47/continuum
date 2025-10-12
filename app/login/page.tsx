"use client"

import Link from "next/link"
import { useState } from "react"
import { GridBackground, ButtonPurple } from "@/components/ui/plural"
import { ContinuumLogo } from "@/components/brand/continuum-logo"
import { ArrowRight, Mail, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { login } from "@/lib/api/auth"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { user, error } = await login({
      email,
      password,
    })

    if (error || !user) {
      toast.error("Authentication failed", {
        description: error || "Invalid email or password",
      })
      setLoading(false)
    } else {
      toast.success("Welcome back", {
        description: "Redirecting to dashboard...",
      })

      // Use preferred product from user profile or default to ethos
      const preferredProduct = user.preferred_product || "ethos"

      router.push(`/${preferredProduct}/dashboard`)
    }
  }

  return (
    <GridBackground showCorners className="min-h-screen flex items-center justify-center p-8">
      {/* Subtle gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[450px]">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-3 mb-16 group">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-all p-2">
            <ContinuumLogo className="h-full w-full text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight">Continuum</span>
            <span className="text-[10px] text-white/40 uppercase tracking-[0.15em]">The Trust Layer</span>
          </div>
        </Link>

        {/* Main Card */}
        <div className="glass-card p-12 rounded-2xl">
          <div className="mb-8">
            <h1 className="text-4xl font-light tracking-tight text-white mb-2">
              Welcome back
            </h1>
            <p className="text-base text-white/50">
              Sign in to access the Ethos platform
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium uppercase tracking-[0.15em] text-white/40 mb-3">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full h-12 pl-12 pr-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-medium uppercase tracking-[0.15em] text-white/40 mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-12 pl-12 pr-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-end">
              <Link href="/forgot-password" className="text-sm text-white/40 hover:text-primary transition">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <ButtonPurple
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-medium"
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </ButtonPurple>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.08]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-xs text-white/30 uppercase tracking-[0.15em]">
                Or
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-white/50">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:text-primary/80 font-medium transition">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 glass-card p-6 rounded-lg border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <span className="text-primary text-xs">🎯</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-white mb-1">Demo Credentials</h3>
              <p className="text-xs text-white/50 mb-3">Try the platform with our demo account</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded">
                  <span className="text-xs text-white/40">Email:</span>
                  <code className="text-xs text-primary font-mono">demo@continuum.app</code>
                </div>
                <div className="flex items-center justify-between px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded">
                  <span className="text-xs text-white/40">Password:</span>
                  <code className="text-xs text-primary font-mono">demo123456</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-white/30">
            Protected by end-to-end encryption on Polkadot
          </p>
        </div>
      </div>
    </GridBackground>
  )
}
