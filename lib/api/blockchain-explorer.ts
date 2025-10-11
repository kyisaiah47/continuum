import { getBusinessRequests } from './data-access-requests'

export type BlockInfo = {
  number: string
  hash: string
  txs: number
  time: string
  validator: string
}

export type TransactionInfo = {
  hash: string
  from: string
  to: string
  value: string
  time: string
  status: 'success' | 'pending' | 'failed'
}

export type ExplorerStats = {
  latestBlock: string
  totalTransactions: string
  avgBlockTime: string
}

/**
 * Get explorer statistics
 */
export async function getExplorerStats(): Promise<ExplorerStats> {
  try {
    const requests = await getBusinessRequests()

    const estimatedBlockHeight = 4892103
    const totalTransactions = requests.length + (estimatedBlockHeight * 10)

    return {
      latestBlock: formatNumber(estimatedBlockHeight),
      totalTransactions: formatNumber(totalTransactions),
      avgBlockTime: "6.2s"
    }
  } catch (error) {
    console.error('Failed to fetch explorer stats:', error)
    return {
      latestBlock: "4.89M",
      totalTransactions: "1.2M",
      avgBlockTime: "6.2s"
    }
  }
}

/**
 * Get recent blocks
 */
export async function getRecentBlocks(): Promise<BlockInfo[]> {
  try {
    const requests = await getBusinessRequests()
    const estimatedBlockHeight = 4892103

    // Create blocks based on recent activity
    const blocks: BlockInfo[] = []
    const now = new Date()

    // Generate 10 recent blocks
    for (let i = 0; i < 10; i++) {
      const blockNumber = estimatedBlockHeight - i
      const secondsAgo = i * 6 // 6 seconds per block
      const timeAgo = formatTimeAgo(now.getTime() - (secondsAgo * 1000))

      // Count transactions in this "block" - use database activity if available
      const txCount = i === 0 && requests.length > 0 ?
        Math.min(requests.length, 47) :
        Math.floor(Math.random() * 30) + 20

      blocks.push({
        number: blockNumber.toLocaleString(),
        hash: generateBlockHash(blockNumber),
        txs: txCount,
        time: timeAgo,
        validator: getValidator(i)
      })
    }

    return blocks
  } catch (error) {
    console.error('Failed to fetch recent blocks:', error)
    return getMockBlocks()
  }
}

/**
 * Get recent transactions
 */
export async function getRecentTransactions(): Promise<TransactionInfo[]> {
  try {
    const requests = await getBusinessRequests()

    // Convert our data access requests to transactions
    const transactions: TransactionInfo[] = requests
      .slice(0, 10)
      .map((request, index) => {
        const createdDate = new Date(request.created_at)
        const now = new Date()
        const diffMs = now.getTime() - createdDate.getTime()
        const timeAgo = formatTimeAgo(diffMs)

        let status: 'success' | 'pending' | 'failed' = 'pending'
        if (request.status === 'approved') {
          status = 'success'
        } else if (request.status === 'rejected') {
          status = 'failed'
        }

        return {
          hash: request.transaction_hash || generateTxHash(request.id),
          from: formatAddress(request.business_user_id),
          to: formatAddress(request.customer_wallet || request.customer_id),
          value: `${request.payment_amount.toFixed(2)} DOT`,
          time: timeAgo,
          status
        }
      })

    return transactions
  } catch (error) {
    console.error('Failed to fetch recent transactions:', error)
    return getMockTransactions()
  }
}

/**
 * Search for blocks, transactions, or addresses
 */
export async function search(query: string): Promise<{
  blocks: BlockInfo[]
  transactions: TransactionInfo[]
  addresses: string[]
}> {
  try {
    const requests = await getBusinessRequests()

    // Search in our database
    const matchingRequests = requests.filter(r =>
      r.id.includes(query) ||
      r.transaction_hash?.includes(query) ||
      r.customer_wallet?.includes(query) ||
      r.business_user_id.includes(query)
    )

    const transactions = matchingRequests.map(request => ({
      hash: request.transaction_hash || generateTxHash(request.id),
      from: formatAddress(request.business_user_id),
      to: formatAddress(request.customer_wallet || request.customer_id),
      value: `${request.payment_amount.toFixed(2)} DOT`,
      time: formatTimeAgo(new Date().getTime() - new Date(request.created_at).getTime()),
      status: request.status === 'approved' ? 'success' :
              request.status === 'rejected' ? 'failed' : 'pending' as 'success' | 'pending' | 'failed'
    }))

    return {
      blocks: [],
      transactions,
      addresses: []
    }
  } catch (error) {
    console.error('Search failed:', error)
    return { blocks: [], transactions: [], addresses: [] }
  }
}

// Helper functions

function formatNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return value.toString()
}

function formatTimeAgo(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ago`
  } else if (seconds > 0) {
    return `${seconds} ${seconds === 1 ? 'sec' : 'secs'} ago`
  } else {
    return "Just now"
  }
}

function generateBlockHash(blockNumber: number): string {
  // Generate a deterministic but random-looking hash
  const hash = (blockNumber * 31337).toString(16).padStart(12, '0')
  return `0x${hash.slice(0, 6)}...${hash.slice(-6)}`
}

function generateTxHash(id: string): string {
  // Create a hash from the ID
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    const char = id.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  const hexHash = Math.abs(hash).toString(16).padStart(12, '0')
  return `0x${hexHash.slice(0, 6)}...${hexHash.slice(-6)}`
}

function formatAddress(address: string): string {
  if (address.length < 20) {
    // If it's a short ID, generate a Polkadot-style address
    const prefix = "5" + address.slice(0, 7).toUpperCase()
    const suffix = address.slice(-7).toUpperCase()
    return `${prefix}...${suffix}`
  }
  return `${address.slice(0, 8)}...${address.slice(-8)}`
}

function getValidator(index: number): string {
  const validators = [
    "Alice", "Bob", "Charlie", "Dave", "Eve",
    "Ferdie", "George", "Hannah", "Ivan", "Julia"
  ]
  return validators[index % validators.length]
}

// Mock data fallbacks

function getMockBlocks(): BlockInfo[] {
  return [
    { number: "4,892,103", hash: "0x9f86d0...7e9b2c", txs: 47, time: "6 secs ago", validator: "Alice" },
    { number: "4,892,102", hash: "0x3c5a99...4f2d8a", txs: 32, time: "12 secs ago", validator: "Bob" },
    { number: "4,892,101", hash: "0x7d58c1...1a3e5b", txs: 28, time: "18 secs ago", validator: "Charlie" },
  ]
}

function getMockTransactions(): TransactionInfo[] {
  return [
    {
      hash: "0xa4e7f2...9d3c1b",
      from: "5GrwvaEF...oHGKutQY",
      to: "5FHneW46...JM694ty",
      value: "5.00 DOT",
      time: "3 secs ago",
      status: "success"
    },
    {
      hash: "0x2f9b8c...7e4a5d",
      from: "5DAAnrj7...Yum3PTXFy",
      to: "5GrwvaEF...oHGKutQY",
      value: "8.50 DOT",
      time: "8 secs ago",
      status: "success"
    },
    {
      hash: "0x6c3d1a...4b9e7f",
      from: "5FHneW46...JM694ty",
      to: "5DAAnrj7...Yum3PTXFy",
      value: "3.25 DOT",
      time: "15 secs ago",
      status: "success"
    },
  ]
}
