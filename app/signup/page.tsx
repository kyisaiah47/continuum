"use client"

import Link from "next/link"
import { useState } from "react"
import { GridBackground, ButtonPurple } from "@/components/ui/plural"
import { ContinuumLogo } from "@/components/brand/continuum-logo"
import { ArrowRight, Mail, Lock, User } from "lucide-react"
import { supabase } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (error) {
      toast.error("Sign up failed", {
        description: error.message,
      })
      setLoading(false)
    } else {
      toast.success("Welcome to Continuum", {
        description: "Your account has been created successfully.",
      })
      router.push("/dashboard")
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
              Create account
            </h1>
            <p className="text-base text-white/50">
              Start building trust-first relationships
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-xs font-medium uppercase tracking-[0.15em] text-white/40 mb-3">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full h-12 pl-12 pr-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

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
                  minLength={8}
                  className="w-full h-12 pl-12 pr-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <p className="mt-2 text-xs text-white/30">
                Minimum 8 characters
              </p>
            </div>

            {/* Terms */}
            <div className="pt-2">
              <p className="text-xs text-white/40 leading-relaxed">
                By creating an account, you agree to our{" "}
                <Link href="#" className="text-primary hover:text-primary/80 transition">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-primary hover:text-primary/80 transition">
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* Submit Button */}
            <ButtonPurple
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-medium"
            >
              {loading ? "Creating account..." : "Create Account"}
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

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-white/50">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition">
                Sign in
              </Link>
            </p>
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
