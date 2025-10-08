export const mockContacts = [
  {
    id: "1",
    name: "John Doe",
    email: "john@acme.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corp",
    jobTitle: "CTO",
    walletAddress: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    hasWallet: true,
    tags: ["VIP", "Enterprise"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah@beta.com",
    phone: "+1 (555) 234-5678",
    company: "Beta Inc",
    jobTitle: "CEO",
    walletAddress: null,
    hasWallet: false,
    tags: ["Lead"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@startup.io",
    phone: "+1 (555) 345-6789",
    company: "Startup.io",
    jobTitle: "Founder",
    walletAddress: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
    hasWallet: true,
    tags: ["Hot Lead", "Startup"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
  },
  {
    id: "4",
    name: "Emily Chen",
    email: "emily@corp.com",
    phone: "+1 (555) 456-7890",
    company: "Corp X",
    jobTitle: "VP Sales",
    walletAddress: null,
    hasWallet: false,
    tags: ["Enterprise"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
];

export const mockDeals = [
  {
    id: "1",
    title: "Acme Corp - Enterprise Plan",
    contactId: "1",
    contact: mockContacts[0],
    value: 50000,
    currency: "USD",
    stage: "negotiation",
    status: "open",
    probability: 70,
    expectedCloseDate: "2025-12-15",
  },
  {
    id: "2",
    title: "Beta Inc - Starter Package",
    contactId: "2",
    contact: mockContacts[1],
    value: 25000,
    currency: "USD",
    stage: "demo",
    status: "open",
    probability: 40,
    expectedCloseDate: "2025-11-20",
  },
  {
    id: "3",
    title: "Startup.io - Growth Plan",
    contactId: "3",
    contact: mockContacts[2],
    value: 10000,
    currency: "USD",
    stage: "closed",
    status: "won",
    probability: 100,
    expectedCloseDate: "2025-10-05",
  },
  {
    id: "4",
    title: "Corp X - Custom Solution",
    contactId: "4",
    contact: mockContacts[3],
    value: 100000,
    currency: "USD",
    stage: "proposal",
    status: "open",
    probability: 60,
    expectedCloseDate: "2026-01-10",
  },
  {
    id: "5",
    title: "Acme Corp - Consulting",
    contactId: "1",
    contact: mockContacts[0],
    value: 15000,
    currency: "USD",
    stage: "qualified",
    status: "open",
    probability: 50,
    expectedCloseDate: "2025-11-30",
  },
];

export const mockActivities = [
  {
    id: "1",
    type: "call",
    title: "Discovery call with John",
    description: "Discussed pricing and implementation timeline",
    contactId: "1",
    dealId: "1",
    activityDate: "2025-10-08T10:00:00",
  },
  {
    id: "2",
    type: "email",
    title: "Sent proposal to Sarah",
    description: "Proposal for Starter Package with pricing breakdown",
    contactId: "2",
    dealId: "2",
    activityDate: "2025-10-07T14:30:00",
  },
  {
    id: "3",
    type: "meeting",
    title: "Demo with Mike",
    description: "Product demo completed, very positive feedback",
    contactId: "3",
    dealId: "3",
    activityDate: "2025-10-05T11:00:00",
  },
  {
    id: "4",
    type: "note",
    title: "Emily requested custom features",
    description: "Needs integration with their existing CRM system",
    contactId: "4",
    dealId: "4",
    activityDate: "2025-10-06T16:00:00",
  },
];

export const mockTasks = [
  {
    id: "1",
    title: "Follow up with John about contract",
    description: "Send revised contract with updated terms",
    contactId: "1",
    dealId: "1",
    dueDate: "2025-10-09",
    priority: "high",
    completed: false,
  },
  {
    id: "2",
    title: "Schedule demo with Sarah",
    description: "Book time for product demonstration",
    contactId: "2",
    dealId: "2",
    dueDate: "2025-10-10",
    priority: "medium",
    completed: false,
  },
  {
    id: "3",
    title: "Send onboarding materials to Mike",
    description: "Welcome package and setup instructions",
    contactId: "3",
    dealId: "3",
    dueDate: "2025-10-08",
    priority: "high",
    completed: true,
  },
  {
    id: "4",
    title: "Prepare custom proposal for Emily",
    description: "Include integration requirements and timeline",
    contactId: "4",
    dealId: "4",
    dueDate: "2025-10-12",
    priority: "medium",
    completed: false,
  },
];

export const mockDataAccessRequests = [
  {
    id: "1",
    customerWallet: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    customerName: "John Doe",
    requestedFields: ["email", "phone", "purchase_history"],
    accessDurationDays: 30,
    paymentAmount: 5,
    paymentCurrency: "DOT",
    status: "approved",
    approvedAt: "2025-10-01T10:00:00",
    expiresAt: "2025-10-31T10:00:00",
    createdAt: "2025-10-01T09:00:00",
  },
  {
    id: "2",
    customerWallet: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
    customerName: "Mike Johnson",
    requestedFields: ["email", "company", "job_title"],
    accessDurationDays: 30,
    paymentAmount: 3,
    paymentCurrency: "DOT",
    status: "pending",
    approvedAt: null,
    expiresAt: null,
    createdAt: "2025-10-08T08:00:00",
  },
];

// Helper functions
export function getContactById(id: string) {
  return mockContacts.find((c) => c.id === id);
}

export function getDealById(id: string) {
  return mockDeals.find((d) => d.id === id);
}

export function getDealsByContactId(contactId: string) {
  return mockDeals.filter((d) => d.contactId === contactId);
}

export function getActivitiesByContactId(contactId: string) {
  return mockActivities.filter((a) => a.contactId === contactId);
}

export function getTasksByContactId(contactId: string) {
  return mockTasks.filter((t) => t.contactId === contactId);
}
