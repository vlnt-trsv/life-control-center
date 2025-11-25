import { cn } from "@/shared/lib/utils";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

export const Wrapper = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("w-full max-w-screen mx-auto flex", className)}
      {...props}
    >
      {children}
    </div>
  );
});

Wrapper.displayName = "Wrapper";
