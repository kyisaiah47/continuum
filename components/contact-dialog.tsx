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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createContact, updateContact } from "@/lib/api/contacts";
import type { Contact } from "@/lib/supabase-client";
import { Loader2 } from "lucide-react";

type ContactDialogProps = {
  contact?: Contact;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export function ContactDialog({
  contact,
  open,
  onOpenChange,
  onSuccess,
}: ContactDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: contact?.name || "",
    email: contact?.email || "",
    phone: contact?.phone || "",
    company: contact?.company || "",
    job_title: contact?.job_title || "",
    notes: contact?.notes || "",
    wallet_address: contact?.wallet_address || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (contact) {
        // Update existing contact
        await updateContact(contact.id, {
          ...formData,
          has_wallet: !!formData.wallet_address,
        });
        toast.success("Contact updated successfully!");
      } else {
        // Create new contact
        await createContact({
          ...formData,
          user_id: "", // Will be set in the API function
          has_wallet: !!formData.wallet_address,
          tags: [],
        });
        toast.success("Contact created successfully!");
      }

      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Failed to save contact");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {contact ? "Edit Contact" : "Add New Contact"}
          </DialogTitle>
          <DialogDescription>
            {contact
              ? "Update contact information"
              : "Add a new contact to your CRM"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                disabled={isLoading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={isLoading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                disabled={isLoading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                disabled={isLoading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="job_title">Job Title</Label>
              <Input
                id="job_title"
                value={formData.job_title}
                onChange={(e) =>
                  setFormData({ ...formData, job_title: e.target.value })
                }
                disabled={isLoading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="wallet_address">Polkadot Wallet Address</Label>
              <Input
                id="wallet_address"
                value={formData.wallet_address}
                onChange={(e) =>
                  setFormData({ ...formData, wallet_address: e.target.value })
                }
                placeholder="5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
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
              ) : contact ? (
                "Update Contact"
              ) : (
                "Create Contact"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
