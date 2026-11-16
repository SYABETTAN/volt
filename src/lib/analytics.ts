const EVENTS = new Set([
  "demo_viewed",
  "personalization_started",
  "personalization_completed",
  "commercial_offer_opened",
  "package_selected",
  "diagnostic_requested",
  "presentation_requested",
  "contact_submit_success",
  "contact_submit_error",
]);

export function sanitizeEventDetail(
  detail: Record<string, string>,
): Record<string, string> {
  const safe: Record<string, string> = {};
  for (const [key, value] of Object.entries(detail)) {
    if (!/^[a-z_]{1,40}$/.test(key)) continue;
    const clean = value.trim();
    if (!clean || clean.length > 48) continue;
    if (/[@<>]|https?:|\d{6,}/i.test(clean)) continue;
    safe[key] = clean;
  }
  return safe;
}

export function track(
  event: string,
  detail: Record<string, string> = {},
): void {
  if (!EVENTS.has(event) || typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("volt:commerce", {
      detail: { event, ...sanitizeEventDetail(detail) },
    }),
  );
}
