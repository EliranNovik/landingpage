import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-[120px] w-full rounded-xl border border-cream-dark bg-white px-4 py-3 text-sm text-charcoal shadow-sm transition-colors placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
