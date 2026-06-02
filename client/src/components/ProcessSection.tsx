import { useTranslation } from "react-i18next";
import { SCROLL_STAGGER_MS, ScrollReveal } from "@/components/ScrollReveal";
import { processItems } from "@/data/services";
import { cn } from "@/lib/utils";

interface ProcessSectionProps {
  onDarkBackground?: boolean;
}

export function ProcessSection({ onDarkBackground }: ProcessSectionProps) {
  const { t } = useTranslation();
  const stepCount = processItems.length;

  return (
    <section id="process" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p
            className={cn(
              "text-lg font-medium tracking-wide uppercase sm:text-xl",
              onDarkBackground ? "text-cream/80" : "text-accent"
            )}
          >
            {t("process.eyebrow")}
          </p>
          <h2
            className={cn(
              "mt-2 font-serif text-5xl sm:text-6xl",
              onDarkBackground ? "text-white" : "text-charcoal"
            )}
          >
            {t("process.title")}
          </h2>
          <p
            className={cn(
              "mt-4 text-base leading-relaxed",
              onDarkBackground ? "text-white/80" : "text-muted"
            )}
          >
            {t("process.subtitle")}
          </p>
        </ScrollReveal>

        <div className="relative mt-12 lg:mt-16">
          <div
            className="pointer-events-none absolute top-5 hidden h-0.5 bg-cream/40 lg:block"
            style={{
              left: `${100 / stepCount / 2}%`,
              right: `${100 / stepCount / 2}%`,
            }}
            aria-hidden
          />

          <ol className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-6">
            {processItems.map((item, index) => {
              const isLast = index === processItems.length - 1;

              return (
                <li
                  key={item.id}
                  className={cn(
                    "relative",
                    !isLast && "pb-10 sm:pb-12 lg:pb-0"
                  )}
                >
                  <ScrollReveal
                    delay={index * SCROLL_STAGGER_MS}
                    className={cn(
                      "flex gap-4 sm:gap-5",
                      "lg:flex-col lg:items-center lg:gap-5 lg:text-center"
                    )}
                  >
                    {!isLast && (
                      <span
                        className="absolute left-5 top-10 bottom-0 w-0.5 -translate-x-1/2 bg-cream/40 lg:hidden"
                        aria-hidden
                      />
                    )}

                    <div
                      className={cn(
                        "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-base font-semibold shadow-sm",
                        onDarkBackground
                          ? "border-cream bg-cream text-accent ring-4 ring-accent"
                          : "border-accent bg-accent text-white ring-4 ring-cream"
                      )}
                    >
                      {item.step}
                    </div>

                    <div className="min-w-0 flex-1 pt-0.5 lg:max-w-xs">
                      <h3
                        className={cn(
                          "font-serif text-xl font-semibold leading-snug sm:text-[1.35rem]",
                          onDarkBackground ? "text-white" : "text-charcoal"
                        )}
                      >
                        {t(`process.steps.${item.id}.title`)}
                      </h3>
                      <p
                        className={cn(
                          "mt-2 text-base leading-relaxed sm:mt-2.5",
                          onDarkBackground ? "text-white/75" : "text-muted"
                        )}
                      >
                        {t(`process.steps.${item.id}.description`)}
                      </p>
                    </div>
                  </ScrollReveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
