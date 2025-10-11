import { createClient } from "./client"
import { RealtimeChannel } from "@supabase/supabase-js"

export type RealtimeEvent<T = any> = {
  eventType: "INSERT" | "UPDATE" | "DELETE"
  new: T
  old: T
}

export type RealtimeCallback<T = any> = (event: RealtimeEvent<T>) => void

export class RealtimeSubscription {
  private channel: RealtimeChannel | null = null
  private supabase = createClient()

  /**
   * Subscribe to changes on a specific table
   * @param table - The table name to subscribe to
   * @param callback - Function to call when changes occur
   * @param filter - Optional filter for the subscription (e.g., { column: 'user_id', value: '123' })
   */
  subscribe<T = any>(
    table: string,
    callback: RealtimeCallback<T>,
    filter?: { column: string; value: string }
  ): void {
    const channelName = filter
      ? `${table}:${filter.column}=eq.${filter.value}`
      : table

    this.channel = this.supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table,
          ...(filter && { filter: `${filter.column}=eq.${filter.value}` })
        },
        (payload: any) => {
          callback({
            eventType: payload.eventType,
            new: payload.new,
            old: payload.old
          })
        }
      )
      .subscribe()
  }

  /**
   * Unsubscribe from the channel
   */
  unsubscribe(): void {
    if (this.channel) {
      this.supabase.removeChannel(this.channel)
      this.channel = null
    }
  }
}

/**
 * Subscribe to data access requests for a specific customer wallet
 */
export function subscribeToCustomerRequests(
  walletAddress: string,
  callback: RealtimeCallback
): RealtimeSubscription {
  const subscription = new RealtimeSubscription()
  subscription.subscribe(
    "ownbase_data_access_requests",
    callback,
    { column: "customer_wallet", value: walletAddress }
  )
  return subscription
}

/**
 * Subscribe to earnings for the current user
 */
export function subscribeToEarnings(
  callback: RealtimeCallback
): RealtimeSubscription {
  const subscription = new RealtimeSubscription()
  subscription.subscribe("ownbase_earnings", callback)
  return subscription
}

/**
 * Subscribe to vault changes for the current user
 */
export function subscribeToVault(
  callback: RealtimeCallback
): RealtimeSubscription {
  const subscription = new RealtimeSubscription()
  subscription.subscribe("ownbase_data_vault", callback)
  return subscription
}

/**
 * Subscribe to activities for the current user
 */
export function subscribeToActivities(
  callback: RealtimeCallback
): RealtimeSubscription {
  const subscription = new RealtimeSubscription()
  subscription.subscribe("ownbase_activities", callback)
  return subscription
}

/**
 * Subscribe to tasks for the current user
 */
export function subscribeToTasks(
  callback: RealtimeCallback
): RealtimeSubscription {
  const subscription = new RealtimeSubscription()
  subscription.subscribe("ownbase_tasks", callback)
  return subscription
}
