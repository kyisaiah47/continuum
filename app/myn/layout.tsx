import { WalletProvider } from "@/lib/polkadot/wallet-context"

export default function MynLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <WalletProvider>{children}</WalletProvider>
}
