import type { LucideIcon } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <Card
      className={cn(
        "h-full border-white/95 bg-white",
        "shadow-[0_2px_8px_rgba(44,36,32,0.08),0_8px_24px_rgba(44,36,32,0.12)]",
        "transition-[transform,box-shadow] duration-300 ease-out",
        "hover:-translate-y-1.5 hover:shadow-[0_4px_12px_rgba(44,36,32,0.1),0_16px_40px_rgba(44,36,32,0.16)]",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      )}
    >
      <div className="relative p-5 sm:p-6">
        <div
          className={cn(
            "absolute right-4 top-4 flex h-14 w-14 items-center justify-center rounded-2xl sm:right-5 sm:top-5 sm:h-16 sm:w-16",
            "bg-gradient-to-br from-accent/15 to-accent/5 text-accent",
            "shadow-[0_2px_8px_rgba(122,68,52,0.15)] ring-1 ring-accent/10"
          )}
        >
          <Icon className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.75} />
        </div>
        <div className="pr-[4.25rem] sm:pr-20">
          <CardTitle className="text-xl leading-snug sm:text-2xl">{title}</CardTitle>
          <p className="mt-2 text-base leading-relaxed text-muted sm:mt-2.5 sm:text-[1.0625rem]">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}
