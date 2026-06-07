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

export const youtubeVideosHe: YouTubeVideo[] = [
  {
    id: "N9-7AJl6s-E",
    contentKey: "video1",
    watchUrl: "https://www.youtube.com/watch?v=N9-7AJl6s-E",
  },
  {
    id: "eO1M81LKMYE",
    contentKey: "video2",
    watchUrl: "https://www.youtube.com/watch?v=eO1M81LKMYE",
  },
  {
    id: "pByAC9ndY9I",
    contentKey: "video3",
    watchUrl: "https://www.youtube.com/watch?v=pByAC9ndY9I",
  },
];

export function getYouTubeVideos(language: string): YouTubeVideo[] {
  return language.startsWith("he") ? youtubeVideosHe : youtubeVideos;
}

export function youtubeThumbnailUrl(
  videoId: string,
  quality: "maxresdefault" | "hqdefault" = "hqdefault"
) {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

export function youtubeEmbedUrl(videoId: string) {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
}
