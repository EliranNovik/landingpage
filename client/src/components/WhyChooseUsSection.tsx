import { useTranslation } from "react-i18next";
import { BrandTrans } from "@/components/BrandTrans";
import { whyChoosePoints } from "@/data/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WhyChooseUsSectionProps {
  onDarkBackground?: boolean;
}

export function WhyChooseUsSection({ onDarkBackground }: WhyChooseUsSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="why-us" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={cn(
              "text-sm font-medium tracking-wide uppercase",
              onDarkBackground ? "text-cream/80" : "text-accent"
            )}
          >
            {t("whyChoose.eyebrow")}
          </p>
          <h2
            className={cn(
              "mt-2 font-serif text-3xl sm:text-4xl",
              onDarkBackground ? "text-white" : "text-charcoal"
            )}
          >
            <BrandTrans i18nKey="whyChoose.title" />
          </h2>
          <p
            className={cn(
              "mt-4 text-base leading-relaxed",
              onDarkBackground ? "text-white/80" : "text-muted"
            )}
          >
            {t("whyChoose.subtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChoosePoints.map((point) => (
            <Card
              key={point.id}
              className="border-cream-dark/80 bg-card transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <CardTitle className="text-lg">
                  {t(`whyChoose.items.${point.id}.title`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted">
                  {t(`whyChoose.items.${point.id}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
