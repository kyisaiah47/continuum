import { Database } from "lucide-react";
import { SignupForm } from "@/components/signup-form";
import { GradientOrbs } from "@/components/ui/gradient-orbs";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative flex flex-col gap-4 p-6 md:p-10">
        <GradientOrbs variant="minimal" />
        <div className="relative z-10 flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Database className="size-4" />
            </div>
            Web3 CRM
          </a>
        </div>
        <div className="relative z-10 flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <GradientOrbs variant="default" />
        <div className="absolute inset-0 flex items-center justify-center p-12 z-10">
          <div className="max-w-md space-y-4 text-center">
            <h2 className="text-3xl font-bold">Customer-Owned Data on Polkadot</h2>
            <p className="text-muted-foreground text-lg">
              A revolutionary CRM where customers own their data instead of companies.
              Built on Polkadot blockchain with smart contract access control.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
