import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import type { CountryCode } from "libphonenumber-js/min";
import { ChevronDown, Search } from "lucide-react";
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
  stablePicker?: boolean;
}

export function PhoneCountrySelect({
  value,
  onChange,
  disabled,
  isRtl,
  isMinimal,
  triggerClassName,
  stablePicker = false,
}: PhoneCountrySelectProps) {
  const { t, i18n } = useTranslation();
  const prefersNative = usePrefersNativeSelect();
  const options = useMemo(
    () => getCountryCallingCodeOptions(i18n.language),
    [i18n.language]
  );

  const selected = options.find((o) => o.iso === value) ?? options[0];
  const numericSearch = useRef("");
  const numericSearchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerSearch, setPickerSearch] = useState("");

  const filteredOptions = useMemo(() => {
    const digits = pickerSearch.replace(/\D/g, "");
    if (!digits) return options;
    return options.filter((option) =>
      option.dialCode.slice(1).startsWith(digits)
    );
  }, [options, pickerSearch]);

  useEffect(
    () => () => {
      if (numericSearchTimer.current) clearTimeout(numericSearchTimer.current);
    },
    []
  );

  useEffect(() => {
    if (!pickerOpen) return;

    searchInputRef.current?.focus();
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!pickerRef.current?.contains(event.target as Node)) {
        setPickerOpen(false);
        setPickerSearch("");
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [pickerOpen]);

  const handleNumericSearch = (event: KeyboardEvent<HTMLSelectElement>) => {
    if (!/^\d$/.test(event.key)) return;

    event.preventDefault();
    event.stopPropagation();

    numericSearch.current += event.key;
    const hasPrefix = options.some((option) =>
      option.dialCode.slice(1).startsWith(numericSearch.current)
    );
    if (!hasPrefix) numericSearch.current = event.key;

    if (numericSearchTimer.current) clearTimeout(numericSearchTimer.current);
    numericSearchTimer.current = setTimeout(() => {
      numericSearch.current = "";
    }, 800);

    const exactMatch = options.find(
      (option) => option.dialCode.slice(1) === numericSearch.current
    );
    const match =
      exactMatch ??
      options.find((option) =>
        option.dialCode.slice(1).startsWith(numericSearch.current)
      );
    if (match) onChange(match.iso);
  };

  const nativeSelectClass = cn(
    "h-11 shrink-0 appearance-none rounded-xl border border-cream-dark/80 bg-white px-3 pe-8 text-base text-charcoal shadow-sm sm:text-sm",
    "bg-[length:1rem] bg-[position:right_0.5rem_center] bg-no-repeat",
    "bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%237a4434%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E')]",
    isRtl &&
      "bg-[position:left_0.5rem_center] pe-3 ps-8 text-right [direction:rtl]",
    triggerClassName,
    isMinimal ? "w-[5.25rem]" : "w-[5.5rem]"
  );

  if (stablePicker && !prefersNative) {
    return (
      <div ref={pickerRef} className="relative shrink-0">
        <button
          type="button"
          disabled={disabled}
          aria-label={t("contact.countryCode")}
          aria-haspopup="listbox"
          aria-expanded={pickerOpen}
          onClick={() => setPickerOpen((open) => !open)}
          className={cn(
            "flex h-11 items-center justify-between gap-2 rounded-xl border border-cream-dark/80 bg-white px-3 text-charcoal shadow-sm disabled:cursor-not-allowed disabled:opacity-50",
            triggerClassName,
            isMinimal ? "w-[5.25rem]" : "w-[5.5rem]"
          )}
        >
          <span dir="ltr">{selected?.dialCode}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-muted transition-transform",
              pickerOpen && "rotate-180"
            )}
            aria-hidden
          />
        </button>

        {pickerOpen && (
          <div
            className="absolute left-0 top-full z-[70] mt-2 w-64 overflow-hidden rounded-xl border border-[#d9e0e6] bg-white text-charcoal shadow-2xl"
            role="listbox"
          >
            <div className="border-b border-[#e6eaf0] p-2">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                  aria-hidden
                />
                <input
                  ref={searchInputRef}
                  value={pickerSearch}
                  onChange={(event) =>
                    setPickerSearch(event.target.value.replace(/\D/g, ""))
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setPickerOpen(false);
                      setPickerSearch("");
                    }
                  }}
                  inputMode="numeric"
                  placeholder="הקלידו קידומת"
                  aria-label="חיפוש לפי קידומת"
                  className="h-10 w-full rounded-lg border border-[#d9e0e6] bg-[#f8fafc] pe-9 ps-3 text-right text-sm outline-none focus:border-[#2d6f95] focus:ring-2 focus:ring-[#2d6f95]/15"
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto p-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.iso}
                    type="button"
                    role="option"
                    aria-selected={option.iso === value}
                    onClick={() => {
                      onChange(option.iso);
                      setPickerOpen(false);
                      setPickerSearch("");
                    }}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-[#e8f1f6]",
                      option.iso === value && "bg-[#e8f1f6] font-semibold"
                    )}
                  >
                    <span>{option.name}</span>
                    <span dir="ltr" className="font-medium text-[#245a79]">
                      {option.dialCode}
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-3 py-5 text-center text-sm text-muted">
                  לא נמצאה קידומת מתאימה
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (prefersNative) {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as CountryCode)}
        onKeyDown={handleNumericSearch}
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
          isMinimal ? "h-11 shrink-0 rounded-xl" : "shrink-0",
          isRtl && "flex-row-reverse text-right [&>span]:text-right",
          triggerClassName,
          isMinimal ? "w-[5.25rem]" : "w-[5.5rem]"
        )}
        aria-label={t("contact.countryCode")}
      >
        <SelectValue>
          {selected
            ? formatCountryOptionLabel(selected, !!isRtl, true)
            : undefined}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-[min(18rem,70vh)]">
        {options.map((option) => (
          <SelectItem
            key={option.iso}
            value={option.iso}
            textValue={`${option.dialCode.slice(1)} ${option.name}`}
          >
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
