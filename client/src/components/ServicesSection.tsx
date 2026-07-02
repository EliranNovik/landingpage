import { useTranslation } from "react-i18next";
import { ServiceCard } from "@/components/ServiceCard";
import { SCROLL_STAGGER_MS, ScrollReveal } from "@/components/ScrollReveal";
import { serviceItems } from "@/data/services";
import { cn } from "@/lib/utils";

interface ServicesSectionProps {
  onDarkBackground?: boolean;
}

export function ServicesSection({ onDarkBackground }: ServicesSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p
            className={cn(
              "text-lg font-medium tracking-wide uppercase sm:text-xl",
              onDarkBackground ? "text-cream/80" : "text-accent"
            )}
          >
            {t("services.eyebrow")}
          </p>
          <h2
            className={cn(
              "mt-2 font-serif text-5xl sm:text-6xl",
              onDarkBackground ? "text-white" : "text-charcoal"
            )}
          >
            {t("services.title")}
          </h2>
          <p
            className={cn(
              "mt-4 text-base leading-relaxed",
              onDarkBackground ? "text-white/80" : "text-muted"
            )}
          >
            {t("services.subtitle")}
          </p>
        </ScrollReveal>
      </div>

      <div
        className={cn(
          "mt-12 flex flex-nowrap items-stretch gap-4 overflow-x-auto px-4 pb-3",
          "scroll-smooth snap-x snap-mandatory",
          "[-ms-overflow-style:none] [scrollbar-width:thin]",
          "[&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full",
          "[&::-webkit-scrollbar-thumb]:bg-cream-dark [&::-webkit-scrollbar-track]:rounded-full",
          "[&::-webkit-scrollbar-track]:bg-cream-dark/30",
          "sm:mx-auto sm:max-w-7xl sm:grid sm:grid-cols-2 sm:items-stretch sm:gap-6 sm:overflow-visible sm:px-6 sm:pb-0 lg:grid-cols-3 lg:px-8 xl:grid-cols-4"
        )}
        tabIndex={0}
        aria-label={t("services.title")}
      >
        {serviceItems.map((service, index) => (
          <ScrollReveal
            key={service.id}
            delay={index * SCROLL_STAGGER_MS}
            className="flex h-full w-[min(calc(100vw-3rem),21rem)] shrink-0 snap-start sm:w-full sm:shrink"
          >
            <ServiceCard
              icon={service.icon}
              title={t(`services.items.${service.id}.title`)}
              description={t(`services.items.${service.id}.description`)}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
