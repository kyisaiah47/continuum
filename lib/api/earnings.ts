// Earnings API Functions
import { createClient } from "@/lib/supabase/client"

export interface Earning {
  id: string
  user_id: string
  request_id: string | null
  amount: number
  currency: string
  business_name: string | null
  business_user_id: string | null
  transaction_hash: string | null
  status: "pending" | "completed" | "failed"
  created_at: string
  paid_at: string | null
}

// Get all earnings for the current user
export async function getEarnings(): Promise<Earning[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("ownbase_earnings")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

// Get earnings statistics
export async function getEarningsStats() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("ownbase_earnings")
    .select("amount, status, created_at, currency")

  if (error) throw error

  const totalEarnings = data?.reduce(
    (sum, e) => (e.status === "completed" ? sum + parseFloat(e.amount.toString()) : sum),
    0
  ) || 0

  const pendingEarnings = data?.reduce(
    (sum, e) => (e.status === "pending" ? sum + parseFloat(e.amount.toString()) : sum),
    0
  ) || 0

  const totalTransactions = data?.length || 0
  const completedTransactions = data?.filter(e => e.status === "completed").length || 0

  // Calculate monthly trend (last 6 months)
  const now = new Date()
  const monthlyData: Record<string, number> = {}

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key = date.toISOString().substring(0, 7) // YYYY-MM
    monthlyData[key] = 0
  }

  data?.forEach(earning => {
    if (earning.status === "completed") {
      const month = earning.created_at.substring(0, 7)
      if (monthlyData[month] !== undefined) {
        monthlyData[month] += parseFloat(earning.amount.toString())
      }
    }
  })

  const monthlyTrend = Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    amount,
  }))

  return {
    totalEarnings,
    pendingEarnings,
    totalTransactions,
    completedTransactions,
    monthlyTrend,
    currency: data?.[0]?.currency || "DOT",
  }
}

// Get recent earnings (last N transactions)
export async function getRecentEarnings(limit: number = 10): Promise<Earning[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("ownbase_earnings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}

// Create a new earning record
export async function createEarning(
  earning: Pick<
    Earning,
    "request_id" | "amount" | "currency" | "business_name" | "business_user_id"
  >
): Promise<Earning> {
  const supabase = createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) throw new Error("Not authenticated")

  const { data, error } = await supabase
    .from("ownbase_earnings")
    .insert({
      user_id: user.id,
      ...earning,
      status: "pending",
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Update earning status
export async function updateEarningStatus(
  earningId: string,
  status: "pending" | "completed" | "failed",
  transactionHash?: string
): Promise<Earning> {
  const supabase = createClient()

  const update: any = { status }

  if (status === "completed") {
    update.paid_at = new Date().toISOString()
  }

  if (transactionHash) {
    update.transaction_hash = transactionHash
  }

  const { data, error } = await supabase
    .from("ownbase_earnings")
    .update(update)
    .eq("id", earningId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Get earnings by request ID
export async function getEarningsByRequest(requestId: string): Promise<Earning[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("ownbase_earnings")
    .select("*")
    .eq("request_id", requestId)

  if (error) throw error
  return data || []
}
