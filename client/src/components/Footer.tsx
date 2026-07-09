import { Facebook, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BrandTrans } from "@/components/BrandTrans";
import { Ltr } from "@/components/Ltr";
import { ScrollReveal } from "@/components/ScrollReveal";
import { footerLogo } from "@/data/assets";
import { OFFICE_CONTACT, SOCIAL_LINKS } from "@/data/contact";

const socialIcons = {
  youtube: Youtube,
  facebook: Facebook,
  linkedin: Linkedin,
} as const;

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const { address, email, mapsUrl, phone, phoneDisplay } = OFFICE_CONTACT;

  return (
    <footer className="border-t border-cream-dark/80 bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-in">
          <div className="flex flex-col items-center gap-6 text-center">
            <img
              src={footerLogo}
              alt={t("assets.logoAlt")}
              className="h-[4.5rem] w-auto max-w-[20rem] object-contain object-center sm:h-20 sm:max-w-[24rem] lg:h-28 lg:max-w-[32rem]"
              decoding="async"
            />

            <p className="max-w-md text-sm leading-relaxed text-muted">
              {t("footer.tagline")}
            </p>

            <div className="flex flex-col items-center gap-3 text-sm text-muted lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-x-3 lg:gap-y-2">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.openMaps")}
                className="inline-flex items-center justify-center gap-2.5 text-muted transition-colors hover:text-accent lg:gap-0"
              >
                <MapPin
                  className="h-4 w-4 shrink-0 text-accent lg:hidden"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span className="leading-relaxed">{address}</span>
              </a>
              <span className="hidden text-base text-muted/50 lg:inline" aria-hidden>
                ·
              </span>
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center justify-center gap-2.5 text-muted transition-colors hover:text-accent lg:gap-0"
              >
                <Phone
                  className="h-4 w-4 shrink-0 text-accent lg:hidden"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <Ltr>{phoneDisplay}</Ltr>
              </a>
              <span className="hidden text-base text-muted/50 lg:inline" aria-hidden>
                ·
              </span>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center gap-2.5 text-muted transition-colors hover:text-accent lg:gap-0"
              >
                <Mail
                  className="h-4 w-4 shrink-0 text-accent lg:hidden"
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
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-accent-hover"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </a>
                );
              })}
            </nav>

            <p className="text-xs text-muted/80">
              &copy; {year}{" "}
              <BrandTrans i18nKey="footer.copyrightLine" />. {t("footer.copyright")}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
