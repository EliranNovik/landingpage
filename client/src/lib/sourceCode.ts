/** Default CRM source when no campaign mapping applies. */
export const DEFAULT_SOURCE_CODE = "43225";

const STORAGE_KEY = "dp_google_campaign_id";

/**
 * Maps Google Ads campaign IDs to Leadify `source_code` values.
 * Add entries here when campaign → source connections are defined.
 *
 * @example
 * "12345678901": "2",
 */
export const CAMPAIGN_TO_SOURCE_CODE: Record<string, string> = {
  // campaignId: sourceCode
};

/** URL query params checked for a Google campaign identifier (first match wins). */
const CAMPAIGN_URL_PARAMS = [
  "gad_campaignid",
  "campaignid",
  "campaign_id",
  "utm_campaign",
  "gclid",
] as const;

function readCampaignIdFromSearchParams(
  searchParams: URLSearchParams
): string | null {
  for (const param of CAMPAIGN_URL_PARAMS) {
    const value = searchParams.get(param)?.trim();
    if (value) return value;
  }
  return null;
}

export function cacheCampaignId(campaignId: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, campaignId);
  } catch {
    // Ignore storage errors (private mode, quota, etc.)
  }
}

export function getCachedCampaignId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/** Reads campaign id from the current URL and caches it when present. */
export function captureCampaignFromUrl(
  url: string = window.location.href
): string | null {
  let searchParams: URLSearchParams;

  try {
    searchParams = new URL(url).searchParams;
  } catch {
    return getCachedCampaignId();
  }

  const fromUrl = readCampaignIdFromSearchParams(searchParams);
  if (fromUrl) {
    cacheCampaignId(fromUrl);
    return fromUrl;
  }

  return getCachedCampaignId();
}

export function resolveSourceCode(campaignId: string | null): string {
  if (!campaignId) return DEFAULT_SOURCE_CODE;
  return CAMPAIGN_TO_SOURCE_CODE[campaignId] ?? DEFAULT_SOURCE_CODE;
}

/** Source code to send with contact form submissions. */
export function getSourceCodeForSubmit(): string {
  const campaignId = captureCampaignFromUrl();
  return resolveSourceCode(campaignId);
}
