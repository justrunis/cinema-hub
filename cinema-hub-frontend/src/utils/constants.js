export const API_URL = "https://api.themoviedb.org/3";
export const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
export const STALE_TIME = 1000 * 60 * 5; // 5 minutes
export const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/500x700.png?text=No+Image";
export const PLACEHOLDER_PROFILE_IMAGE =
  "https://via.placeholder.com/500x750.png?text=No+Image";

export const ALL_ROLES = [
  {
    id: 1,
    name: "user",
  },
  {
    id: 2,
    name: "admin",
  },
];

export const ALL_CATEGORIES = [
  { value: 11, label: "Movies" },
  { value: 14, label: "Television" },
  { value: 31, label: "Anime/Manga" },
  {
    value: 32,
    label: "Cartoon/Animations",
  },
];

export const ALL_DIFFICULTIES = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];
