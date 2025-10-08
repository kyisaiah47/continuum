"use client";

import { mockDataAccessRequests } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Plus, Wallet, Clock, DollarSign, CheckCircle, XCircle } from "lucide-react";

export default function DataAccessPage() {
  const activeRequests = mockDataAccessRequests.filter(
    (r) => r.status === "approved"
  );
  const pendingRequests = mockDataAccessRequests.filter(
    (r) => r.status === "pending"
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Access Management</h1>
          <p className="text-muted-foreground">
            Manage customer data access requests via Web3
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Request Access
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">Active Access</p>
              <p className="text-2xl font-bold">{activeRequests.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-sm text-muted-foreground">Pending Approval</p>
              <p className="text-2xl font-bold">{pendingRequests.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="text-2xl font-bold">
                {mockDataAccessRequests.reduce(
                  (sum, r) => sum + r.paymentAmount,
                  0
                )}{" "}
                DOT
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Pending Requests</h2>
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <Card key={request.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <Wallet className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">{request.customerName}</h3>
                      <Badge variant="secondary">Pending</Badge>
                    </div>

                    <div className="mb-3 text-sm text-muted-foreground">
                      <p className="mb-1">
                        Wallet: {request.customerWallet.slice(0, 20)}...
                      </p>
                      <p>
                        Requested:{" "}
                        {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="mb-3">
                      <p className="mb-1 text-sm font-medium">
                        Requested Data:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {request.requestedFields.map((field) => (
                          <Badge key={field} variant="outline">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">Duration: </span>
                        <span className="font-medium">
                          {request.accessDurationDays} days
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Payment: </span>
                        <span className="font-medium">
                          {request.paymentAmount} {request.paymentCurrency}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Active Access */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Active Access</h2>
        {activeRequests.length > 0 ? (
          <div className="space-y-4">
            {activeRequests.map((request) => {
              const expiresIn = Math.ceil(
                (new Date(request.expiresAt!).getTime() - new Date().getTime()) /
                  (1000 * 60 * 60 * 24)
              );

              return (
                <Card key={request.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <Wallet className="h-5 w-5 text-green-600" />
                        <h3 className="font-semibold">{request.customerName}</h3>
                        <Badge className="bg-green-600">Active</Badge>
                      </div>

                      <div className="mb-3 text-sm text-muted-foreground">
                        <p className="mb-1">
                          Wallet: {request.customerWallet.slice(0, 20)}...
                        </p>
                        <p>
                          Approved:{" "}
                          {new Date(request.approvedAt!).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="mb-3">
                        <p className="mb-1 text-sm font-medium">
                          Accessing Data:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {request.requestedFields.map((field) => (
                            <Badge key={field} variant="outline">
                              {field}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Expires in:{" "}
                          </span>
                          <span
                            className={`font-medium ${
                              expiresIn <= 7 ? "text-red-600" : ""
                            }`}
                          >
                            {expiresIn} days
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Paid: </span>
                          <span className="font-medium">
                            {request.paymentAmount} {request.paymentCurrency}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Extend Access
                      </Button>
                      <Button size="sm" variant="destructive">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Wallet className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No Active Access</h3>
            <p className="mb-4 text-muted-foreground">
              You don't have any active data access at the moment.
            </p>
            <Button>Request Customer Data Access</Button>
          </Card>
        )}
      </div>

      {/* How It Works */}
      <Card className="mt-8 bg-muted/50 p-6">
        <h3 className="mb-3 font-semibold">How Data Access Works</h3>
        <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
          <li>Request access to specific customer data fields</li>
          <li>Specify duration (days) and payment amount in DOT</li>
          <li>Payment is escrowed in smart contract</li>
          <li>Customer receives notification and reviews request</li>
          <li>
            If approved: payment released to customer, you get time-limited access
          </li>
          <li>Access automatically expires after duration</li>
          <li>Customer can revoke access at any time</li>
        </ol>
      </Card>
    </div>
  );
}
