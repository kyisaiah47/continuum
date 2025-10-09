"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Wallet, Clock, DollarSign, Shield } from "lucide-react";
import { mockDataAccessRequests } from "@/lib/mock-data";

export default function DataAccessPage() {
  const activeRequests = mockDataAccessRequests.filter((r) => r.status === "approved");
  const pendingRequests = mockDataAccessRequests.filter((r) => r.status === "pending");

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
          {/* Info Card */}
          <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
            <div className="flex items-start gap-4">
              <Shield className="h-8 w-8 text-purple-400" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Customer-Owned Data</h3>
                <p className="text-sm text-muted-foreground">
                  Request temporary access to customer data stored in their Polkadot wallets.
                  Pay in DOT tokens for time-limited access. Customers maintain full control.
                </p>
              </div>
            </div>
          </Card>

          {/* Active Requests */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Active Access ({activeRequests.length})</h2>
            <div className="space-y-3">
              {activeRequests.map((request) => {
                const daysLeft = Math.ceil(
                  (new Date(request.expiresAt!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                );

                return (
                  <Card key={request.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-semibold text-lg">{request.customerName}</h3>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            Active
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Wallet Address</p>
                            <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                              {request.customerWallet.slice(0, 8)}...{request.customerWallet.slice(-6)}
                            </code>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Payment</p>
                            <p className="text-sm font-semibold">
                              {request.paymentAmount} {request.paymentCurrency}
                            </p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground mb-2">Access to Fields:</p>
                          <div className="flex gap-2">
                            {request.requestedFields.map((field) => (
                              <Badge key={field} variant="secondary">
                                {field}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className={daysLeft <= 7 ? "text-orange-600 font-medium" : "text-muted-foreground"}>
                              {daysLeft} days remaining
                            </span>
                          </div>
                          <div className="text-muted-foreground">
                            Expires: {new Date(request.expiresAt!).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <Button variant="outline">Extend</Button>
                    </div>
                  </Card>
                );
              })}
              {activeRequests.length === 0 && (
                <Card className="p-8 text-center text-muted-foreground">
                  No active data access
                </Card>
              )}
            </div>
          </div>

          {/* Pending Requests */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Pending Approval ({pendingRequests.length})</h2>
            <div className="space-y-3">
              {pendingRequests.map((request) => (
                <Card key={request.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-semibold text-lg">{request.customerName}</h3>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          Pending
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Wallet Address</p>
                          <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                            {request.customerWallet.slice(0, 8)}...{request.customerWallet.slice(-6)}
                          </code>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Offered Payment</p>
                          <p className="text-sm font-semibold">
                            {request.paymentAmount} {request.paymentCurrency}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Requested Fields:</p>
                        <div className="flex gap-2">
                          {request.requestedFields.map((field) => (
                            <Badge key={field} variant="secondary">
                              {field}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Duration: {request.accessDurationDays} days
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Cancel</Button>
                    </div>
                  </div>
                </Card>
              ))}
              {pendingRequests.length === 0 && (
                <Card className="p-8 text-center text-muted-foreground">
                  No pending requests
                </Card>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
