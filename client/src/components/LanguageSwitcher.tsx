import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { AppLanguage } from "@/i18n";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  overlay?: boolean;
}

const options: { id: AppLanguage; short: string; label: string }[] = [
  { id: "en", short: "EN", label: "English" },
  { id: "he", short: "עב", label: "עברית" },
];

export function LanguageSwitcher({ overlay = false }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation();
  const current = i18n.language.startsWith("he") ? "he" : "en";

  const setLanguage = (lng: AppLanguage) => {
    if (lng !== current) void i18n.changeLanguage(lng);
  };

  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-2",
        overlay ? "text-white" : "text-charcoal"
      )}
    >
      <Globe
        className={cn(
          "hidden h-4 w-4 sm:block",
          overlay ? "text-white/50" : "text-muted/70"
        )}
        strokeWidth={1.5}
        aria-hidden
      />
      <div
        role="group"
        aria-label={t("languageSwitcher.label")}
        dir="ltr"
        className={cn(
          "relative inline-grid grid-cols-2 rounded-full p-1",
          overlay
            ? "border border-white/20 bg-black/20 shadow-lg shadow-black/15 backdrop-blur-md"
            : "border border-cream-dark/50 bg-white/80 shadow-sm backdrop-blur-sm"
        )}
      >
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full transition-[left,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            current === "en" ? "left-1" : "left-[calc(50%+0.125rem)]",
            overlay
              ? "bg-white/95 shadow-md shadow-black/20"
              : "bg-accent shadow-md shadow-accent/25"
          )}
        />

        {options.map((option) => {
          const isActive = current === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setLanguage(option.id)}
              aria-pressed={isActive}
              aria-label={option.label}
              className={cn(
                "relative z-10 min-w-[2.6rem] rounded-full px-2.5 py-1.5 text-[11px] font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 sm:min-w-[4.75rem] sm:px-3 sm:py-1.5 sm:text-xs",
                overlay
                  ? isActive
                    ? "text-charcoal"
                    : "text-white/75 hover:text-white"
                  : isActive
                    ? "text-white"
                    : "text-muted hover:text-charcoal",
                overlay
                  ? "focus-visible:ring-white/60 focus-visible:ring-offset-black/20"
                  : "focus-visible:ring-accent/40 focus-visible:ring-offset-[#f7f0e6]"
              )}
            >
              <span className="sm:hidden">{option.short}</span>
              <span className="hidden sm:inline">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
