import { Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BrandTrans } from "@/components/BrandTrans";
import { Ltr } from "@/components/Ltr";
import type { YouTubeVideo } from "@/data/videos";
import { youtubeThumbnailUrl } from "@/data/videos";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  video: YouTubeVideo;
  titleKey: string;
  playLabelKey: string;
  onPlay: (video: YouTubeVideo) => void;
  className?: string;
}

export function VideoCard({
  video,
  titleKey,
  playLabelKey,
  onPlay,
  className,
}: VideoCardProps) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={() => onPlay(video)}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl border border-cream-dark/80 bg-charcoal text-start shadow-md transition-shadow hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f0e6]",
        className
      )}
      aria-label={t(playLabelKey)}
    >
      <span className="relative block aspect-video w-full">
        <img
          src={youtubeThumbnailUrl(video.id, "hqdefault")}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
        <span
          className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/25 to-charcoal/10 transition-colors group-hover:via-charcoal/35"
          aria-hidden
        />
        <span
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/95 text-white shadow-lg ring-4 ring-white/25 transition-transform duration-300 group-hover:scale-110 sm:h-[4.5rem] sm:w-[4.5rem]">
            <Play className="ms-1 h-7 w-7 fill-current sm:h-8 sm:w-8" />
          </span>
        </span>
        <span className="absolute bottom-0 start-0 end-0 p-4 sm:p-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium tracking-wide text-white/90 backdrop-blur-sm">
            <Ltr>{t("videos.badge")}</Ltr>
          </span>
          <span className="mt-2 block font-serif text-lg font-semibold leading-snug text-white sm:text-xl">
            <BrandTrans i18nKey={titleKey} />
          </span>
        </span>
      </span>
    </button>
  );
}
