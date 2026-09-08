import type { Request, Response } from "express";
import { combinePhoneNumber } from "../lib/phone.js";
import { sendLeadToWebhook } from "../services/leadWebhook.js";

interface ContactBody {
  name?: string;
  email?: string;
  countryCode?: string;
  phone?: string;
  /** @deprecated Use `phone` */
  mobile?: string;
  facts?: string;
  /** @deprecated Use `facts` */
  message?: string;
  source_code?: string;
  /** @deprecated Send inside `utm_params` */
  gclid?: string;
  utm_params?: unknown;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Attribution keys the CRM understands; anything else is dropped. */
const ALLOWED_UTM_KEYS = new Set([
  "gclid",
  "gbraid",
  "wbraid",
  "campaignid",
  "adgroupid",
  "keyword",
  "matchtype",
  "device",
  "network",
  "creative",
  "placement",
  "lpurl",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
]);

const MAX_UTM_VALUE_LENGTH = 512;

/**
 * Builds the CRM's `utm_params` object from untrusted request input.
 *
 * The CRM stores this straight into a JSONB column, so keys are whitelisted and
 * values capped rather than passed through as-is.
 */
function resolveUtmParams(body: ContactBody): Record<string, string> {
  const params: Record<string, string> = {};
  const raw = body.utm_params;

  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    for (const [key, value] of Object.entries(raw)) {
      if (!ALLOWED_UTM_KEYS.has(key)) continue;
      if (typeof value !== "string") continue;

      const trimmed = value.trim();
      if (trimmed) params[key] = trimmed.slice(0, MAX_UTM_VALUE_LENGTH);
    }
  }

  const topLevelGclid = body.gclid?.trim();
  if (!params.gclid && topLevelGclid) {
    params.gclid = topLevelGclid.slice(0, MAX_UTM_VALUE_LENGTH);
  }

  return params;
}

function resolvePhone(body: ContactBody): string {
  const raw = body.phone?.trim() || body.mobile?.trim() || "";
  const countryCode = body.countryCode?.trim() || "";

  if (raw.startsWith("+")) return raw;

  if (countryCode && raw) {
    return combinePhoneNumber(countryCode, raw);
  }

  return raw;
}

export async function submitContact(
  req: Request,
  res: Response
): Promise<void> {
  const body = req.body as ContactBody;

  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = resolvePhone(body);
  const facts = body.facts?.trim() ?? body.message?.trim() ?? "";

  if (!name) {
    res.status(400).json({
      success: false,
      message: "Name is required.",
    });
    return;
  }

  if (!email) {
    res.status(400).json({
      success: false,
      message: "Email is required.",
    });
    return;
  }

  if (!emailPattern.test(email)) {
    res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
    return;
  }

  if (!phone) {
    res.status(400).json({
      success: false,
      message: "Phone number is required.",
    });
    return;
  }

  const sourceCode = body.source_code?.trim();
  const utmParams = resolveUtmParams(body);
  const lead = {
    name,
    email,
    phone,
    facts,
    ...(sourceCode ? { source_code: sourceCode } : {}),
    ...(Object.keys(utmParams).length > 0 ? { utm_params: utmParams } : {}),
  };

  try {
    await sendLeadToWebhook(lead);
  } catch (error) {
    console.error("Lead webhook error:", error);
    res.status(502).json({
      success: false,
      message:
        "Unable to submit your inquiry right now. Please try again shortly.",
    });
    return;
  }

  console.log("--- New contact inquiry (webhook ok) ---");
  console.log(JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }, null, 2));
  console.log("----------------------------------------");

  res.status(200).json({
    success: true,
    message: "Inquiry received successfully",
  });
}
