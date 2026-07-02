import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { siteLogo, siteLogoAlt } from "@/data/assets";
import { cn } from "@/lib/utils";

const navLinkKeys = [
  { href: "#services", key: "services" },
  { href: "#videos", key: "videos" },
  { href: "#reviews", key: "reviews" },
  { href: "#process", key: "process" },
  { href: "#contact-form", key: "contact" },
] as const;

interface HeaderProps {
  overlay?: boolean;
  showLogo?: boolean;
}

export function Header({ overlay = false, showLogo = true }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language.startsWith("he");

  return (
    <header
      className={cn(
        "z-50 w-full transition-colors",
        overlay
          ? "absolute inset-x-0 top-0 bg-black/15 backdrop-blur-xl"
          : "page-beige sticky top-0"
      )}
      style={overlay ? undefined : { backgroundColor: "#f7f0e6" }}
    >
      <div className="flex w-full items-center justify-between gap-3 px-4 py-3 sm:px-6 md:px-8 lg:px-10">
        <a
          href="#"
          aria-hidden={!showLogo}
          tabIndex={showLogo ? 0 : -1}
          className={cn(
            "flex shrink-0 items-center gap-3 no-underline md:gap-4",
            overlay ? "text-white" : "text-charcoal",
            !showLogo && "max-lg:pointer-events-auto lg:pointer-events-none"
          )}
        >
          <img
            src={siteLogo}
            alt={siteLogoAlt}
            className={cn(
              "h-12 w-auto max-w-[10.5rem] shrink-0 object-contain object-center sm:h-14 sm:max-w-[12.5rem] md:h-16 md:max-w-[14.5rem] lg:max-w-[16rem]",
              "max-lg:opacity-100",
              "transition-[opacity,max-width,height] duration-300 ease-out lg:transition-[opacity,max-width,height]",
              showLogo
                ? "lg:opacity-100"
                : "lg:h-0 lg:max-h-0 lg:max-w-0 lg:opacity-0"
            )}
            decoding="async"
          />
        </a>

        <div
          className={cn(
            "flex items-center gap-3 md:gap-5",
            !isHebrew && "md:ml-auto"
          )}
        >
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-8 md:flex lg:gap-10"
          >
            {navLinkKeys.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium no-underline transition-colors hover:no-underline",
                  overlay
                    ? "text-white/85 hover:text-white"
                    : "text-muted hover:text-accent"
                )}
              >
                {t(`header.nav.${link.key}`)}
              </a>
            ))}
          </nav>

          {!isHebrew && <LanguageSwitcher overlay={overlay} />}

          <a
            href="#contact-form"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white shadow-lg transition-colors hover:bg-accent-hover md:hidden"
          >
            <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            {t("header.contactMobile")}
          </a>
        </div>

        {isHebrew && <LanguageSwitcher overlay={overlay} />}
      </div>
    </header>
  );
}
