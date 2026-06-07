export interface Review {
  id: string;
  author: string;
  initials: string;
  avatarClass: string;
  rating: number;
}

export const googleReviews: Review[] = [
  {
    id: "loenelywolf",
    author: "LoenelyWolf",
    initials: "LW",
    avatarClass: "bg-[#8f5e4a] text-white",
    rating: 5,
  },
  {
    id: "adi-katina",
    author: "Adi Katina",
    initials: "AK",
    avatarClass: "bg-[#5c524c] text-white",
    rating: 5,
  },
  {
    id: "shurouq-hajyassin",
    author: "Shurouq Hajyassin",
    initials: "SH",
    avatarClass: "bg-accent-muted text-white",
    rating: 5,
  },
];
