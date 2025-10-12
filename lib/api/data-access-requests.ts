// Data Access Requests API Functions
import { getSessionUserId } from "@/lib/api/auth"
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
  // DEMO: Return mock pending requests
  return [
    {
      id: "req1",
      business_user_id: "business1",
      customer_wallet: walletAddress,
      customer_name: "Demo User",
      requested_fields: ["name", "email", "phone"],
      access_duration_days: 30,
      payment_amount: 5.0,
      payment_currency: "DOT",
      status: "pending",
      approved_at: null,
      expires_at: null,
      transaction_hash: null,
      contract_address: null,
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "req2",
      business_user_id: "business2",
      customer_wallet: walletAddress,
      customer_name: "Demo User",
      requested_fields: ["email", "company", "job_title"],
      access_duration_days: 60,
      payment_amount: 8.0,
      payment_currency: "DOT",
      status: "pending",
      approved_at: null,
      expires_at: null,
      transaction_hash: null,
      contract_address: null,
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]
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

  const userId = getSessionUserId()
  if (!userId) throw new Error("Not authenticated")

  const { data, error } = await supabase
    .from("ownbase_data_access_requests")
    .insert({
      business_user_id: userId,
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

// Revoke an approved data access request (customer action)
export async function revokeDataAccessRequest(requestId: string): Promise<DataAccessRequest> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("ownbase_data_access_requests")
    .update({
      status: "rejected",
      expires_at: new Date().toISOString(), // Expire immediately
    })
    .eq("id", requestId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Extend an approved data access request (business action)
export async function extendDataAccessRequest(
  requestId: string,
  additionalDays: number,
  additionalPayment: number
): Promise<DataAccessRequest> {
  const supabase = createClient()

  // Get current request
  const { data: request, error: fetchError } = await supabase
    .from("ownbase_data_access_requests")
    .select("expires_at")
    .eq("id", requestId)
    .single()

  if (fetchError) throw fetchError

  // Calculate new expiration date
  const currentExpiration = new Date(request.expires_at || new Date())
  const newExpiration = new Date(currentExpiration.getTime() + additionalDays * 24 * 60 * 60 * 1000)

  const { data, error } = await supabase
    .from("ownbase_data_access_requests")
    .update({
      expires_at: newExpiration.toISOString(),
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
  // DEMO: Return mock active requests
  return [
    {
      id: "req3",
      business_user_id: "business3",
      customer_wallet: walletAddress,
      customer_name: "Demo User",
      requested_fields: ["name", "email"],
      access_duration_days: 30,
      payment_amount: 5.0,
      payment_currency: "DOT",
      status: "approved",
      approved_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      expires_at: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
      transaction_hash: "0x1234567890abcdef",
      contract_address: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "req4",
      business_user_id: "business4",
      customer_wallet: walletAddress,
      customer_name: "Demo User",
      requested_fields: ["email", "phone", "company"],
      access_duration_days: 60,
      payment_amount: 10.0,
      payment_currency: "DOT",
      status: "approved",
      approved_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      expires_at: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
      transaction_hash: "0xabcdef1234567890",
      contract_address: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
      created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]
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
