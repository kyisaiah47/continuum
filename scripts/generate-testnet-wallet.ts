#!/usr/bin/env tsx
import { Keyring } from '@polkadot/keyring';
import { mnemonicGenerate, cryptoWaitReady } from '@polkadot/util-crypto';

async function generateWallet() {
  // Wait for WASM crypto to initialize
  await cryptoWaitReady();

  // Generate a new testnet wallet
  const mnemonic = mnemonicGenerate();
  const keyring = new Keyring({ type: 'sr25519', ss58Format: 42 }); // 42 = Substrate generic
  const pair = keyring.addFromMnemonic(mnemonic);

  console.log('\n🔑 NEW TESTNET WALLET GENERATED\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('Address (Substrate):', pair.address);
  console.log('\nMnemonic (SAVE THIS SECURELY):');
  console.log(mnemonic);
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('⚠️  IMPORTANT:');
  console.log('   - Save the mnemonic in a safe place (password manager, etc.)');
  console.log('   - Never commit the mnemonic to git');
  console.log('   - This wallet needs testnet tokens to function');
  console.log('\n💰 Get testnet tokens:');
  console.log('   - Polkadot testnet (Westend): https://faucet.polkadot.io/westend');
  console.log('   - Rococo testnet: https://paritytech.github.io/polkadot-testnet-faucet/');
  console.log('\n📋 Next steps:');
  console.log('   1. Save the mnemonic securely');
  console.log('   2. Import wallet to Polkadot.js extension using the mnemonic');
  console.log('   3. Get testnet tokens from faucet');
  console.log('   4. Update the hardcoded addresses in the code with this new address');
  console.log('\n');
}

generateWallet().catch(console.error);
