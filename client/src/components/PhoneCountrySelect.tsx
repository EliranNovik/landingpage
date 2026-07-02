import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { CountryCode } from "libphonenumber-js/min";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  formatCountryOptionLabel,
  getCountryCallingCodeOptions,
  type CountryCallingCodeOption,
} from "@/data/countryCallingCodes";
import { cn } from "@/lib/utils";

function usePrefersNativeSelect(): boolean {
  const [prefersNative, setPrefersNative] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(max-width: 768px), (hover: none) and (pointer: coarse)"
    );
    const update = () => setPrefersNative(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return prefersNative;
}

interface PhoneCountrySelectProps {
  value: CountryCode;
  onChange: (iso: CountryCode) => void;
  disabled?: boolean;
  isRtl?: boolean;
  isMinimal?: boolean;
  triggerClassName?: string;
}

export function PhoneCountrySelect({
  value,
  onChange,
  disabled,
  isRtl,
  isMinimal,
  triggerClassName,
}: PhoneCountrySelectProps) {
  const { t, i18n } = useTranslation();
  const prefersNative = usePrefersNativeSelect();
  const options = useMemo(
    () => getCountryCallingCodeOptions(i18n.language),
    [i18n.language]
  );

  const selected = options.find((o) => o.iso === value) ?? options[0];

  const nativeSelectClass = cn(
    "h-11 shrink-0 appearance-none rounded-xl border border-cream-dark/80 bg-white px-3 pe-8 text-base text-charcoal shadow-sm sm:text-sm",
    "bg-[length:1rem] bg-[position:right_0.5rem_center] bg-no-repeat",
    "bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%237a4434%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E')]",
    isRtl &&
      "bg-[position:left_0.5rem_center] pe-3 ps-8 text-right [direction:rtl]",
    triggerClassName,
    isMinimal ? "w-[5.25rem]" : "w-[5.5rem]"
  );

  if (prefersNative) {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as CountryCode)}
        disabled={disabled}
        aria-label={t("contact.countryCode")}
        className={nativeSelectClass}
        dir={isRtl ? "rtl" : "ltr"}
      >
        {options.map((option) => (
          <NativeOption
            key={option.iso}
            option={option}
            isRtl={!!isRtl}
            codeOnly={option.iso === value}
          />
        ))}
      </select>
    );
  }

  return (
    <Select
      value={value}
      onValueChange={(next) => onChange(next as CountryCode)}
      disabled={disabled}
    >
      <SelectTrigger
        className={cn(
          isMinimal ? "h-11 w-[7.5rem] shrink-0 rounded-xl" : "w-[10.5rem] shrink-0",
          isRtl && "flex-row-reverse text-right [&>span]:text-right",
          triggerClassName
        )}
        aria-label={t("contact.countryCode")}
      >
        <SelectValue>
          {selected
            ? formatCountryOptionLabel(selected, !!isRtl)
            : undefined}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-[min(18rem,70vh)]">
        {options.map((option) => (
          <SelectItem key={option.iso} value={option.iso}>
            {formatCountryOptionLabel(option, !!isRtl)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function NativeOption({
  option,
  isRtl,
  codeOnly,
}: {
  option: CountryCallingCodeOption;
  isRtl: boolean;
  codeOnly: boolean;
}) {
  return (
    <option value={option.iso}>
      {formatCountryOptionLabel(option, isRtl, codeOnly)}
    </option>
  );
}
