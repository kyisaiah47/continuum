// Data Access Requests API Functions
import { createClient } from "@/lib/supabase/client"

export interface DataAccessRequest {
  id: string
  business_user_id: string
  customer_wallet: string
  customer_name: string | null
  requested_fields: string[]
  access_duration_days: number
  payment_amount: number
  payment_currency: string
  status: "pending" | "approved" | "rejected" | "expired"
  approved_at: string | null
  expires_at: string | null
  transaction_hash: string | null
  contract_address: string | null
  created_at: string
  updated_at: string
}

// Get all data access requests for the current user as a customer
export async function getCustomerRequests(walletAddress: string): Promise<DataAccessRequest[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("ownbase_data_access_requests")
    .select("*")
    .eq("customer_wallet", walletAddress)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

// Get pending requests for customer
export async function getPendingCustomerRequests(walletAddress: string): Promise<DataAccessRequest[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("ownbase_data_access_requests")
    .select("*")
    .eq("customer_wallet", walletAddress)
    .eq("status", "pending")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

// Get all data access requests created by the business user
export async function getBusinessRequests(): Promise<DataAccessRequest[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("ownbase_data_access_requests")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

// Create a new data access request
export async function createDataAccessRequest(
  request: Pick<
    DataAccessRequest,
    "customer_wallet" | "customer_name" | "requested_fields" | "access_duration_days" | "payment_amount"
  >
): Promise<DataAccessRequest> {
  const supabase = createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) throw new Error("Not authenticated")

  const { data, error } = await supabase
    .from("ownbase_data_access_requests")
    .insert({
      business_user_id: user.id,
      ...request,
      status: "pending",
      payment_currency: "DOT",
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Approve a data access request (customer action)
export async function approveDataAccessRequest(
  requestId: string,
  transactionHash?: string
): Promise<DataAccessRequest> {
  const supabase = createClient()

  const { data: request, error: fetchError } = await supabase
    .from("ownbase_data_access_requests")
    .select("access_duration_days")
    .eq("id", requestId)
    .single()

  if (fetchError) throw fetchError

  const now = new Date()
  const expiresAt = new Date(now.getTime() + request.access_duration_days * 24 * 60 * 60 * 1000)

  const { data, error } = await supabase
    .from("ownbase_data_access_requests")
    .update({
      status: "approved",
      approved_at: now.toISOString(),
      expires_at: expiresAt.toISOString(),
      transaction_hash: transactionHash,
    })
    .eq("id", requestId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Reject a data access request (customer action)
export async function rejectDataAccessRequest(requestId: string): Promise<DataAccessRequest> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("ownbase_data_access_requests")
    .update({
      status: "rejected",
    })
    .eq("id", requestId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Get a single data access request
export async function getDataAccessRequest(requestId: string): Promise<DataAccessRequest | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("ownbase_data_access_requests")
    .select("*")
    .eq("id", requestId)
    .single()

  if (error) throw error
  return data
}

// Check if access is still valid
export function isAccessValid(request: DataAccessRequest): boolean {
  if (request.status !== "approved") return false
  if (!request.expires_at) return false

  const now = new Date()
  const expiresAt = new Date(request.expires_at)

  return now < expiresAt
}

// Get active (approved and not expired) requests
export async function getActiveRequests(walletAddress: string): Promise<DataAccessRequest[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("ownbase_data_access_requests")
    .select("*")
    .eq("customer_wallet", walletAddress)
    .eq("status", "approved")
    .order("created_at", { ascending: false })

  if (error) throw error

  // Filter out expired ones
  const now = new Date()
  return (data || []).filter(request => {
    if (!request.expires_at) return false
    return new Date(request.expires_at) > now
  })
}

// Get request statistics
export async function getRequestStats(walletAddress: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("ownbase_data_access_requests")
    .select("status, payment_amount")
    .eq("customer_wallet", walletAddress)

  if (error) throw error

  const totalRequests = data?.length || 0
  const pendingRequests = data?.filter(r => r.status === "pending").length || 0
  const approvedRequests = data?.filter(r => r.status === "approved").length || 0
  const rejectedRequests = data?.filter(r => r.status === "rejected").length || 0

  const potentialEarnings = data
    ?.filter(r => r.status === "pending")
    .reduce((sum, r) => sum + parseFloat(r.payment_amount.toString()), 0) || 0

  return {
    totalRequests,
    pendingRequests,
    approvedRequests,
    rejectedRequests,
    potentialEarnings,
  }
}
