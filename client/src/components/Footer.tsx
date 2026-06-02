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
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer
      className="page-beige border-t border-cream-dark py-10"
      style={{ backgroundColor: "#f7f0e6" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-in">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex flex-col items-center gap-3 sm:items-start">
              <img
                src={footerLogo}
                alt={t("assets.logoAlt")}
                className="h-14 w-auto max-w-[14rem] object-contain object-center sm:h-16 sm:max-w-[16rem]"
                decoding="async"
              />
              <p className="font-serif text-lg font-semibold text-charcoal">
                <BrandTrans i18nKey="footer.firmName" />
              </p>
              <nav
                aria-label="Social media"
                className="flex items-center gap-2.5"
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
            </div>
            <p className="max-w-md text-center text-sm leading-relaxed text-muted sm:text-end">
              {t("footer.tagline")}
            </p>
          </div>
          <p className="mt-6 text-center text-xs text-muted/80">
            &copy; {year}{" "}
            <BrandTrans i18nKey="footer.copyrightLine" />. {t("footer.copyright")}
          </p>
        </ScrollReveal>
      </div>
    </footer>
  );
}
