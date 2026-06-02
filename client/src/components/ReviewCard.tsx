import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StarRating } from "@/components/StarRating";
import { Card, CardContent } from "@/components/ui/card";
import type { Review } from "@/data/reviews";
import { cn } from "@/lib/utils";

const COLLAPSE_CHAR_THRESHOLD = 220;

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const text = t(`reviews.items.${review.id}.text`);
  const canExpand = text.length >= COLLAPSE_CHAR_THRESHOLD;

  return (
    <Card
      className={cn(
        "flex h-auto w-[min(calc(100vw-2.5rem),20rem)] shrink-0 snap-center flex-col overflow-hidden border-cream-dark/90 bg-white shadow-md",
        "sm:h-[21rem] sm:w-[22rem] sm:max-w-[22rem] sm:snap-start",
        className
      )}
    >
      <CardContent className="flex h-full min-h-0 flex-col p-5 sm:p-6">
        <div className="flex shrink-0 items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold tracking-wide",
              review.avatarClass
            )}
            aria-hidden
          >
            {review.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <p className="min-w-0 text-base font-semibold leading-tight text-charcoal">
                {review.author}
              </p>
              <span className="shrink-0 text-xs leading-tight text-muted sm:text-sm">
                {t(`reviews.timeAgo.${review.id}`)}
              </span>
            </div>
            <StarRating
              rating={review.rating}
              className="mt-1.5 [&_svg]:h-4 [&_svg]:w-4"
            />
          </div>
        </div>

        <div
          className={cn(
            "mt-3 min-w-0",
            canExpand && expanded && "min-h-0 flex-1 overflow-y-auto pe-1",
            canExpand && !expanded && "min-h-0 flex-1"
          )}
        >
          <p
            id={`review-text-${review.id}`}
            className={cn(
              "break-words text-sm leading-relaxed text-charcoal/90 [overflow-wrap:anywhere] sm:text-base",
              canExpand && !expanded && "line-clamp-4"
            )}
          >
            {text}
          </p>
        </div>

        {canExpand && (
          <div className="mt-3 shrink-0">
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="text-sm font-semibold text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline sm:text-base"
              aria-expanded={expanded}
              aria-controls={`review-text-${review.id}`}
            >
              {expanded ? t("reviews.showLess") : t("reviews.readMore")}
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
