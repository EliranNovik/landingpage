import { useTranslation } from "react-i18next";
import { ReviewCard } from "@/components/ReviewCard";
import { SCROLL_STAGGER_MS, ScrollReveal } from "@/components/ScrollReveal";
import { googleReviews } from "@/data/reviews";

export function ReviewsSection() {
  const { t } = useTranslation();

  return (
    <section
      id="reviews"
      className="page-beige border-t border-cream-dark/60 py-14 sm:py-16 lg:pb-24 lg:py-20"
      style={{ backgroundColor: "#f7f0e6" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-lg font-medium tracking-wide text-accent uppercase sm:text-xl">
              {t("reviews.eyebrow")}
            </p>
            <h2 className="mt-2 font-serif text-5xl text-charcoal sm:text-6xl">
              {t("reviews.title")}
            </h2>
          </div>
          <p className="text-sm text-muted">{t("reviews.source")}</p>
        </ScrollReveal>

        <div
          className="mt-10 -mx-4 flex flex-nowrap items-stretch gap-4 overflow-x-auto px-4 pb-3 scroll-smooth snap-x snap-mandatory sm:mx-0 sm:gap-5 sm:px-0 lg:gap-6 [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-cream-dark [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-cream-dark/30"
          tabIndex={0}
          aria-label="Client reviews — scroll horizontally"
        >
          {googleReviews.map((review, index) => (
            <ScrollReveal
              key={review.id}
              delay={index * SCROLL_STAGGER_MS}
              variant="fade-right"
              className="block shrink-0 snap-center sm:snap-start"
            >
              <ReviewCard review={review} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
