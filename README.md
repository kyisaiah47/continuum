# Web3 CRM - Customer-Owned Data on Polkadot

> **A revolutionary CRM where customers own their data instead of companies.**

Built for the Polkadot Cloud Hackathon 2025.

## 🎯 The Problem

Traditional CRMs (Salesforce, HubSpot) have a fundamental flaw:
- Companies own customer data forever
- Customers have zero control
- Same data duplicated across multiple companies
- No incentive for customers to share accurate data
- Privacy breaches expose customer information

## 💡 The Solution

Web3 CRM flips this model using Polkadot blockchain:
- **Customers store their own data** in encrypted wallets
- **Companies pay for temporary access** with time limits
- **Customers get paid** to share their information
- **Portable reputation** works across all businesses
- **Privacy-first** with on-chain access control

## ✨ Features

### CRM Features
- ✅ Contact management with search
- ✅ Deal pipeline (Kanban board with drag & drop)
- ✅ Activity tracking
- ✅ Task management
- ✅ Dashboard with metrics
- ✅ Supabase backend with Row Level Security

### Web3 Features (Polkadot)
- ✅ Polkadot wallet integration
- ✅ ink! smart contract for access control
- ✅ Payment escrow in DOT tokens
- ✅ Time-limited data access
- ✅ Customer approval/rejection flow
- ✅ Auto-expiring permissions

## 🏗️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Blockchain**: Polkadot (ink! smart contracts)
- **Web3**: @polkadot/api, @polkadot/extension-dapp

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Polkadot{.js} browser extension
- Supabase account
- Rust & cargo-contract (for smart contract deployment)

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/web3-crm.git
cd web3-crm
npm install
```

### 2. Set Up Supabase

Follow the detailed guide in [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md):

1. Create Supabase project at [supabase.com](https://supabase.com)
2. Run database migrations from `supabase/migrations/`
3. Copy API credentials

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

NEXT_PUBLIC_POLKADOT_NETWORK=westend
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Deploy Smart Contract (Optional for Demo)

Follow [`contracts/data_access/README.md`](./contracts/data_access/README.md):

```bash
cd contracts/data_access

# Install ink! tooling
cargo install cargo-contract --force

# Build contract
cargo contract build --release

# Deploy to testnet
cargo contract instantiate \
  --constructor new \
  --suri //Alice \
  --url wss://westend-rpc.polkadot.io
```

Update `.env.local` with the contract address.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📖 How It Works

### For Businesses

1. **Log in** to Web3 CRM
2. **Add contacts** with their Polkadot wallet addresses
3. **Request data access**:
   - Select fields needed (name, email, etc.)
   - Set duration (e.g., 30 days)
   - Offer payment (e.g., 5 DOT)
4. **Payment is escrowed** in smart contract
5. **Wait for customer approval**
6. **Access granted** - view customer data for the duration
7. **Auto-expires** after time limit

### For Customers

1. **Receive notification** of access request
2. **Review request**:
   - Which business is requesting
   - What fields they want
   - How much they're offering
   - How long access lasts
3. **Approve or reject**:
   - Approve: Receive payment, grant access
   - Reject: Business gets refund
4. **Revoke anytime** if needed

### Smart Contract Flow

```
Business → Request Access (5 DOT)
       ↓
   [Escrow in Smart Contract]
       ↓
Customer → Approve ✓
       ↓
[Payment to Customer]
       ↓
[Time-Limited Access Active]
       ↓
[Auto-Expire After 30 Days]
```

## 📂 Project Structure

```
web3-crm/
├── app/                      # Next.js app router
│   ├── (auth)/               # Login/signup pages
│   ├── dashboard/            # Dashboard page
│   ├── contacts/             # Contacts management
│   ├── deals/                # Deals pipeline
│   ├── activities/           # Activities tracking
│   ├── tasks/                # Task management
│   └── data-access/          # Web3 data access requests
├── components/               # React components
│   ├── ui/                   # shadcn/ui components
│   ├── contact-dialog.tsx    # Add/edit contact
│   ├── deal-dialog.tsx       # Add/edit deal
│   └── data-access-request-dialog.tsx  # Request data access
├── contracts/                # ink! smart contracts
│   └── data_access/          # Access control contract
├── lib/                      # Utilities & API
│   ├── api/                  # Supabase API functions
│   │   ├── contacts.ts
│   │   ├── deals.ts
│   │   ├── activities.ts
│   │   └── tasks.ts
│   ├── polkadot/             # Polkadot integration
│   │   └── contract.ts       # Smart contract calls
│   └── supabase-client.ts    # Supabase client & types
├── supabase/                 # Database
│   └── migrations/           # SQL migrations
└── public/                   # Static assets
```

## 🎬 Demo Flow (For Hackathon Video)

### Scene 1: The Problem (30 sec)
> "Businesses use CRMs to track customers. But customers have no control over their data. It gets duplicated, sold, and leaked."

### Scene 2: The Solution (30 sec)
> "Web3 CRM flips this. Customers own their data. Businesses pay for temporary access. Everyone wins."

### Scene 3: Business Side (1 min)
1. Log into CRM dashboard
2. View contacts & deals pipeline
3. Click "Request Data Access" on a contact
4. Select fields + offer 5 DOT for 30 days
5. Payment escrowed in smart contract

### Scene 4: Customer Side (1 min)
1. Customer receives notification
2. Reviews: "Business X wants email & phone for 5 DOT"
3. Approves request
4. Payment released to customer
5. Access granted for 30 days

### Scene 5: The Impact (30 sec)
> "Customers get paid. Businesses get accurate data. Privacy is protected. This is the future of CRM."

## 🔐 Security

- **Row Level Security**: Users can only access their own data
- **Payment Escrow**: Funds locked until customer decision
- **Time Limits**: Access automatically expires
- **On-Chain Audit**: All requests recorded on blockchain
- **Customer Control**: Can revoke access anytime

## 🧪 Testing

### Run Smart Contract Tests
```bash
cd contracts/data_access
cargo test
```

### Test the App
1. Create Supabase account with test data
2. Deploy contract to testnet
3. Test full flow: login → add contact → request access → approve

## 📚 Documentation

- [Supabase Setup Guide](./SUPABASE_SETUP.md)
- [Smart Contract Documentation](./contracts/data_access/README.md)
- [Progress Tracker](./PROGRESS.md)
- [Project Documentation](./PROJECT_DOCS.md)

## 🎯 Hackathon Criteria

### Technological Implementation ✅
- Deep Polkadot integration (wallet, smart contracts, payments)
- Production-ready ink! smart contract with tests
- Clean, type-safe TypeScript codebase
- Secure authentication & authorization

### Design ✅
- Familiar CRM UI (businesses understand it)
- Beautiful dashboards (Tremor + shadcn/ui)
- Simple wallet UX (easy for customers)
- Responsive design

### Potential Impact ✅
- **Massive market**: CRM is an $80B industry
- Solves real privacy problems
- Benefits both businesses AND customers
- Portable customer reputation

### Creativity ✅
- Novel data marketplace concept
- Customer ownership is revolutionary
- First customer-owned CRM
- Polkadot-native solution

## 🚧 Future Roadmap

### Phase 1: Core Improvements
- Advanced analytics & reporting
- Email integration (Gmail, Outlook)
- Calendar sync
- Mobile app

### Phase 2: Web3 Expansion
- Cross-chain support (other parachains)
- NFT-based reputation system
- DAO governance
- Full IPFS/Crust migration

### Phase 3: Enterprise
- White-label CRM
- API for third-party integrations
- Advanced automation
- AI-powered insights

### Phase 4: Ecosystem
- Data marketplace
- Reputation verification
- Cross-platform identity (Web3 SSO)
- Developer SDK

## 🤝 Contributing

This is a hackathon project, but contributions are welcome!

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - Open Source

## 🙏 Acknowledgments

- **Polkadot Foundation** - For hosting the hackathon
- **Web3 Foundation** - For amazing tools & resources
- **Parity Technologies** - For Substrate & ink!
- **Supabase** - For the incredible backend platform
- **shadcn** - For beautiful UI components

---

**Built for Polkadot Cloud Hackathon 2025**

*Radically open, radically useful.*

## 📞 Support

- Documentation: Check the `/docs` folder
- Issues: [GitHub Issues](https://github.com/yourusername/web3-crm/issues)
- Demo Video: [Coming Soon]

## 🏆 Team

- Product & Frontend: Building user-centric CRM experience
- Web3 Integration: Polkadot smart contracts & blockchain
- Design: Beautiful, intuitive UI/UX

---

### Quick Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Smart Contract
cd contracts/data_access
cargo contract build     # Build contract
cargo test               # Run tests
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `NEXT_PUBLIC_POLKADOT_NETWORK` | Polkadot network (westend/rococo) | Yes |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Deployed contract address | Yes |

**Ready to revolutionize CRM? Let's build! 🚀**
