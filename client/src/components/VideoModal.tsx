import { useEffect } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BrandTrans } from "@/components/BrandTrans";
import type { YouTubeVideo } from "@/data/videos";
import { youtubeEmbedUrl } from "@/data/videos";

interface VideoModalProps {
  video: YouTubeVideo | null;
  titleKey: string;
  playLabelKey: string;
  onClose: () => void;
}

export function VideoModal({
  video,
  titleKey,
  playLabelKey,
  onClose,
}: VideoModalProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!video) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [video, onClose]);

  if (!video) return null;

  const playLabel = playLabelKey ? t(playLabelKey) : "";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={playLabel}
    >
      <button
        type="button"
        className="absolute inset-0 bg-charcoal/75 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close video"
      />
      <div className="relative z-10 w-full max-w-4xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-2 right-0 z-20 flex h-10 w-10 translate-y-[-100%] items-center justify-center rounded-full bg-white text-charcoal shadow-md transition-colors hover:bg-cream sm:-right-2 sm:top-0 sm:translate-y-0"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="overflow-hidden rounded-2xl border border-white/20 bg-charcoal shadow-2xl">
          <div className="aspect-video w-full">
            <iframe
              key={video.id}
              src={youtubeEmbedUrl(video.id)}
              title={playLabel}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
        {titleKey ? (
          <p className="mt-3 text-center text-sm text-white/90">
            <BrandTrans i18nKey={titleKey} />
          </p>
        ) : null}
      </div>
    </div>
  );
}
