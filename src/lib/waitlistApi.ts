/**
 * URL for public `GET /waitlist` (counts) and `POST /waitlist` (signup).
 * Set `VITE_API_URL` to the API origin (no trailing slash), e.g. `http://localhost:3001`.
 */
export function getWaitlistUrl(): string {
  const raw = import.meta.env.VITE_API_URL?.trim();
  const base = raw?.replace(/\/+$/, "") ?? "";
  if (base) {
    return base.endsWith("/waitlist") ? base : `${base}/waitlist`;
  }
  if (import.meta.env.DEV) {
    return "http://localhost:3001/waitlist";
  }
  return "";
}
