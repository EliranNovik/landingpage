export interface LeadWebhookPayload {
  name: string;
  email: string;
  phone: string;
  facts: string;
  source_code?: string;
}

const DEFAULT_WEBHOOK_URL =
  "https://leadify-crm-backend.onrender.com/api/hook/catch";

const DEFAULT_SOURCE_CODE = "43225";

const WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL ?? DEFAULT_WEBHOOK_URL;

const WEBHOOK_TIMEOUT_MS = 20_000;

function buildWebhookBody(lead: LeadWebhookPayload): Record<string, unknown> {
  const { source_code: clientSourceCode, ...leadFields } = lead;
  const sourceCode =
    clientSourceCode?.trim() ||
    process.env.LEAD_SOURCE_CODE?.trim() ||
    DEFAULT_SOURCE_CODE;

  return {
    ...leadFields,
    source_code: sourceCode,
  };
}

export async function sendLeadToWebhook(
  payload: LeadWebhookPayload
): Promise<void> {
  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildWebhookBody(payload)),
    signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Lead webhook failed (${response.status})${detail ? `: ${detail}` : ""}`
    );
  }
}
