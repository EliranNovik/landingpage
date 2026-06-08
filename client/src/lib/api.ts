/** API base URL. Empty in dev uses Vite proxy; production uses VITE_API_URL. */
export function apiUrl(path: string): string {
  const base = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
