import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonPurpleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export const ButtonPurple = forwardRef<HTMLButtonElement, ButtonPurpleProps>(
  ({ className, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn("btn-purple", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

ButtonPurple.displayName = "ButtonPurple";
