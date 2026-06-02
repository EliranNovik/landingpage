import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const { t } = useTranslation();

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      className="page-beige border-t border-cream-dark py-16 sm:py-20"
      style={{ backgroundColor: "#f7f0e6" }}
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="font-serif text-3xl leading-tight text-charcoal sm:text-4xl">
            {t("cta.title")}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="mt-5 text-base leading-relaxed text-muted">
            {t("cta.subtitle")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <Button type="button" size="lg" className="mt-8" onClick={scrollToForm}>
            <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            {t("cta.button")}
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
