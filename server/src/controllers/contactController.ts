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
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const lead = { name, email, phone, facts };

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
