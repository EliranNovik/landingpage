/** Google Ads / UTM attribution captured from the landing URL, sent as CRM `utm_params`. */

const STORAGE_KEY = "dp_tracking_params";

/** Google click IDs stop being usable for conversion import after 90 days. */
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;

/** Keeps a long value (notably `lpurl`) from bloating the CRM's JSONB column. */
const MAX_VALUE_LENGTH = 512;

/**
 * CRM `utm_params` key → URL query params to read for it, first match wins.
 * Aliases exist because Google auto-tagging, ValueTrack templates and manual
 * tagging spell the same value differently.
 */
const TRACKING_PARAMS: Record<string, readonly string[]> = {
  gclid: ["gclid"],
  gbraid: ["gbraid"],
  wbraid: ["wbraid"],
  campaignid: ["campaignid", "gad_campaignid", "campaign_id"],
  adgroupid: ["adgroupid", "adgroup_id"],
  keyword: ["keyword", "utm_term"],
  matchtype: ["matchtype"],
  device: ["device"],
  network: ["network"],
  creative: ["creative"],
  placement: ["placement"],
  lpurl: ["lpurl"],
  utm_source: ["utm_source"],
  utm_medium: ["utm_medium"],
  utm_campaign: ["utm_campaign"],
  utm_content: ["utm_content"],
};

export type TrackingParams = Record<string, string>;

interface StoredTracking {
  params: TrackingParams;
  capturedAt: number;
}

function readStored(): StoredTracking | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<StoredTracking> | null;
    if (typeof parsed?.capturedAt !== "number") return null;
    if (!parsed.params || typeof parsed.params !== "object") return null;

    const params: TrackingParams = {};
    for (const [key, value] of Object.entries(parsed.params)) {
      if (typeof value === "string" && value) params[key] = value;
    }

    if (Object.keys(params).length === 0) return null;

    return { params, capturedAt: parsed.capturedAt };
  } catch {
    // Ignore storage/parse errors (private mode, quota, corrupt value, etc.)
    return null;
  }
}

function writeStored(params: TrackingParams): void {
  try {
    const stored: StoredTracking = { params, capturedAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Ignore storage errors (private mode, quota, etc.)
  }
}

function clearStored(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors (private mode, quota, etc.)
  }
}

function readFromSearchParams(searchParams: URLSearchParams): TrackingParams {
  const params: TrackingParams = {};

  for (const [key, aliases] of Object.entries(TRACKING_PARAMS)) {
    for (const alias of aliases) {
      const value = searchParams.get(alias)?.trim();
      if (value) {
        params[key] = value.slice(0, MAX_VALUE_LENGTH);
        break;
      }
    }
  }

  return params;
}

/** Cached attribution, or empty when absent or older than {@link MAX_AGE_MS}. */
export function getCachedTracking(): TrackingParams {
  const stored = readStored();
  if (!stored) return {};

  if (Date.now() - stored.capturedAt > MAX_AGE_MS) {
    clearStored();
    return {};
  }

  return stored.params;
}

/**
 * Reads attribution params from the current URL and caches them when present.
 *
 * A URL carrying any tracking param counts as a new ad click and replaces the
 * previous snapshot wholesale, so values from two separate clicks never mix.
 */
export function captureTrackingFromUrl(
  url: string = window.location.href
): TrackingParams {
  let searchParams: URLSearchParams;

  try {
    searchParams = new URL(url).searchParams;
  } catch {
    return getCachedTracking();
  }

  const fromUrl = readFromSearchParams(searchParams);
  if (Object.keys(fromUrl).length === 0) return getCachedTracking();

  const params: TrackingParams = {
    ...fromUrl,
    // `lpurl` is the ad's landing page; default it to where the click landed.
    lpurl: fromUrl.lpurl ?? url.slice(0, MAX_VALUE_LENGTH),
  };

  writeStored(params);
  return params;
}

/** Attribution to send with contact form submissions. */
export function getTrackingParamsForSubmit(): TrackingParams {
  return captureTrackingFromUrl();
}
