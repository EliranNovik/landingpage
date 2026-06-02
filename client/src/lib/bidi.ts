/** Left-to-right mark — keeps adjacent Latin text in correct order inside RTL. */
const LRM = "\u200E";

/** Wrap a Latin string for plain text / attributes in RTL context. */
export function isolateLtr(text: string): string {
  return `${LRM}${text}${LRM}`;
}
