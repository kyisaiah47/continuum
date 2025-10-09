"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Wallet, LogOut } from "lucide-react";

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already connected
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      // @ts-ignore - Polkadot extension
      const { web3Accounts, web3Enable } = await import(
        "@polkadot/extension-dapp"
      );

      const extensions = await web3Enable("Ownbase");
      if (extensions.length === 0) {
        return;
      }

      const accounts = await web3Accounts();
      if (accounts.length > 0) {
        setAccount(accounts[0].address);
        setIsConnected(true);
      }
    } catch (error) {
      console.log("Wallet not connected");
    }
  };

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      // @ts-ignore - Polkadot extension
      const { web3Accounts, web3Enable } = await import(
        "@polkadot/extension-dapp"
      );

      // Request permission to access accounts
      const extensions = await web3Enable("Ownbase");

      if (extensions.length === 0) {
        alert(
          "No Polkadot wallet extension found. Please install Polkadot{.js} extension."
        );
        setIsLoading(false);
        return;
      }

      // Get accounts
      const accounts = await web3Accounts();

      if (accounts.length === 0) {
        alert("No accounts found in your wallet.");
        setIsLoading(false);
        return;
      }

      // Use first account
      setAccount(accounts[0].address);
      setIsConnected(true);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
  };

  if (isConnected && account) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="gap-2">
          <Wallet className="h-3 w-3" />
          {account.slice(0, 6)}...{account.slice(-4)}
        </Badge>
        <Button variant="ghost" size="sm" onClick={disconnectWallet}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Polkadot Wallet</DialogTitle>
            <DialogDescription>
              Connect your Polkadot wallet to enable Web3 features like
              customer data access and payments.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-semibold">Requirements</h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Polkadot{"{.js}"} browser extension installed</li>
                <li>At least one account in your wallet</li>
                <li>Connected to Westend or Rococo testnet</li>
              </ul>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm">
                Don't have Polkadot{"{.js}"}?{" "}
                <a
                  href="https://polkadot.js.org/extension/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Download it here
                </a>
              </p>
            </div>

            <Button
              className="w-full"
              onClick={connectWallet}
              disabled={isLoading}
            >
              {isLoading ? "Connecting..." : "Connect Wallet"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
