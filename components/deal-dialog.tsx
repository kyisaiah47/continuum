"use client";

import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { createDeal, updateDeal } from "@/lib/api/deals";
import { getContacts } from "@/lib/api/contacts";
import type { Deal, Contact } from "@/lib/supabase-client";
import { Loader2 } from "lucide-react";

type DealDialogProps = {
  deal?: Deal;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export function DealDialog({
  deal,
  open,
  onOpenChange,
  onSuccess,
}: DealDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [formData, setFormData] = useState({
    title: deal?.title || "",
    value: deal?.value?.toString() || "",
    currency: deal?.currency || "USD",
    stage: deal?.stage || "lead",
    status: deal?.status || "open",
    probability: deal?.probability?.toString() || "50",
    expected_close_date: deal?.expected_close_date || "",
    contact_id: deal?.contact_id || "",
    notes: deal?.notes || "",
  });

  useEffect(() => {
    if (open) {
      loadContacts();
    }
  }, [open]);

  const loadContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error("Failed to load contacts", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const dealData = {
        title: formData.title,
        value: parseFloat(formData.value),
        currency: formData.currency,
        stage: formData.stage as Deal['stage'],
        status: formData.status as Deal['status'],
        probability: parseInt(formData.probability),
        expected_close_date: formData.expected_close_date || undefined,
        contact_id: formData.contact_id || undefined,
        notes: formData.notes || undefined,
      };

      if (deal) {
        await updateDeal(deal.id, dealData);
        toast.success("Deal updated successfully!");
      } else {
        await createDeal({
          ...dealData,
          user_id: "", // Will be set in the API function
        });
        toast.success("Deal created successfully!");
      }

      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Failed to save deal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{deal ? "Edit Deal" : "Add New Deal"}</DialogTitle>
          <DialogDescription>
            {deal ? "Update deal information" : "Add a new deal to your pipeline"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">
                Deal Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Acme Corp - Enterprise Plan"
                required
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="value">
                  Value <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="value"
                  type="number"
                  step="0.01"
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({ ...formData, value: e.target.value })
                  }
                  placeholder="50000"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) =>
                    setFormData({ ...formData, currency: value })
                  }
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="DOT">DOT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contact_id">Contact</Label>
              <Select
                value={formData.contact_id}
                onValueChange={(value) =>
                  setFormData({ ...formData, contact_id: value })
                }
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a contact" />
                </SelectTrigger>
                <SelectContent>
                  {contacts.map((contact) => (
                    <SelectItem key={contact.id} value={contact.id}>
                      {contact.name} {contact.company && `(${contact.company})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="stage">Stage</Label>
                <Select
                  value={formData.stage}
                  onValueChange={(value) =>
                    setFormData({ ...formData, stage: value })
                  }
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="demo">Demo</SelectItem>
                    <SelectItem value="proposal">Proposal</SelectItem>
                    <SelectItem value="negotiation">Negotiation</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="probability">Probability (%)</Label>
                <Input
                  id="probability"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.probability}
                  onChange={(e) =>
                    setFormData({ ...formData, probability: e.target.value })
                  }
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="expected_close_date">Expected Close Date</Label>
              <Input
                id="expected_close_date"
                type="date"
                value={formData.expected_close_date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    expected_close_date: e.target.value,
                  })
                }
                disabled={isLoading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={3}
                disabled={isLoading}
              />
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
                  Saving...
                </>
              ) : deal ? (
                "Update Deal"
              ) : (
                "Create Deal"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
