# Multi-Product Architecture Plan

## Overview
Continuum is a unified platform hosting 3 distinct products that users can access after authentication. Each product serves a different user persona but they all work together in the data ownership ecosystem.

---

## Product Breakdown

### 1. **Myn** - Personal Data Wallet (Consumer Product)
**Target User:** Individual consumers who want to own and control their personal data

**Core Features:**
- Personal data vault (view/edit your own data)
- Incoming access requests from companies
- Active data access grants (who has access to what)
- Revenue dashboard (earnings from selling data access)
- Privacy controls and permissions management
- Wallet connection and management
- Data export/download

**Key Pages:**
- `/myn/dashboard` - Overview of data vault, recent requests, earnings
- `/myn/vault` - View/edit personal data fields
- `/myn/requests` - Incoming access requests (approve/reject)
- `/myn/access` - Active access grants with revoke controls
- `/myn/earnings` - Revenue from data access in DOT tokens
- `/myn/settings` - Privacy preferences, wallet management

---

### 2. **Ethos** - Enterprise CRM (Business Product)
**Target User:** Companies/sales teams managing customer relationships

**Core Features:**
- Customer relationship management
- Deal pipeline tracking
- Activity logging
- Task management
- Data access requests to customers (via Polkadot smart contracts)
- Team collaboration

**Key Pages:**
- `/ethos/dashboard` - CRM overview, pipeline stats
- `/ethos/contacts` - Customer database
- `/ethos/deals` - Sales pipeline kanban
- `/ethos/activities` - Customer interaction timeline
- `/ethos/tasks` - Follow-ups and action items
- `/ethos/data-access` - Request/manage customer data access
- `/ethos/team` - Team members and permissions
- `/ethos/settings` - CRM configuration

---

### 3. **Continuum** - The Protocol Layer (Technical Product)
**Target User:** Developers building on the Continuum protocol, businesses integrating the data marketplace

**Core Features:**
- Smart contract deployment and management
- Network statistics and monitoring
- SDK documentation and playground
- API key management
- Contract templates
- Transaction history and blockchain explorer
- Developer resources

**Key Pages:**
- `/continuum/dashboard` - Network stats, recent deployments
- `/continuum/contracts` - Deploy and manage smart contracts
- `/continuum/explorer` - Blockchain explorer (transactions, blocks)
- `/continuum/docs` - SDK documentation and guides
- `/continuum/playground` - Interactive contract testing
- `/continuum/api-keys` - API key management
- `/continuum/analytics` - Usage metrics and insights

---

## Route Structure

### Public Routes (Pre-Auth)
```
/                           → Landing page (all 3 products overview)
/myn                        → Myn product page
/ethos                      → Ethos product page
/protocol                   → Protocol product page
/login                      → Universal login
/signup                     → Universal signup
```

### Protected Routes (Post-Auth)

#### Myn Routes
```
/myn/dashboard              → Personal data overview
/myn/vault                  → Data vault (view/edit personal data)
/myn/requests               → Incoming access requests
/myn/access                 → Active access grants
/myn/earnings               → Revenue dashboard
/myn/settings               → Privacy & wallet settings
```

#### Ethos Routes
```
/ethos/dashboard            → CRM dashboard
/ethos/contacts             → Contact management
/ethos/contacts/[id]        → Individual contact view
/ethos/deals                → Pipeline kanban
/ethos/activities           → Activity timeline
/ethos/tasks                → Task management
/ethos/data-access          → Request customer data access
/ethos/team                 → Team management
/ethos/settings             → CRM settings
```

#### Continuum Routes
```
/continuum/dashboard         → Network overview
/continuum/contracts         → Smart contract management
/continuum/contracts/deploy  → Deploy new contract
/continuum/explorer          → Blockchain explorer
/continuum/docs              → SDK documentation
/continuum/playground        → Interactive testing
/continuum/api-keys          → API management
/continuum/analytics         → Usage analytics
```

---

## User Experience Flow

### 1. First Visit (Unauthenticated)
```
Landing Page (/)
  → View all 3 products
  → Click "Get Started" or product-specific CTA
  → Route to /login or /signup
```

### 2. Sign Up
```
/signup
  → Create account (email/password or Web3 wallet)
  → Optional: Select primary product interest (for onboarding)
  → Redirect to product dashboard based on selection
  → Can always switch products later
```

### 3. Sign In
```
/login
  → Authenticate
  → Redirect to last used product OR default to /myn/dashboard
  → Product switcher available in header
```

### 4. Using the Platform
```
Header Component (all authenticated pages):
  - Logo (links to current product dashboard)
  - Product Switcher Dropdown:
    [Myn Icon] Myn - Personal Wallet
    [Ethos Icon] Ethos - CRM
    [Continuum Icon] Continuum - Protocol
  - User Menu (settings, logout)
```

---

## Navigation Components

### Product Switcher Component
**Location:** Fixed header on all authenticated pages

**Design:**
```
┌─────────────────────────────────────────┐
│ [Product Icon] Product Name       [▼]   │
└─────────────────────────────────────────┘
                    ↓
        ┌──────────────────────────┐
        │ → Myn (Personal Wallet)  │
        │ → Ethos (CRM)           │
        │ → Protocol (Dev Tools)  │
        └──────────────────────────┘
```

**Functionality:**
- Shows current product with icon
- Dropdown reveals all 3 products
- Click to switch → navigate to new product's dashboard
- Persist last visited product in localStorage

### Per-Product Navigation
Each product has its own navigation menu with relevant pages:

**Myn Nav:**
- Dashboard, Vault, Requests, Access, Earnings, Settings

**Ethos Nav:**
- Dashboard, Contacts, Deals, Activities, Tasks, Data Access, Team, Settings

**Continuum Nav:**
- Dashboard, Contracts, Explorer, Docs, Playground, API Keys, Analytics

---

## Database Schema Additions

### User Product Preferences
```sql
-- Add to existing user_profiles table
ALTER TABLE ownbase_user_profiles ADD COLUMN last_used_product TEXT DEFAULT 'myn';
ALTER TABLE ownbase_user_profiles ADD COLUMN primary_product TEXT DEFAULT 'myn';
ALTER TABLE ownbase_user_profiles ADD COLUMN enabled_products TEXT[] DEFAULT ARRAY['myn', 'ethos', 'continuum'];
```

### Product Access Control
```sql
-- Optional: Track which products users have access to
CREATE TABLE user_product_access (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product TEXT NOT NULL, -- 'myn', 'ethos', or 'continuum'
  is_active BOOLEAN DEFAULT true,
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product)
);
```

---

## Implementation Plan

### Phase 1: Route Restructuring
- [ ] Move current dashboard pages to `/ethos/*` routes
  - [ ] `/dashboard` → `/ethos/dashboard`
  - [ ] `/contacts` → `/ethos/contacts`
  - [ ] `/deals` → `/ethos/deals`
  - [ ] `/activities` → `/ethos/activities`
  - [ ] `/tasks` → `/ethos/tasks`
  - [ ] `/data-access` → `/ethos/data-access`
- [ ] Update all internal links to use new routes
- [ ] Update middleware to protect `/myn/*`, `/ethos/*`, `/continuum/*`

### Phase 2: Product Switcher Component
- [ ] Create `<ProductSwitcher />` component
- [ ] Add icons for each product (Myn, Ethos, Continuum)
- [ ] Implement dropdown functionality
- [ ] Add to authenticated layout header
- [ ] Store last used product in localStorage

### Phase 3: Myn Product Pages
- [ ] `/myn/dashboard` - Personal data overview
- [ ] `/myn/vault` - Data vault UI
- [ ] `/myn/requests` - Incoming access requests
- [ ] `/myn/access` - Active grants management
- [ ] `/myn/earnings` - Revenue dashboard
- [ ] `/myn/settings` - Privacy controls

### Phase 4: Continuum Product Pages
- [ ] `/continuum/dashboard` - Network stats
- [ ] `/continuum/contracts` - Contract management
- [ ] `/continuum/explorer` - Blockchain explorer
- [ ] `/continuum/docs` - Documentation
- [ ] `/continuum/playground` - Interactive testing
- [ ] `/continuum/api-keys` - API management
- [ ] `/continuum/analytics` - Usage metrics

### Phase 5: Smart Contract Integration
- [ ] Update data access smart contract for cross-product flow
- [ ] Myn: Receive and approve/reject requests
- [ ] Ethos: Create requests to Myn users
- [ ] Continuum: Monitor contract interactions

### Phase 6: Design System Per Product
- [ ] Myn: Consumer-friendly, simple, focus on privacy/control
- [ ] Ethos: Professional CRM, keep current Plural aesthetic
- [ ] Continuum: Technical/developer-focused, code-heavy

---

## Design Considerations

### Myn (Consumer Product)
- **Tone:** Friendly, empowering, privacy-focused
- **Colors:** Keep primary purple, add consumer-friendly accents
- **Typography:** Clear, readable, less technical
- **Key Visual:** Lock/shield icons, wallet imagery
- **Dashboard Focus:** Big numbers (earnings, requests), simple controls

### Ethos (Business Product)
- **Tone:** Professional, efficient, data-driven
- **Colors:** Current Plural aesthetic (purple, minimal)
- **Typography:** Light weights, lots of data density
- **Key Visual:** Graph/charts, pipeline views
- **Dashboard Focus:** Metrics, quick actions, team activity

### Continuum (Developer Product)
- **Tone:** Technical, precise, powerful
- **Colors:** Monospace-heavy, code syntax highlighting
- **Typography:** Mix of sans-serif + monospace
- **Key Visual:** Code blocks, network diagrams
- **Dashboard Focus:** System stats, deployment logs, API usage

---

## Authentication & Authorization

### User Types
- **Consumer:** Primary access to Myn, optional Ethos (if they own a business)
- **Business:** Primary access to Ethos, needs Myn for their own data
- **Developer:** Primary access to Protocol, may need others for testing

### Access Model
- All users can access all 3 products by default
- No hard restrictions - let users explore
- Track usage to understand which personas use which products
- Optional: Add product-specific onboarding flows

---

## Migration Steps

### Step 1: Current State Analysis
```
Current Routes:
/dashboard        → Ethos CRM dashboard
/contacts         → Ethos contacts
/deals            → Ethos deals
/activities       → Ethos activities
/tasks            → Ethos tasks
/data-access      → Ethos data requests
```

### Step 2: File Moves
```bash
# Move dashboard pages to ethos subdirectory
app/dashboard/page.tsx       → app/ethos/dashboard/page.tsx
app/contacts/page.tsx        → app/ethos/contacts/page.tsx
app/contacts/[id]/page.tsx   → app/ethos/contacts/[id]/page.tsx
app/deals/page.tsx           → app/ethos/deals/page.tsx
app/activities/page.tsx      → app/ethos/activities/page.tsx
app/tasks/page.tsx           → app/ethos/tasks/page.tsx
app/data-access/page.tsx     → app/ethos/data-access/page.tsx
```

### Step 3: Create New Product Directories
```bash
app/myn/
  - dashboard/page.tsx
  - vault/page.tsx
  - requests/page.tsx
  - access/page.tsx
  - earnings/page.tsx
  - settings/page.tsx

app/continuum/
  - dashboard/page.tsx
  - contracts/page.tsx
  - explorer/page.tsx
  - docs/page.tsx
  - playground/page.tsx
  - api-keys/page.tsx
  - analytics/page.tsx
```

### Step 4: Update Links
- Search and replace all `/dashboard` → `/ethos/dashboard`
- Search and replace all `/contacts` → `/ethos/contacts`
- etc.

---

## Technical Implementation Notes

### Shared Layout Component
```tsx
// app/(authenticated)/layout.tsx
export default function AuthenticatedLayout({ children }) {
  return (
    <GridBackground>
      <ProductSwitcher />
      <main>{children}</main>
      <Footer />
    </GridBackground>
  )
}
```

### Product-Specific Layouts
```tsx
// app/ethos/layout.tsx
export default function EthosLayout({ children }) {
  return (
    <>
      <EthosNavigation />
      {children}
    </>
  )
}

// Similar for /myn and /continuum
```

### Product Context
```tsx
// contexts/ProductContext.tsx
export const ProductProvider = ({ children }) => {
  const [currentProduct, setCurrentProduct] = useState('myn')
  // Load from localStorage, sync to DB
  return (
    <ProductContext.Provider value={{ currentProduct, setCurrentProduct }}>
      {children}
    </ProductContext.Provider>
  )
}
```

---

## Success Metrics

### Product Usage
- Track which products users activate
- Most common product combinations
- Product switching frequency

### User Segmentation
- Consumer-only users (Myn heavy)
- Business-only users (Ethos heavy)
- Developer users (Continuum heavy)
- Power users (all 3 products)

### Cross-Product Flows
- Ethos → Myn: Data access request flow
- Myn → Ethos: See who's requesting your data
- Continuum → Both: Deploy contracts, monitor interactions

---

## Open Questions

1. **Default landing after login?**
   - Option A: Last used product
   - Option B: User-selected default
   - Option C: Myn dashboard (consumer-first approach)

2. **Product access restrictions?**
   - Option A: Everyone gets all 3
   - Option B: Pay for individual products
   - Option C: Tiered plans (free: Myn, paid: Ethos, enterprise: Continuum)

3. **Onboarding flow?**
   - Option A: Pick one product during signup
   - Option B: Show all 3, let user explore
   - Option C: Guided tour of all products

4. **Branding per product?**
   - Option A: Unified Continuum brand across all
   - Option B: Sub-brands (Myn has its colors, Ethos has its own, etc.)
   - Option C: Hybrid (same aesthetic, different accent colors)

---

## Next Steps

1. **Approve architecture** and answer open questions
2. **Create product switcher component**
3. **Restructure routes** (move Ethos pages)
4. **Build Myn dashboard pages**
5. **Build Protocol dashboard pages**
6. **Update smart contracts** for cross-product flows
7. **Add product-specific navigation**
8. **Test user flows** across all 3 products
