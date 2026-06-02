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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {serviceItems.map((service, index) => (
            <ScrollReveal
              key={service.id}
              delay={index * SCROLL_STAGGER_MS}
              className="h-full"
            >
              <ServiceCard
                icon={service.icon}
                title={t(`services.items.${service.id}.title`)}
                description={t(`services.items.${service.id}.description`)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
