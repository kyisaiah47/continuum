# Web3 CRM - Comprehensive Project Documentation

## 🎯 Project Overview

**Web3 CRM** is a customer relationship management platform where **customers own their data** instead of companies. Built for the Polkadot Cloud Hackathon.

### The Problem
Traditional CRMs (Salesforce, HubSpot):
- Companies own customer data forever
- Customers have no control over their info
- Same data duplicated across multiple companies
- No incentive for customers to share accurate data
- Privacy breaches expose customer data

### The Solution
Web3 CRM flips this model:
- **Customers store their own data** in encrypted wallets
- **Companies pay for access** to customer data (time-limited)
- **Customers get paid** to share their information
- **Portable reputation** - customer data works across all businesses
- **Privacy-first** - encrypted on-chain storage

---

## 🏗️ Architecture

### Tech Stack

```
Frontend Layer
├─ Next.js 14 (App Router, TypeScript, Turbopack)
├─ Tailwind CSS (styling)
├─ shadcn/ui (forms, tables, dialogs, cards)
└─ Tremor (dashboard charts & metrics)

Backend & Database
├─ Supabase (PostgreSQL)
├─ Supabase Auth (authentication)
├─ Supabase Realtime (live updates)
└─ Row Level Security (multi-tenant data isolation)

Web3 Layer
├─ Polkadot.js (wallet integration)
├─ @polkadot/extension-dapp (browser extension)
├─ @polkadot/api (blockchain interaction)
├─ Smart Contracts (ink! - Rust-based)
└─ IPFS/Crust (encrypted data storage)
```

### System Architecture

```
┌─────────────────────────────────────────────────┐
│         Business Dashboard (Web2 UX)            │
│  - Contact management                           │
│  - Deal pipeline (Kanban)                       │
│  - Analytics & reporting                        │
│  - Activity tracking                            │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│           Web3 Integration Layer                │
│  - Polkadot wallet connection                   │
│  - Access control smart contracts               │
│  - Payment escrow (DOT tokens)                  │
│  - Time-limited permissions                     │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│         Customer Data Layer (On-Chain)          │
│  - Encrypted customer profiles                  │
│  - Stored in customer wallets                   │
│  - Granular access permissions                  │
│  - Revocable access tokens                      │
└─────────────────────────────────────────────────┘
```

---

## 📊 Database Schema (Supabase)

### Tables

#### **1. contacts**
```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,

  -- Basic Info
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  job_title TEXT,

  -- Web3 Fields
  wallet_address TEXT UNIQUE,
  has_wallet BOOLEAN DEFAULT false,
  data_access_expires_at TIMESTAMP,
  access_payment_amount DECIMAL,

  -- Metadata
  tags TEXT[],
  notes TEXT,
  avatar_url TEXT,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_contacts_user_id ON contacts(user_id);
CREATE INDEX idx_contacts_wallet ON contacts(wallet_address);
```

#### **2. deals**
```sql
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  contact_id UUID REFERENCES contacts,

  -- Deal Info
  title TEXT NOT NULL,
  value DECIMAL NOT NULL,
  currency TEXT DEFAULT 'USD',

  -- Pipeline
  stage TEXT NOT NULL, -- 'lead', 'qualified', 'demo', 'proposal', 'negotiation', 'closed'
  status TEXT DEFAULT 'open', -- 'open', 'won', 'lost'
  probability INTEGER DEFAULT 50, -- 0-100

  -- Dates
  expected_close_date DATE,
  closed_at TIMESTAMP,

  -- Metadata
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_deals_user_id ON deals(user_id);
CREATE INDEX idx_deals_contact_id ON deals(contact_id);
CREATE INDEX idx_deals_stage ON deals(stage);
CREATE INDEX idx_deals_status ON deals(status);
```

#### **3. activities**
```sql
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  contact_id UUID REFERENCES contacts,
  deal_id UUID REFERENCES deals,

  -- Activity Info
  type TEXT NOT NULL, -- 'call', 'email', 'meeting', 'note', 'task'
  title TEXT NOT NULL,
  description TEXT,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  activity_date TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_activities_user_id ON activities(user_id);
CREATE INDEX idx_activities_contact_id ON activities(contact_id);
CREATE INDEX idx_activities_deal_id ON activities(deal_id);
```

#### **4. tasks**
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  contact_id UUID REFERENCES contacts,
  deal_id UUID REFERENCES deals,

  -- Task Info
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high'
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_completed ON tasks(completed);
```

#### **5. data_access_requests** (Web3 specific)
```sql
CREATE TABLE data_access_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Parties
  business_user_id UUID REFERENCES auth.users NOT NULL,
  customer_wallet TEXT NOT NULL,

  -- Access Details
  requested_fields TEXT[], -- ['name', 'email', 'purchase_history']
  access_duration_days INTEGER DEFAULT 30,
  payment_amount DECIMAL NOT NULL,
  payment_currency TEXT DEFAULT 'DOT',

  -- Status
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'expired'
  approved_at TIMESTAMP,
  expires_at TIMESTAMP,

  -- Blockchain
  transaction_hash TEXT,
  contract_address TEXT,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_access_requests_business ON data_access_requests(business_user_id);
CREATE INDEX idx_access_requests_customer ON data_access_requests(customer_wallet);
CREATE INDEX idx_access_requests_status ON data_access_requests(status);
```

### Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_access_requests ENABLE ROW LEVEL SECURITY;

-- Contacts: Users can only see their own contacts
CREATE POLICY "Users can view own contacts" ON contacts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own contacts" ON contacts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own contacts" ON contacts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own contacts" ON contacts
  FOR DELETE USING (auth.uid() = user_id);

-- Similar policies for deals, activities, tasks...
```

---

## 🔐 Web3 Features

### 1. Wallet Connection Flow

```typescript
// Customer connects Polkadot wallet
1. Customer clicks "Connect Wallet"
2. Browser extension (Polkadot{.js}) prompts for approval
3. Customer selects account & approves
4. Wallet address stored on-chain
5. Customer profile linked to wallet
```

### 2. Data Access Request Flow

```typescript
// Business requests customer data
1. Business: "I want to access John's email & purchase history"
2. System creates access request with:
   - Requested fields: ['email', 'purchase_history']
   - Duration: 30 days
   - Payment: 5 DOT

3. Smart contract escrows 5 DOT payment

4. Customer receives notification
5. Customer approves/rejects request

6. If approved:
   - Customer grants encrypted access
   - Payment released to customer
   - Business can view data for 30 days
   - Auto-expires after duration

7. If rejected:
   - Payment returned to business
```

### 3. Smart Contract Functions

#### **Access Control Contract (ink!)**

```rust
// Simplified pseudo-code
#[ink::contract]
mod data_access {
    pub fn request_access(
        customer_wallet: AccountId,
        fields: Vec<String>,
        duration_days: u32,
        payment_amount: Balance
    ) -> Result<AccessRequestId>;

    pub fn approve_access(
        request_id: AccessRequestId
    ) -> Result<()>;

    pub fn revoke_access(
        request_id: AccessRequestId
    ) -> Result<()>;

    pub fn check_access(
        business: AccountId,
        customer: AccountId
    ) -> Option<AccessDetails>;
}
```

### 4. Encrypted Data Storage

```typescript
// Customer data encrypted before storing
1. Customer creates profile in wallet
2. Data encrypted with customer's private key
3. Hash stored on Polkadot
4. Full data stored on IPFS/Crust (encrypted)
5. Business granted temporary decryption key (time-limited)
```

---

## 🎨 UI Components & Pages

### Main Pages

#### **1. Dashboard** (`/dashboard`)
- Revenue metrics (Tremor cards)
- Deal pipeline chart (Tremor area chart)
- Recent activities (shadcn table)
- Upcoming tasks (shadcn card list)

#### **2. Contacts** (`/contacts`)
- Contacts table (shadcn table with search/filter)
- "Connect Wallet" button for Web3 contacts
- Tags, status badges
- Quick actions (edit, delete, view)

#### **3. Contact Detail** (`/contacts/[id]`)
- Contact info card
- Associated deals
- Activity timeline
- Tasks list
- Notes section
- Wallet connection status

#### **4. Deals Pipeline** (`/deals`)
- Kanban board (drag & drop)
- Columns: Lead → Qualified → Demo → Proposal → Negotiation → Closed
- Deal cards with value, contact, probability
- Add new deal dialog

#### **5. Deal Detail** (`/deals/[id]`)
- Deal info & progress
- Contact details
- Activities related to deal
- Tasks checklist
- Notes & files

#### **6. Data Access** (`/data-access`) - Web3 Feature
- Active access requests
- Manage permissions
- Payment history
- Revoke access buttons

#### **7. Settings** (`/settings`)
- Profile settings
- Wallet connection
- Subscription/billing
- API keys (future)

### Key Components

```typescript
// shadcn/ui components
- Button, Card, Table, Dialog, Input, Form
- Select, Textarea, Badge, Label

// Tremor components
- Metric (KPI cards)
- AreaChart, BarChart, DonutChart
- BarList (top items)

// Custom components
- ContactCard
- DealCard
- PipelineColumn
- WalletConnectButton
- DataAccessRequestCard
- ActivityTimeline
```

---

## 🚀 MVP Implementation Plan (6 Weeks)

### **Week 1-2: Core CRM (Web2)**

**Goals:**
- Basic CRM functionality
- Clean UI/UX

**Tasks:**
- ✅ Set up Next.js project
- ✅ Install dependencies (shadcn, Tremor, Supabase)
- [ ] Create Supabase project & database schema
- [ ] Implement authentication (Supabase Auth)
- [ ] Build Dashboard page with Tremor charts
- [ ] Build Contacts page (CRUD operations)
- [ ] Build Deals pipeline (Kanban with drag & drop)
- [ ] Add activities & tasks

**Deliverable:** Working CRM with contacts, deals, dashboard

---

### **Week 3-4: Web3 Integration**

**Goals:**
- Wallet connection
- Self-sovereign customer profiles
- Access control smart contracts

**Tasks:**
- [ ] Integrate Polkadot.js wallet connection
- [ ] Build wallet connect UI
- [ ] Create smart contract for access control (ink!)
- [ ] Deploy contract to Polkadot testnet
- [ ] Implement "Request Access" flow
- [ ] Build customer dashboard (approve/reject requests)
- [ ] Add wallet address to contacts

**Deliverable:** Customers can connect wallets, businesses can request access

---

### **Week 5-6: Data Marketplace & Polish**

**Goals:**
- Payment for data access
- Time-limited permissions
- UI/UX polish

**Tasks:**
- [ ] Implement DOT payment escrow in smart contract
- [ ] Add payment UI (business pays, customer receives)
- [ ] Implement auto-expiring access
- [ ] Build customer access management dashboard
- [ ] Add encryption for sensitive customer data
- [ ] Polish UI/UX across all pages
- [ ] Write comprehensive README
- [ ] Create demo video (2-5 minutes)
- [ ] Test end-to-end flows
- [ ] Deploy to production

**Deliverable:** Full Web3 CRM with data marketplace

---

## 🎬 Demo Flow (For Hackathon Video)

### **Scene 1: The Problem (30 seconds)**
> "Businesses use CRMs to track customers. But customers have no control over their data. It gets duplicated, sold, and leaked."

### **Scene 2: The Solution (30 seconds)**
> "Web3 CRM flips this. Customers own their data. Businesses pay for temporary access. Everyone wins."

### **Scene 3: Business Side (1 minute)**
1. Log into CRM dashboard
2. See contacts & deals pipeline
3. Click "Request Customer Data"
4. Select fields (email, purchase history)
5. Offer 5 DOT for 30 days access
6. Payment escrowed in smart contract

### **Scene 4: Customer Side (1 minute)**
1. Customer receives notification
2. Reviews request: "Business X wants email & purchase history"
3. See payment offer: 5 DOT
4. Approves request
5. Payment released to customer wallet
6. Access granted for 30 days

### **Scene 5: The Impact (30 seconds)**
> "Customers get paid for their data. Businesses get accurate info. Privacy is protected. Data is portable. This is the future of CRM."

---

## 🏆 Hackathon Judging Criteria

### **Technological Implementation**
- Deep Polkadot integration (wallet, smart contracts, XCM)
- Clean, production-ready code
- Smart contract security
- Encryption & privacy tech

### **Design**
- Familiar CRM UI (businesses understand it)
- Simple wallet UX (customers can use it)
- Beautiful dashboards (Tremor)
- Responsive design

### **Potential Impact**
- **HUGE market** - CRM is $80B industry
- Solves real privacy problems
- Benefits businesses AND customers
- Portable reputation across platforms

### **Creativity**
- Flips traditional CRM model
- Novel data marketplace
- Customer ownership is revolutionary
- Polkadot-native solution

---

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- npm/yarn
- Polkadot{.js} browser extension
- Supabase account
- Git

### Installation

```bash
# Clone the repo
cd /Users/ikim1/Documents/GitHub/web3-crm

# Install dependencies (already done)
npm install

# Set up environment variables
cp .env.example .env.local

# Add Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Run development server
npm run dev
```

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Polkadot
NEXT_PUBLIC_POLKADOT_NETWORK=westend # or rococo for testnet
NEXT_PUBLIC_CONTRACT_ADDRESS=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📚 Resources & Documentation

### Polkadot
- [Polkadot.js Docs](https://polkadot.js.org/docs/)
- [ink! Smart Contracts](https://use.ink/)
- [Substrate Docs](https://docs.substrate.io/)

### Frontend
- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tremor](https://www.tremor.so/docs/getting-started/installation)

### Backend
- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)

### Hackathon
- [Polkadot Hackathon Guide](https://polkadot.network/hackathon)
- [Devpost Rules](https://polkadot-cloud.devpost.com/)

---

## 🎯 Key Differentiators

### Why This Project Stands Out

1. **Real Problem, Real Solution**
   - Privacy violations are a massive issue
   - CRM market is huge ($80B)
   - Clear value prop for both sides

2. **Deep Web3 Integration**
   - Not just "payments in crypto"
   - Actual ownership model change
   - Smart contracts solve real problems

3. **Production-Ready UX**
   - Familiar CRM interface
   - Web2-quality design
   - Users don't need to understand blockchain

4. **Novel Use Case**
   - First customer-owned CRM
   - Data marketplace is innovative
   - Portable reputation across platforms

---

## 🚧 Future Roadmap (Post-Hackathon)

### Phase 1: Core Improvements
- Advanced analytics & reporting
- Email integration (Gmail, Outlook)
- Calendar sync
- Mobile app (React Native)

### Phase 2: Web3 Expansion
- Cross-chain support (other parachains)
- NFT-based reputation system
- DAO for platform governance
- Decentralized storage (full IPFS migration)

### Phase 3: Enterprise Features
- White-label CRM for enterprises
- API for third-party integrations
- Advanced automation & workflows
- AI-powered insights

### Phase 4: Ecosystem Growth
- Marketplace for customer data
- Reputation verification services
- Cross-platform identity (SSO for Web3)
- Developer SDK for integrations

---

## 📝 License

MIT License - Open source for hackathon and beyond

---

## 👥 Team

- **Product & Frontend**: Building user-centric CRM experience
- **Web3 Integration**: Polkadot smart contracts & blockchain
- **Design**: Beautiful, intuitive UI/UX

---

## 🙏 Acknowledgments

- **Polkadot Foundation** - For hosting the hackathon
- **Web3 Foundation** - For the amazing tools & resources
- **Parity Technologies** - For Substrate & ink!
- **Supabase** - For the incredible BAAS platform
- **shadcn** - For beautiful UI components
- **Tremor** - For dashboard components

---

**Built for the Polkadot Cloud Hackathon 2025**
*Radically open, radically useful.*
