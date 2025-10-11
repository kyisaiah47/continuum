# Smart Contract Deployment Guide

## Contract Status
✅ **Built Successfully** - `data_access.contract` ready for deployment

## Prerequisites

1. **Substrate Contracts Node** (local testing)
```bash
# Install substrate-contracts-node
cargo install contracts-node --git https://github.com/paritytech/substrate-contracts-node.git --force

# Or download binary from releases
```

2. **Polkadot.js Extension**
- Install from: https://polkadot.js.org/extension/
- Create/import account
- Fund with testnet tokens

3. **Testnet Tokens**
- Contracts on Rococo: https://use.ink/testnet
- Faucet: https://faucet.polkadot.io/rococo

## Local Deployment (Development)

### Step 1: Start Local Node
```bash
substrate-contracts-node --dev
```

### Step 2: Deploy Contract
```bash
cd contracts/data_access

# Deploy using Alice account (dev mode)
cargo contract instantiate \
  --constructor new \
  --suri //Alice \
  --execute
```

### Step 3: Note Contract Address
Save the contract address from output for frontend integration.

## Testnet Deployment (Rococo Contracts)

### Step 1: Upload Code
```bash
cargo contract upload \
  --suri "your mnemonic phrase" \
  --url wss://rococo-contracts-rpc.polkadot.io
```

### Step 2: Instantiate Contract
```bash
cargo contract instantiate \
  --constructor new \
  --suri "your mnemonic phrase" \
  --url wss://rococo-contracts-rpc.polkadot.io \
  --execute
```

### Step 3: Verify on Polkadot.js Apps
1. Go to: https://polkadot.js.org/apps/?rpc=wss://rococo-contracts-rpc.polkadot.io
2. Navigate to Developer > Contracts
3. Add existing contract with your address
4. Upload metadata from `target/ink/data_access.json`

## Contract Interaction (CLI)

### Request Data Access
```bash
cargo contract call \
  --contract <CONTRACT_ADDRESS> \
  --message request_access \
  --args <CUSTOMER_ACCOUNT> '["email", "name"]' <DURATION_DAYS> <PAYMENT_AMOUNT> \
  --suri "your mnemonic" \
  --execute
```

### Approve Request
```bash
cargo contract call \
  --contract <CONTRACT_ADDRESS> \
  --message approve_request \
  --args <BUSINESS_ACCOUNT> \
  --suri <CUSTOMER_MNEMONIC> \
  --execute
```

### Check Access
```bash
cargo contract call \
  --contract <CONTRACT_ADDRESS> \
  --message has_access \
  --args <BUSINESS_ACCOUNT> <CUSTOMER_ACCOUNT> "email" \
  --suri //Alice
```

## Frontend Integration

### Update Environment Variables
```bash
# .env.local
NEXT_PUBLIC_CONTRACT_ADDRESS=5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
NEXT_PUBLIC_POLKADOT_RPC=wss://rococo-contracts-rpc.polkadot.io
```

### Contract ABI Location
```
contracts/data_access/target/ink/data_access.json
```

## Deployment Checklist

- [ ] Build contract (`cargo contract build --release`)
- [ ] Run tests (`cargo test`)
- [ ] Start local node OR connect to testnet
- [ ] Upload contract code
- [ ] Instantiate contract
- [ ] Save contract address
- [ ] Update frontend env vars
- [ ] Upload metadata to Polkadot.js
- [ ] Test contract calls
- [ ] Verify on blockchain explorer

## Testnet Information

### Rococo Contracts Parachain
- **RPC:** `wss://rococo-contracts-rpc.polkadot.io`
- **Explorer:** https://rococo.subscan.io/
- **Faucet:** https://faucet.polkadot.io/rococo

### Contract Files
```
target/ink/
├── data_access.contract   # Upload this
├── data_access.wasm        # Contract code
└── data_access.json        # Metadata (for UI)
```

## Troubleshooting

### Error: Insufficient Balance
- Fund account from faucet
- Minimum ~10 ROC for deployment

### Error: Module Not Found
- Ensure `substrate-contracts-node` is in PATH
- Or use full binary path

### Error: Contract Already Exists
- Use different salt or update code
- Check existing deployments first

## Next Steps After Deployment

1. ✅ Update `NEXT_PUBLIC_CONTRACT_ADDRESS` in `.env.local`
2. ✅ Copy `data_access.json` to `lib/polkadot/abi/`
3. ✅ Test contract calls from frontend
4. ✅ Monitor events on Polkadot.js
5. ✅ Implement error handling for failed txs

---

**Note:** For production deployment, use mainnet (Polkadot or Kusama) and proper key management (hardware wallet recommended).
