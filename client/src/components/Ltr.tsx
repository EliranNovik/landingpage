import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LtrProps {
  children: ReactNode;
  className?: string;
}

/** Isolated left-to-right run (fixes punctuation order in RTL pages). */
export function Ltr({ children, className }: LtrProps) {
  return (
    <span dir="ltr" className={cn("inline-block [unicode-bidi:isolate]", className)}>
      {children}
    </span>
  );
}
