import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { teamPhoto } from "@/data/assets";
import { cn } from "@/lib/utils";

export function TeamSection() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language.startsWith("he");

  return (
    <section
      id="team"
      className="page-beige border-t border-cream-dark/60 py-14 sm:py-16 lg:py-20"
      style={{ backgroundColor: "#f7f0e6" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "grid items-center gap-10 lg:grid-cols-2 lg:gap-14",
            isRtl && "lg:[direction:rtl]"
          )}
        >
          <ScrollReveal
            variant={isRtl ? "fade-left" : "fade-right"}
            className={cn(isRtl && "lg:[direction:rtl]")}
          >
            <div className="overflow-hidden rounded-2xl border border-cream-dark/80 bg-white shadow-[0_10px_40px_rgba(61,35,24,0.12)] sm:rounded-3xl">
              <img
                src={teamPhoto}
                alt={t("team.imageAlt")}
                className="aspect-[4/3] w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal
            delay={120}
            className={cn(isRtl && "text-right lg:[direction:rtl]")}
          >
            <p className="text-lg font-medium tracking-wide text-accent uppercase sm:text-xl">
              {t("team.eyebrow")}
            </p>
            <h2 className="mt-2 font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
              {t("team.title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              {t("team.subtitle")}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
