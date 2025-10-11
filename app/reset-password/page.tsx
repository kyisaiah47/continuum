"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { GridBackground, ButtonPurple } from "@/components/ui/plural"
import { ContinuumLogo } from "@/components/brand/continuum-logo"
import { Lock, CheckCircle } from "lucide-react"
import { supabase } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [passwordReset, setPasswordReset] = useState(false)

  useEffect(() => {
    // Check if we have a valid session from the email link
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        toast.error("Invalid or expired reset link")
        router.push("/forgot-password")
      }
    })
  }, [router])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords don't match")
      return
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password: password,
    })

    if (error) {
      toast.error("Failed to reset password", {
        description: error.message,
      })
      setLoading(false)
    } else {
      setPasswordReset(true)
      toast.success("Password reset successful")
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    }
  }

  if (passwordReset) {
    return (
      <GridBackground showCorners className="min-h-screen flex items-center justify-center p-8">
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/40 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-[450px]">
          <Link href="/" className="inline-flex items-center gap-3 mb-16 group">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-all p-2">
              <ContinuumLogo className="h-full w-full text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight">Continuum</span>
              <span className="text-[10px] text-white/40 uppercase tracking-[0.15em]">The Trust Layer</span>
            </div>
          </Link>

          <div className="glass-card p-12 rounded-2xl text-center">
            <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>

            <h1 className="text-4xl font-light tracking-tight text-white mb-3">
              Password updated
            </h1>
            <p className="text-base text-white/50 mb-8">
              Your password has been successfully reset. Redirecting to login...
            </p>
          </div>
        </div>
      </GridBackground>
    )
  }

  return (
    <GridBackground showCorners className="min-h-screen flex items-center justify-center p-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-[450px]">
        <Link href="/" className="inline-flex items-center gap-3 mb-16 group">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-all p-2">
            <ContinuumLogo className="h-full w-full text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight">Continuum</span>
            <span className="text-[10px] text-white/40 uppercase tracking-[0.15em]">The Trust Layer</span>
          </div>
        </Link>

        <div className="glass-card p-12 rounded-2xl">
          <div className="mb-8">
            <h1 className="text-4xl font-light tracking-tight text-white mb-2">
              Create new password
            </h1>
            <p className="text-base text-white/50">
              Enter your new password below
            </p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-xs font-medium uppercase tracking-[0.15em] text-white/40 mb-3">
                New Password
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
                  minLength={6}
                  className="w-full h-12 pl-12 pr-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <p className="mt-2 text-xs text-white/40">Must be at least 6 characters</p>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-xs font-medium uppercase tracking-[0.15em] text-white/40 mb-3">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full h-12 pl-12 pr-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <ButtonPurple
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-medium"
            >
              {loading ? "Resetting..." : "Reset password"}
            </ButtonPurple>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-white/30">
            Protected by end-to-end encryption on Polkadot
          </p>
        </div>
      </div>
    </GridBackground>
  )
}
