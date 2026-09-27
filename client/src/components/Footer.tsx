import { Facebook, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BrandTrans } from "@/components/BrandTrans";
import { Ltr } from "@/components/Ltr";
import { ScrollReveal } from "@/components/ScrollReveal";
import { footerLogo } from "@/data/assets";
import { OFFICE_CONTACT, SOCIAL_LINKS } from "@/data/contact";
import { cn } from "@/lib/utils";

const socialIcons = {
  youtube: Youtube,
  facebook: Facebook,
  linkedin: Linkedin,
} as const;

interface FooterProps {
  variant?: "default" | "german";
}

export function Footer({ variant = "default" }: FooterProps) {
  const { t, i18n } = useTranslation();
  const isGerman = variant === "german";
  const isEnglish = !i18n.language.startsWith("he");
  const year = new Date().getFullYear();
  const { address, email, mapsUrl, phone, phoneDisplay } = OFFICE_CONTACT;

  return (
    <footer
      className={cn(
        "border-t py-8 sm:py-10",
        isGerman
          ? "border-white/10 bg-[#0d2238] text-white"
          : "border-cream-dark/80 bg-white"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-in">
          <div className="flex flex-col items-center gap-6 text-center">
            <img
              src={footerLogo}
              alt={t("assets.logoAlt")}
              className={cn(
                "h-[4.5rem] w-auto max-w-[20rem] object-contain object-center sm:h-20 sm:max-w-[24rem] lg:h-28 lg:max-w-[32rem]",
                isGerman &&
                  "box-content rounded-2xl bg-white px-5 py-2 shadow-lg shadow-black/15"
              )}
              decoding="async"
            />

            <p
              className={cn(
                "max-w-md text-sm leading-relaxed",
                isGerman ? "text-white/70" : "text-muted"
              )}
            >
              {isGerman
                ? isEnglish
                  ? "Professional legal guidance for German citizenship and passports — from eligibility review through receipt of the passport."
                  : "ליווי משפטי מקצועי לקבלת אזרחות ודרכון גרמני — מבדיקת הזכאות ועד לקבלת הדרכון."
                : t("footer.tagline")}
            </p>

            <div
              className={cn(
                "flex flex-col items-center gap-3 text-sm lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-x-3 lg:gap-y-2",
                isGerman ? "text-white/65" : "text-muted"
              )}
            >
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.openMaps")}
                className={cn(
                  "inline-flex items-center justify-center gap-2.5 transition-colors lg:gap-0",
                  isGerman
                    ? "text-white/65 hover:text-[#d8bd83]"
                    : "text-muted hover:text-accent"
                )}
              >
                <MapPin
                  className={cn(
                    "h-4 w-4 shrink-0 lg:hidden",
                    isGerman ? "text-[#d8bd83]" : "text-accent"
                  )}
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span className="leading-relaxed">{address}</span>
              </a>
              <span className={cn("hidden text-base lg:inline", isGerman ? "text-white/25" : "text-muted/50")} aria-hidden>
                ·
              </span>
              <a
                href={`tel:${phone}`}
                className={cn(
                  "inline-flex items-center justify-center gap-2.5 transition-colors lg:gap-0",
                  isGerman
                    ? "text-white/65 hover:text-[#d8bd83]"
                    : "text-muted hover:text-accent"
                )}
              >
                <Phone
                  className={cn(
                    "h-4 w-4 shrink-0 lg:hidden",
                    isGerman ? "text-[#d8bd83]" : "text-accent"
                  )}
                  strokeWidth={1.75}
                  aria-hidden
                />
                <Ltr>{phoneDisplay}</Ltr>
              </a>
              <span className={cn("hidden text-base lg:inline", isGerman ? "text-white/25" : "text-muted/50")} aria-hidden>
                ·
              </span>
              <a
                href={`mailto:${email}`}
                className={cn(
                  "inline-flex items-center justify-center gap-2.5 transition-colors lg:gap-0",
                  isGerman
                    ? "text-white/65 hover:text-[#d8bd83]"
                    : "text-muted hover:text-accent"
                )}
              >
                <Mail
                  className={cn(
                    "h-4 w-4 shrink-0 lg:hidden",
                    isGerman ? "text-[#d8bd83]" : "text-accent"
                  )}
                  strokeWidth={1.75}
                  aria-hidden
                />
                <Ltr>{email}</Ltr>
              </a>
            </div>

            <nav
              aria-label="Social media"
              className="flex items-center justify-center gap-2.5"
            >
              {SOCIAL_LINKS.map((link) => {
                const Icon = socialIcons[link.id];
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t(`footer.socialAria.${link.id}`)}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors",
                      isGerman
                        ? "bg-[#2d6f95] hover:bg-[#245a79]"
                        : "bg-accent hover:bg-accent-hover"
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </a>
                );
              })}
            </nav>

            <p className={cn("text-xs", isGerman ? "text-white/45" : "text-muted/80")}>
              &copy; {year}{" "}
              <BrandTrans i18nKey="footer.copyrightLine" />. {t("footer.copyright")}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
