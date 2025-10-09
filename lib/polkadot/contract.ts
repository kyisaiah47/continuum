import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';

// Contract ABI - will be generated after deployment
// For now, using a placeholder structure
const CONTRACT_ABI = {
  source: {
    hash: "",
    language: "ink! 5.0.0",
    compiler: "rustc 1.75.0",
    wasm: ""
  },
  contract: {
    name: "data_access",
    version: "0.1.0",
    authors: ["Web3 CRM Team"]
  },
  spec: {
    constructors: [
      {
        args: [],
        docs: [],
        label: "new",
        payable: false,
        selector: "0x9bae9d5e"
      }
    ],
    docs: [],
    events: [],
    messages: [
      {
        args: [
          { label: "customer", type: { displayName: ["AccountId"], type: 0 } },
          { label: "requested_fields", type: { displayName: ["Vec"], type: 1 } },
          { label: "duration_days", type: { displayName: ["u32"], type: 2 } }
        ],
        docs: ["Request access to customer data"],
        label: "request_access",
        mutates: true,
        payable: true,
        returnType: { displayName: ["Result"], type: 3 },
        selector: "0x12345678"
      },
      {
        args: [
          { label: "request_id", type: { displayName: ["u64"], type: 4 } }
        ],
        docs: ["Approve access request"],
        label: "approve_access",
        mutates: true,
        payable: false,
        returnType: { displayName: ["Result"], type: 5 },
        selector: "0x23456789"
      },
      {
        args: [
          { label: "request_id", type: { displayName: ["u64"], type: 4 } }
        ],
        docs: ["Reject access request"],
        label: "reject_access",
        mutates: true,
        payable: false,
        returnType: { displayName: ["Result"], type: 5 },
        selector: "0x34567890"
      },
      {
        args: [
          { label: "business", type: { displayName: ["AccountId"], type: 0 } },
          { label: "customer", type: { displayName: ["AccountId"], type: 0 } }
        ],
        docs: ["Check if business has access"],
        label: "has_access",
        mutates: false,
        payable: false,
        returnType: { displayName: ["bool"], type: 6 },
        selector: "0x45678901"
      }
    ]
  },
  types: []
};

let api: ApiPromise | null = null;
let contract: ContractPromise | null = null;

export async function initializeApi() {
  if (api) return api;

  const network = process.env.NEXT_PUBLIC_POLKADOT_NETWORK || 'westend';
  const wsProvider = new WsProvider(
    network === 'westend'
      ? 'wss://westend-rpc.polkadot.io'
      : 'wss://rococo-contracts-rpc.polkadot.io'
  );

  api = await ApiPromise.create({ provider: wsProvider });
  return api;
}

export async function getContract() {
  if (!contract) {
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    if (!contractAddress) {
      throw new Error('Contract address not configured');
    }

    const apiInstance = await initializeApi();
    contract = new ContractPromise(apiInstance, CONTRACT_ABI, contractAddress);
  }

  return contract;
}

export async function connectWallet() {
  const extensions = await web3Enable('Web3 CRM');

  if (extensions.length === 0) {
    throw new Error('No Polkadot extension found');
  }

  const accounts = await web3Accounts();

  if (accounts.length === 0) {
    throw new Error('No accounts found');
  }

  return accounts;
}

export async function requestDataAccess(
  customerAddress: string,
  requestedFields: string[],
  durationDays: number,
  paymentAmount: string // In DOT
) {
  const contract = await getContract();
  const accounts = await web3Accounts();

  if (accounts.length === 0) {
    throw new Error('No account connected');
  }

  const injector = await web3FromAddress(accounts[0].address);

  // Convert DOT to planck (1 DOT = 10^10 planck)
  const value = BigInt(parseFloat(paymentAmount) * 10 ** 10);

  // Encode requested fields
  const encodedFields = new TextEncoder().encode(JSON.stringify(requestedFields));

  const gasLimit = contract.api.registry.createType('WeightV2', {
    refTime: 10000000000,
    proofSize: 100000,
  });

  const tx = contract.tx.requestAccess(
    { value, gasLimit },
    customerAddress,
    Array.from(encodedFields),
    durationDays
  );

  return new Promise((resolve, reject) => {
    tx.signAndSend(accounts[0].address, { signer: injector.signer }, (result) => {
      if (result.status.isInBlock) {
        console.log('In block:', result.status.asInBlock.toString());
      }

      if (result.status.isFinalized) {
        console.log('Finalized:', result.status.asFinalized.toString());
        resolve(result);
      }

      if (result.isError) {
        reject(new Error('Transaction failed'));
      }
    });
  });
}

export async function approveDataAccess(requestId: number) {
  const contract = await getContract();
  const accounts = await web3Accounts();

  if (accounts.length === 0) {
    throw new Error('No account connected');
  }

  const injector = await web3FromAddress(accounts[0].address);

  const gasLimit = contract.api.registry.createType('WeightV2', {
    refTime: 10000000000,
    proofSize: 100000,
  });

  const tx = contract.tx.approveAccess({ gasLimit }, requestId);

  return new Promise((resolve, reject) => {
    tx.signAndSend(accounts[0].address, { signer: injector.signer }, (result) => {
      if (result.status.isFinalized) {
        resolve(result);
      }

      if (result.isError) {
        reject(new Error('Transaction failed'));
      }
    });
  });
}

export async function rejectDataAccess(requestId: number) {
  const contract = await getContract();
  const accounts = await web3Accounts();

  if (accounts.length === 0) {
    throw new Error('No account connected');
  }

  const injector = await web3FromAddress(accounts[0].address);

  const gasLimit = contract.api.registry.createType('WeightV2', {
    refTime: 10000000000,
    proofSize: 100000,
  });

  const tx = contract.tx.rejectAccess({ gasLimit }, requestId);

  return new Promise((resolve, reject) => {
    tx.signAndSend(accounts[0].address, { signer: injector.signer }, (result) => {
      if (result.status.isFinalized) {
        resolve(result);
      }

      if (result.isError) {
        reject(new Error('Transaction failed'));
      }
    });
  });
}

export async function checkDataAccess(
  businessAddress: string,
  customerAddress: string
): Promise<boolean> {
  const contract = await getContract();

  const { result, output } = await contract.query.hasAccess(
    businessAddress,
    { gasLimit: -1 },
    businessAddress,
    customerAddress
  );

  if (result.isErr) {
    throw new Error('Query failed');
  }

  return output?.toHuman() as boolean;
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function dotToPlanck(dot: number): bigint {
  return BigInt(Math.floor(dot * 10 ** 10));
}

export function planckToDot(planck: bigint): number {
  return Number(planck) / 10 ** 10;
}
