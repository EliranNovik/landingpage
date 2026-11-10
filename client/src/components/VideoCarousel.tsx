import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface VideoCarouselProps {
  label: string;
  rtl?: boolean;
  previousLabel: string;
  nextLabel: string;
  children: ReactNode;
}

export function VideoCarousel({
  label,
  rtl = false,
  previousLabel,
  nextLabel,
  children,
}: VideoCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const distance = track.clientWidth * 0.8 * direction;
    track.scrollBy({ left: rtl ? -distance : distance, behavior: "smooth" });
  };

  const arrowClass =
    "grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:border-white/30 hover:bg-white/20";

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="font-sans text-lg font-bold text-white/90">{label}</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label={previousLabel}
            className={arrowClass}
          >
            {rtl ? (
              <ChevronRight className="h-5 w-5" aria-hidden />
            ) : (
              <ChevronLeft className="h-5 w-5" aria-hidden />
            )}
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label={nextLabel}
            className={arrowClass}
          >
            {rtl ? (
              <ChevronLeft className="h-5 w-5" aria-hidden />
            ) : (
              <ChevronRight className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}
