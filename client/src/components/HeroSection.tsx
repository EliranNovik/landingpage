import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ContactForm } from "@/components/ContactForm";
import { Ltr } from "@/components/Ltr";
import { BRAND_SHORT } from "@/data/brand";
import { ScrollReveal } from "@/components/ScrollReveal";
import { bdiLogo, dunsLogo, heroOfficeImage, siteLogo, siteLogoAlt } from "@/data/assets";
import { useHeroLogoInView } from "@/hooks/useHeroLogoInView";
import { cn } from "@/lib/utils";

const PAGE_BEIGE = "#f7f0e6";

const partnerLogoShadow =
  "object-contain object-start drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]";

const dunsLogoClass = `${partnerLogoShadow} relative z-10 h-14 w-[10.5rem] sm:h-14 sm:w-[11.5rem]`;

const bdiLogoClass = `${partnerLogoShadow} h-12 w-[9rem] sm:h-12 sm:w-[10rem]`;

interface HeroSectionProps {
  onHeroLogoInViewChange?: (inView: boolean) => void;
}

export function HeroSection({ onHeroLogoInViewChange }: HeroSectionProps) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language.startsWith("he");
  const heroLogoRef = useHeroLogoInView(onHeroLogoInViewChange);

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="grid min-h-0 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[1.14fr_0.86fr]">
      {/* Hero image + copy */}
      <div
        className="page-beige flex min-h-[62vh] flex-col justify-start px-1.5 pt-1.5 sm:px-4 sm:pt-4 lg:min-h-full lg:px-5 lg:py-5"
        style={{ backgroundColor: PAGE_BEIGE }}
      >
        <div className="relative min-h-[56vh] flex-1 overflow-hidden rounded-2xl shadow-[0_10px_40px_rgba(61,35,24,0.14)] sm:min-h-[58vh] sm:rounded-3xl lg:min-h-0 lg:h-full">
          <img
            src={heroOfficeImage}
            alt={t("assets.heroImageAlt")}
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />

        <div
          className={cn(
            "static z-10 w-full p-6 pb-8 pt-5 sm:p-10 sm:pb-10 sm:pt-6 lg:px-12 lg:pb-12 lg:pt-8 xl:px-14 xl:pt-10"
          )}
        >
          <p
            className={cn(
              "absolute z-20 text-left text-sm font-semibold tracking-[0.22em] text-[#e8d4bc] uppercase",
              "left-4 top-4 sm:left-6 sm:top-5 sm:text-base sm:tracking-[0.2em]",
              "lg:left-12 lg:top-8 lg:text-lg lg:tracking-[0.15em]",
              "xl:left-14 xl:top-10"
            )}
          >
            <Ltr>{BRAND_SHORT}</Ltr>
          </p>
          <div className="flex max-w-xl flex-col pt-10 sm:pt-12 lg:pt-14 xl:pt-16">
            <ScrollReveal>
              <h1
                className={cn(
                  "font-serif text-white lg:text-[3.875rem] lg:leading-[1.1] xl:text-[4.5rem]",
                  isRtl
                    ? "text-[2.5rem] leading-[1.15] sm:text-[3rem] sm:leading-[1.12]"
                    : "text-[2.875rem] leading-[1.15] sm:text-[3.5rem] sm:leading-[1.12]"
                )}
              >
                {t("hero.title")}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={120}>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] max-lg:mt-9 sm:mt-8 sm:max-lg:mt-10 sm:text-lg">
              {t("hero.summary")}
            </p>
            </ScrollReveal>

            <ScrollReveal delay={220} className={cn(isRtl && "flex justify-center")}>
            <button
              type="button"
              onClick={scrollToServices}
              className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-[#e8d4bc] underline-offset-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] transition-colors hover:text-white hover:underline max-lg:mt-7 sm:mt-6"
            >
              {t("hero.viewServices")}
              <ChevronDown className="h-5 w-5" aria-hidden />
            </button>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal
          variant="fade-in"
          delay={300}
          className="pointer-events-none absolute bottom-0 start-0 z-10 flex items-end -space-x-5 p-6 sm:-space-x-6 sm:p-10 lg:px-12 lg:pb-8 xl:ps-12 xl:pb-10 xl:pe-14"
        >
          <img
            src={dunsLogo}
            alt={t("assets.dunsAlt")}
            className={dunsLogoClass}
            loading="lazy"
            decoding="async"
          />
          <img
            src={bdiLogo}
            alt={t("assets.bdiAlt")}
            className={bdiLogoClass}
            loading="lazy"
            decoding="async"
          />
        </ScrollReveal>
        </div>
      </div>

      <div
        className={cn(
          "page-beige flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-14 lg:py-12",
          isRtl
            ? "items-start lg:ps-10 lg:pe-5 xl:ps-12 xl:pe-6"
            : "items-start lg:px-10 xl:px-12"
        )}
        style={{ backgroundColor: PAGE_BEIGE }}
      >
        <ScrollReveal
          variant="fade-left"
          delay={150}
          className="w-full max-w-md lg:max-w-lg"
        >
          <div
            ref={heroLogoRef}
            className={cn(
              "mb-8 hidden w-full lg:flex",
              isRtl ? "justify-end" : "justify-start"
            )}
          >
            <a href="#" className="inline-flex">
              <img
                src={siteLogo}
                alt={siteLogoAlt}
                className="h-20 w-auto max-w-[16rem] object-contain object-left sm:h-24 sm:max-w-[18rem] lg:h-32 lg:max-w-[22rem]"
                decoding="async"
              />
            </a>
          </div>
          <ContactForm variant="minimal" />
        </ScrollReveal>
      </div>
    </section>
  );
}
