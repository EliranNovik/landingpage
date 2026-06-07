import { useState } from "react";
import { Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BrandTrans } from "@/components/BrandTrans";
import { VideoCard } from "@/components/VideoCard";
import { VideoModal } from "@/components/VideoModal";
import { SCROLL_STAGGER_MS, ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import {
  getYouTubeVideos,
  youtubeChannelUrl,
  type YouTubeVideo,
} from "@/data/videos";
import { cn } from "@/lib/utils";

export function VideosSection() {
  const { t, i18n } = useTranslation();
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);
  const videos = getYouTubeVideos(i18n.language);

  const activeTitleKey = activeVideo
    ? `videos.items.${activeVideo.contentKey}.title`
    : "";
  const activePlayLabelKey = activeVideo
    ? `videos.items.${activeVideo.contentKey}.playLabel`
    : "";

  return (
    <section
      id="videos"
      className="page-beige border-t border-cream-dark/60 py-14 sm:py-16 lg:py-20"
      style={{ backgroundColor: "#f7f0e6" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-lg font-medium tracking-wide text-accent uppercase sm:text-xl">
            {t("videos.eyebrow")}
          </p>
          <h2 className="mt-2 font-serif text-5xl text-charcoal sm:text-6xl">
            {t("videos.title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {t("videos.subtitle")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={120} className="mx-auto mt-6 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <a
              href={youtubeChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              <BrandTrans i18nKey="videos.showChannel" />
            </a>
          </Button>
        </ScrollReveal>

        <div
          className={cn(
            "mt-10 grid gap-6",
            videos.length === 2
              ? "mx-auto max-w-3xl sm:grid-cols-2"
              : "sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          )}
        >
          {videos.map((video, index) => (
            <ScrollReveal key={video.id} delay={index * SCROLL_STAGGER_MS}>
              <VideoCard
                video={video}
                titleKey={`videos.items.${video.contentKey}.title`}
                playLabelKey={`videos.items.${video.contentKey}.playLabel`}
                onPlay={setActiveVideo}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>

      <VideoModal
        video={activeVideo}
        titleKey={activeTitleKey}
        playLabelKey={activePlayLabelKey}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
}
