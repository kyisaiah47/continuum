"use client"

import Link from "next/link"
import { useState } from "react"
import { GridBackground, ButtonPurple } from "@/components/ui/plural"
import { ContinuumLogo } from "@/components/brand/continuum-logo"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import { supabase } from "@/lib/supabase-client"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      toast.error("Failed to send reset email", {
        description: error.message,
      })
      setLoading(false)
    } else {
      setEmailSent(true)
      toast.success("Reset email sent", {
        description: "Check your inbox for the password reset link",
      })
      setLoading(false)
    }
  }

  if (emailSent) {
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
              Check your email
            </h1>
            <p className="text-base text-white/50 mb-8">
              We've sent a password reset link to <span className="text-white">{email}</span>
            </p>

            <div className="space-y-4">
              <p className="text-sm text-white/40">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <ButtonPurple
                onClick={() => setEmailSent(false)}
                className="w-full h-12 text-base font-medium"
              >
                Try different email
              </ButtonPurple>
              <Link
                href="/login"
                className="block text-sm text-white/40 hover:text-primary transition"
              >
                Back to sign in
              </Link>
            </div>
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
              Reset password
            </h1>
            <p className="text-base text-white/50">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-6">
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

            <ButtonPurple
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-medium"
            >
              {loading ? "Sending..." : "Send reset link"}
            </ButtonPurple>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-primary transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </div>
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
