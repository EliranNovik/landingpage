import {
  getCountries,
  getCountryCallingCode,
  type CountryCode,
} from "libphonenumber-js/min";

export type CountryCallingCodeOption = {
  iso: CountryCode;
  dialCode: string;
  name: string;
};

const PRIORITY_ISOS: CountryCode[] = ["IL", "US", "GB", "DE", "AT", "FR", "CA"];

const cache = new Map<string, CountryCallingCodeOption[]>();

function localeTag(language: string): string {
  return language.startsWith("he") ? "he" : "en";
}

function buildOptions(locale: string): CountryCallingCodeOption[] {
  const displayNames = new Intl.DisplayNames([locale], { type: "region" });

  const options = getCountries().map((iso) => ({
    iso,
    dialCode: `+${getCountryCallingCode(iso)}`,
    name: displayNames.of(iso) ?? iso,
  }));

  const prioritySet = new Set(PRIORITY_ISOS);
  const priority = PRIORITY_ISOS.flatMap((iso) => {
    const match = options.find((o) => o.iso === iso);
    return match ? [match] : [];
  });

  const rest = options
    .filter((o) => !prioritySet.has(o.iso))
    .sort((a, b) => a.name.localeCompare(b.name, locale));

  return [...priority, ...rest];
}

export function getCountryCallingCodeOptions(
  language: string
): CountryCallingCodeOption[] {
  const locale = localeTag(language);
  const cached = cache.get(locale);
  if (cached) return cached;

  const built = buildOptions(locale);
  cache.set(locale, built);
  return built;
}

export function dialCodeForCountry(iso: CountryCode): string {
  return `+${getCountryCallingCode(iso)}`;
}

export function formatCountryOptionLabel(
  option: CountryCallingCodeOption,
  rtl: boolean
): string {
  const code = rtl ? `\u200e${option.dialCode}\u200e` : option.dialCode;
  return `${code} ${option.name}`;
}
