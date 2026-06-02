/** Combine dial code and local number into one international phone string. */
export function combinePhoneNumber(countryCode: string, phone: string): string {
  const local = phone.trim().replace(/[\s\-()]/g, "");
  if (!local) return "";

  if (local.startsWith("+")) return local;

  const code = countryCode.trim();
  const digits = local.startsWith("0") ? local.slice(1) : local;
  return `${code}${digits}`;
}
