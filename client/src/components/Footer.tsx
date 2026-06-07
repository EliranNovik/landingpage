import { Facebook, Linkedin, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BrandTrans } from "@/components/BrandTrans";
import { ScrollReveal } from "@/components/ScrollReveal";
import { footerLogo } from "@/data/assets";
import { SOCIAL_LINKS } from "@/data/contact";
import { cn } from "@/lib/utils";

const socialIcons = {
  youtube: Youtube,
  facebook: Facebook,
  linkedin: Linkedin,
} as const;

export function Footer() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language.startsWith("he");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream-dark/80 bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-in">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
            <div className="w-full shrink-0 md:w-auto md:max-w-[50%]">
              <img
                src={footerLogo}
                alt={t("assets.logoAlt")}
                className="h-[4.5rem] w-auto max-w-[20rem] object-contain object-start sm:h-20 sm:max-w-[24rem] md:h-24 md:max-w-[28rem] lg:h-28 lg:max-w-[32rem]"
                decoding="async"
              />
            </div>

            <p
              className={cn(
                "max-w-md text-sm leading-relaxed text-muted md:max-w-[45%]",
                isRtl ? "text-center md:text-start" : "text-center md:text-end"
              )}
            >
              {t("footer.tagline")}
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
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
                      "flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-accent-hover"
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </a>
                );
              })}
            </nav>

            <p className="text-center text-xs text-muted/80">
              &copy; {year}{" "}
              <BrandTrans i18nKey="footer.copyrightLine" />. {t("footer.copyright")}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
