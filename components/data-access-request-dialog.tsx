"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { requestDataAccess } from "@/lib/polkadot/contract";
import type { Contact } from "@/lib/supabase-client";
import { Loader2 } from "lucide-react";

type DataAccessRequestDialogProps = {
  contact: Contact;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

const AVAILABLE_FIELDS = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone' },
  { id: 'company', label: 'Company' },
  { id: 'job_title', label: 'Job Title' },
  { id: 'notes', label: 'Notes' },
];

export function DataAccessRequestDialog({
  contact,
  open,
  onOpenChange,
  onSuccess,
}: DataAccessRequestDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [durationDays, setDurationDays] = useState('30');
  const [paymentAmount, setPaymentAmount] = useState('5');

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields((prev) =>
      prev.includes(fieldId)
        ? prev.filter((id) => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!contact.wallet_address) {
      toast.error('Contact does not have a wallet address');
      setIsLoading(false);
      return;
    }

    if (selectedFields.length === 0) {
      toast.error('Please select at least one field');
      setIsLoading(false);
      return;
    }

    try {
      // Call smart contract to request access
      await requestDataAccess(
        contact.wallet_address,
        selectedFields,
        parseInt(durationDays),
        paymentAmount
      );

      toast.success('Access request submitted! Waiting for customer approval.');
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Error requesting access:', error);
      toast.error(error.message || 'Failed to request data access');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request Data Access</DialogTitle>
          <DialogDescription>
            Request temporary access to {contact.name}'s data. Payment will be
            escrowed until they approve or reject.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Customer Info */}
            <div className="p-4 bg-muted rounded-lg">
              <div className="font-semibold mb-1">{contact.name}</div>
              <div className="text-sm text-muted-foreground">
                Wallet: {contact.wallet_address?.slice(0, 8)}...
                {contact.wallet_address?.slice(-6)}
              </div>
            </div>

            {/* Field Selection */}
            <div className="grid gap-2">
              <Label>Requested Fields *</Label>
              <div className="grid gap-2 p-4 border rounded-lg">
                {AVAILABLE_FIELDS.map((field) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={field.id}
                      checked={selectedFields.includes(field.id)}
                      onCheckedChange={() => handleFieldToggle(field.id)}
                      disabled={isLoading}
                    />
                    <label
                      htmlFor={field.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {field.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="grid gap-2">
              <Label htmlFor="duration">
                Access Duration (days) *
              </Label>
              <Input
                id="duration"
                type="number"
                min="1"
                max="365"
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                placeholder="30"
                required
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Access will automatically expire after this period
              </p>
            </div>

            {/* Payment */}
            <div className="grid gap-2">
              <Label htmlFor="payment">
                Payment Offer (DOT) *
              </Label>
              <Input
                id="payment"
                type="number"
                step="0.1"
                min="0.1"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="5"
                required
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Funds will be escrowed until customer approves or rejects
              </p>
            </div>

            {/* Summary */}
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-sm space-y-1">
                <div className="font-semibold text-blue-900 dark:text-blue-100">
                  Summary
                </div>
                <div className="text-blue-700 dark:text-blue-300">
                  • {selectedFields.length} field(s) requested
                </div>
                <div className="text-blue-700 dark:text-blue-300">
                  • {durationDays} days access
                </div>
                <div className="text-blue-700 dark:text-blue-300">
                  • {paymentAmount} DOT payment
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Requesting...
                </>
              ) : (
                `Request Access (${paymentAmount} DOT)`
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
