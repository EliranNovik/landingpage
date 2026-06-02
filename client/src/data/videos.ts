export const youtubeChannelUrl =
  "https://www.youtube.com/@DeckerPexLawoffice";

export type VideoContentKey = "video1" | "video2" | "video3";

export interface YouTubeVideo {
  id: string;
  contentKey: VideoContentKey;
  watchUrl: string;
}

export const youtubeVideos: YouTubeVideo[] = [
  {
    id: "HHxwlNIOx9E",
    contentKey: "video1",
    watchUrl: "https://youtu.be/HHxwlNIOx9E",
  },
  {
    id: "aCBU_vZ3AK8",
    contentKey: "video2",
    watchUrl: "https://youtu.be/aCBU_vZ3AK8",
  },
  {
    id: "AX4X6CHkzPE",
    contentKey: "video3",
    watchUrl: "https://youtu.be/AX4X6CHkzPE",
  },
];

export function youtubeThumbnailUrl(
  videoId: string,
  quality: "maxresdefault" | "hqdefault" = "hqdefault"
) {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

export function youtubeEmbedUrl(videoId: string) {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
}
