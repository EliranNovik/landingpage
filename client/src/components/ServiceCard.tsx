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
        "flex h-full min-h-[17.5rem] flex-col border-white/95 bg-white sm:min-h-[18.5rem]",
        "shadow-[0_2px_8px_rgba(44,36,32,0.08),0_8px_24px_rgba(44,36,32,0.12)]",
        "transition-[transform,box-shadow] duration-300 ease-out",
        "hover:-translate-y-1.5 hover:shadow-[0_4px_12px_rgba(44,36,32,0.1),0_16px_40px_rgba(44,36,32,0.16)]",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      )}
    >
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Icon
          className="h-8 w-8 shrink-0 text-accent sm:h-10 sm:w-10"
          strokeWidth={1.75}
          aria-hidden
        />
        <CardTitle className="mt-4 text-2xl leading-snug sm:text-[1.875rem] lg:text-3xl">
          {title}
        </CardTitle>
        <p className="mt-3 flex-1 text-base leading-relaxed text-muted sm:mt-3.5 sm:text-lg">
          {description}
        </p>
      </div>
    </Card>
  );
}
