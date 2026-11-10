import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Archive,
  Check,
  FileSearch,
  Landmark,
  Languages,
  Pilcrow,
  Quote,
  Scale,
  UserRoundCheck,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { GermanContactFab } from "@/components/GermanContactFab";
import { ScrollReveal } from "@/components/ScrollReveal";
import { VideoCarousel } from "@/components/VideoCarousel";
import { siteLogo, siteLogoAlt } from "@/data/assets";
import i18n from "@/i18n";
import { GERMAN_CITIZENSHIP_SOURCE_CODE } from "@/lib/sourceCode";

const hebrewEligibilityPoints = [
  "100% אחוזי הצלחה למתאימים",
  "מחלקה גרמנית מקצועית ומנוסה לשירותכם",
  "שנים של הצלחות באיתור מסמכים בארכיונים גרמניים",
  "אימות מסמכים עם נוטריון דובר השפה",
  "טיפול מא׳ ועד ת׳ ללא סחבת מיותרת",
  "בלי לוותר על האזרחות הקיימת",
];

const englishEligibilityPoints = [
  "100% success rate for eligible applicants",
  "An experienced German & Austrian citizenship team at your service",
  "Years of success locating records in German and Austrian archives",
  "Document certification with a German-speaking notary",
  "End-to-end handling without unnecessary delays",
  "No need to give up your existing citizenship",
];

const hebrewProcessSteps = [
  {
    icon: FileSearch,
    title: "בדיקת זכאות ואיתור מסמכים",
    text: "נבדוק את הסיפור המשפחתי ונאתר מסמכים רלוונטיים בישראל ובארכיונים בגרמניה.",
  },
  {
    icon: Scale,
    title: "בניית התיק המשפטי",
    text: "הצוות הגרמני שלנו מכין את הבקשה, התרגומים, האימותים וכל המסמכים הנדרשים.",
  },
  {
    icon: Landmark,
    title: "הגשה וליווי עד לקבלה",
    text: "אנחנו מנהלים את ההליך מול הרשויות בגרמניה ומעדכנים אתכם עד לקבלת האזרחות.",
  },
];

const englishProcessSteps = [
  {
    icon: FileSearch,
    title: "Eligibility review and document search",
    text: "We review your family history and locate relevant records in Israel and in German and Austrian archives.",
  },
  {
    icon: Scale,
    title: "Building the legal application",
    text: "Our German & Austrian citizenship team prepares the application, translations, certifications, and required documents.",
  },
  {
    icon: Landmark,
    title: "Submission and ongoing representation",
    text: "We manage the process with the German or Austrian authorities and keep you informed through the grant of citizenship.",
  },
];

const hebrewEligibilityQuestions = [
  {
    title: "מי עשוי להיות זכאי?",
    text: "ילדים, נכדים ונינים של אזרחים גרמנים או תושבי גרמניה שנמלטו ממנה בתקופת הרדיפות בין השנים 1933–1945 עשויים להיות זכאים לדרכון גרמני.",
  },
  {
    title: "אין לכם מסמכים?",
    text: "גם ללא מסמכים אפשר להתחיל בבדיקת זכאות. הצוות שלנו מכיר את הארכיונים, הרשויות והדרישות המשפטיות בגרמניה ויודע היכן לחפש.",
  },
  {
    title: "איך מתקדמים מכאן?",
    text: "המחלקה הייעודית שלנו מלווה משפחות ישראליות בדרך לאזרחות אירופית — במקצועיות, בשקיפות ובליווי אישי בכל שלב.",
  },
];

const englishEligibilityQuestions = [
  {
    title: "Who may be eligible?",
    text: "Children, grandchildren, and great-grandchildren of German or Austrian citizens or residents who fled Nazi persecution may be eligible for German or Austrian citizenship.",
  },
  {
    title: "Do not have the documents?",
    text: "An eligibility review can begin even without documents. Our team knows the relevant archives, authorities, and legal requirements in Germany and Austria.",
  },
  {
    title: "What happens next?",
    text: "Our dedicated department guides families toward European citizenship with professionalism, transparency, and personal support at every stage.",
  },
];

const hebrewGermanCitizenshipReviews = [
  {
    name: "ניר פלסר",
    text: "זכיתי ליחס אישי בטיפול המשפטי. מורן, אשר ליוותה אותי, גילתה בקיאות וחריצות. לאור שביעות רצוני, המלצתי גם למכרים נוספים לפנות למשרד.",
  },
  {
    name: "פזית עוז",
    text: "עורכי דין מקצועיים ואנושיים. נותנים מענה גם במצבי חירום. ממליצה בחום.",
  },
  {
    name: "ליבי פורטנוב",
    text: "רציתי להגיד תודה לנחמה האלופה מהמשרד שלכם, שליוותה ולחמה את מלחמותינו. בפה מלא ניתן להגיד שניצחנו. תודה רבה.",
  },
];

const englishGermanCitizenshipReviews = [
  {
    name: "Nir Plesser",
    text: "I received personal attention throughout the legal process. Moran, who accompanied me, demonstrated knowledge and diligence. I was so satisfied that I recommended the firm to others.",
  },
  {
    name: "Pazit Oz",
    text: "Professional and compassionate lawyers who respond even in urgent situations. Highly recommended.",
  },
  {
    name: "Libi Portnov",
    text: "I would like to thank Nechama from your firm, who supported us and fought our battles. We can wholeheartedly say that we succeeded. Thank you very much.",
  },
];

interface GermanCitizenshipPageProps {
  language?: "he" | "en";
}

export function GermanCitizenshipPage({
  language = "he",
}: GermanCitizenshipPageProps) {
  const isEnglish = language === "en";
  const eligibilityPoints = isEnglish
    ? englishEligibilityPoints
    : hebrewEligibilityPoints;
  const processSteps = isEnglish ? englishProcessSteps : hebrewProcessSteps;
  const eligibilityQuestions = isEnglish
    ? englishEligibilityQuestions
    : hebrewEligibilityQuestions;
  const germanCitizenshipReviews = isEnglish
    ? englishGermanCitizenshipReviews
    : hebrewGermanCitizenshipReviews;
  const teamHighlights = isEnglish
    ? [
        {
          icon: Archive,
          title: "German-speaking archival research specialist",
          text: "Focused research in German and Austrian archives to locate civil, residency, and family records relevant to your application.",
        },
        {
          icon: Scale,
          title: "Experienced citizenship lawyers",
          text: "Legal analysis, application preparation, and representation throughout the German and Austrian citizenship process.",
        },
        {
          icon: Languages,
          title: "Clear multilingual communication",
          text: "Professional service in English, Hebrew, and German, with clear updates at every stage.",
        },
      ]
    : [
        {
          icon: Archive,
          title: "מומחה דובר גרמנית למחקר ארכיוני",
          text: "מחקר ממוקד בארכיונים בגרמניה לאיתור רישומי לידה, מגורים ומסמכים משפחתיים הרלוונטיים לבקשה.",
        },
        {
          icon: Scale,
          title: "עורכי דין מנוסים בתחום האזרחות",
          text: "בחינה משפטית, הכנת הבקשה וליווי לאורך כל הליך קבלת האזרחות הגרמנית.",
        },
        {
          icon: Languages,
          title: "תקשורת ברורה במספר שפות",
          text: "שירות מקצועי בעברית, אנגלית וגרמנית, עם עדכונים ברורים בכל שלב.",
        },
      ];
  const citizenshipVideos = isEnglish
    ? [
        ["zvKgJiQPhIc", "German citizenship eligibility"],
        ["QHZEataejK4", "German citizenship legal guidance"],
        ["kX_spmeTF3c", "Applying for German citizenship"],
      ]
    : [
        ["ihoeFNe8WSA", "הוצאת דרכון גרמני — דקר, פקס ושות׳"],
        ["nzo4qhRv-rI", "זכאות לאזרחות גרמנית — דקר, פקס ושות׳"],
        ["KmEbIPww2YE", "דרכון אוסטרי — מי זכאי על פי חוק האזרחות האוסטרי?"],
      ];
  const citizenshipShorts = isEnglish
    ? [
        ["8VR6mwKkMUQ", "What the German citizenship process looks like"],
        ["4SToUjXFFGM", "Why I chose to get a German passport"],
        ["C_toOLSFaCM", "The story behind my German citizenship"],
        ["dYTpyDN-uPw", "The journey to German citizenship"],
        ["FQRka592Cos", "Think you qualify for a German passport?"],
        ["bpIT7Q1DfNc", "High eligibility, not a simple process"],
      ]
    : [];
  const [languageReady, setLanguageReady] = useState(() =>
    i18n.language.startsWith(language)
  );
  const [formFocused, setFormFocused] = useState(false);
  const [playingShort, setPlayingShort] = useState<string | null>(null);

  useEffect(() => {
    void i18n.changeLanguage(language).finally(() => setLanguageReady(true));
    document.documentElement.lang = language;
    document.documentElement.dir = isEnglish ? "ltr" : "rtl";
    document.documentElement.classList.add("german-page-active");
    document.body.classList.add("german-page-active");
    document.title = isEnglish
      ? "German & Austrian Citizenship and Passports | Decker, Pex & Co."
      : "אזרחות ודרכון גרמני | דקר, פקס ושות׳";

    return () => {
      document.documentElement.classList.remove("german-page-active");
      document.body.classList.remove("german-page-active");
    };
  }, [isEnglish, language]);

  if (!languageReady) {
    return <div className="min-h-screen bg-[#0d2238]" aria-hidden />;
  }

  const scrollToForm = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setFormFocused(true);
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      return;
    }

    const form = document.getElementById("contact-form");
    if (!form) return;

    const headerHeight =
      document.querySelector("header")?.getBoundingClientRect().height ?? 0;
    const top =
      window.scrollY + form.getBoundingClientRect().top - headerHeight - 72;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  const restoreLandingPage = () => {
    setFormFocused(false);
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  return (
    <div
      dir={isEnglish ? "ltr" : "rtl"}
      className="german-page min-h-screen bg-[#0d2238] text-[#171717]"
    >
      <header className="sticky top-0 z-50 bg-[#0d2238]/95 text-white backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_auto] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:grid-cols-[auto_1fr_auto]">
          <a
            href="#top"
            aria-label={
              isEnglish
                ? "Decker, Pex & Co. — Home"
                : "דקר, פקס ושות׳ — דף הבית"
            }
            className="rounded-xl bg-white px-2 py-0.5 shadow-sm"
          >
            <img
              src={siteLogo}
              alt={siteLogoAlt}
              className="h-14 w-auto max-w-[13.5rem] object-contain sm:h-16"
            />
          </a>
          <nav
            aria-label={isEnglish ? "Page navigation" : "ניווט מהיר בעמוד"}
            className="hidden items-center justify-center gap-7 lg:flex lg:gap-10"
          >
            <a
              href="#about"
              className="text-base font-medium text-white/75 transition hover:text-white"
            >
              {isEnglish ? "Eligibility" : "מי זכאי"}
            </a>
            <a
              href="#video"
              className="text-base font-medium text-white/75 transition hover:text-white"
            >
              {isEnglish ? "Videos" : "סרטון הסבר"}
            </a>
            <a
              href="#process"
              className="text-base font-medium text-white/75 transition hover:text-white"
            >
              {isEnglish ? "Process" : "התהליך"}
            </a>
            <a
              href="#contact-form"
              className="text-base font-medium text-white/75 transition hover:text-white"
            >
              {isEnglish ? "Contact" : "צור קשר"}
            </a>
          </nav>
          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex w-auto justify-self-start items-center gap-1.5 rounded-full bg-[#2d6f95] px-3.5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#071522]/20 transition hover:-translate-y-0.5 hover:bg-[#245a79] sm:gap-2 sm:px-5"
          >
            <span className="sm:hidden">
              {isEnglish ? "Free Consultation" : "בדיקת זכאות"}
            </span>
            <span className="hidden sm:inline">
              {isEnglish
                ? "Get a Free Consultation"
                : "בדיקת זכאות ללא התחייבות"}
            </span>
            {isEnglish ? (
              <ArrowRight className="h-4 w-4" aria-hidden />
            ) : (
              <ArrowLeft className="h-4 w-4" aria-hidden />
            )}
          </button>
        </div>
      </header>

      <main>
        <section
          id="top"
          className="relative scroll-mt-24 overflow-hidden bg-[#0d2238] text-white lg:min-h-[calc(100svh-5rem)]"
        >
          <img
            src="/german-citizenship-hero.webp"
            alt=""
            className={`absolute inset-0 h-full w-full object-cover object-left opacity-55 ${
              isEnglish ? "scale-x-[-1]" : ""
            }`}
            loading="eager"
            fetchPriority="high"
            aria-hidden
          />
          <div className="absolute inset-0 opacity-80 german-hero-glow" />
          <div
            className={`relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:items-start lg:py-24 ${
              formFocused ? "lg:grid-cols-1" : "lg:grid-cols-[1.08fr_0.92fr]"
            }`}
          >
            <div className={formFocused ? "lg:hidden" : undefined}>
              <ScrollReveal>
                <p className="mb-4 text-base font-bold tracking-[0.12em] text-[#d8bd83] sm:text-lg">
                  {isEnglish
                    ? "Decker, Pex & Co. — German & Austrian Citizenship Department"
                    : "דקר, פקס ושות׳ — המחלקה לאזרחות גרמנית"}
                </p>
                <span className="inline-flex rounded-full border border-[#d8bd83]/35 bg-[#d8bd83]/10 px-4 py-1.5 text-sm font-bold text-[#e2c994]">
                  {isEnglish
                    ? "Free eligibility check"
                    : "בדיקת זכאות ללא התחייבות"}
                </span>
                <h1
                  className={`mt-4 font-sans font-extrabold leading-tight ${
                    isEnglish
                      ? "text-[2.5rem] sm:text-[3rem] lg:text-[3.25rem] xl:text-[3.6rem]"
                      : "text-[2.6rem] sm:text-[3.25rem] lg:text-[4rem]"
                  }`}
                >
                  {isEnglish ? "German & Austrian Citizenship" : "דרכון גרמני"}
                  <span className="block text-[#d8bd83]">
                    {isEnglish ? "Passports with Confidence" : "ואזרחות בביטחון"}
                  </span>
                </h1>
                <p className="mt-6 max-w-2xl text-xl font-bold leading-relaxed text-white sm:text-2xl">
                  {isEnglish
                    ? "A leading Israeli law firm with proven experience, successful cases, and client recommendations"
                    : "המשרד המוביל בישראל עם ניסיון מוכח, הצלחות והמלצות"}
                </p>
              </ScrollReveal>

              <div className="mt-9 max-w-2xl">
                {eligibilityPoints.map((point, index) => (
                  <ScrollReveal key={point} delay={80 + index * 45}>
                    <div className="flex items-center gap-4">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#d8bd83] text-[#0d2238]">
                        <Check className="h-5 w-5" strokeWidth={3} aria-hidden />
                      </span>
                      <span
                        className={`flex-1 py-3.5 text-base font-medium sm:text-lg ${
                          index < eligibilityPoints.length - 1
                            ? "border-b border-white/[0.09]"
                            : ""
                        }`}
                      >
                        {point}
                      </span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

            </div>

            <ScrollReveal
              variant={isEnglish ? "fade-right" : "fade-left"}
              delay={180}
            >
              <div
                className={`relative mx-auto w-full ${
                  formFocused ? "max-w-xl" : "max-w-lg"
                }`}
              >
                {formFocused && (
                  <button
                    type="button"
                    onClick={restoreLandingPage}
                    className="relative z-10 mb-5 hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/35 hover:bg-white/15 lg:inline-flex"
                  >
                    {isEnglish ? (
                      <ArrowLeft className="h-4 w-4" aria-hidden />
                    ) : (
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    )}
                    {isEnglish
                      ? "More information about German & Austrian citizenship"
                      : "למידע נוסף על אזרחות גרמנית"}
                  </button>
                )}
                <div className="relative text-white">
                  <ContactForm
                    variant="minimal"
                    sourceCode={GERMAN_CITIZENSHIP_SOURCE_CODE}
                    stableCountrySelect
                    title={isEnglish ? "Let's Discuss Your Case" : undefined}
                    subtitle={
                      isEnglish
                        ? "Tell us what happened. We'll guide you through the next steps."
                        : undefined
                    }
                    submitLabel={isEnglish ? "Get a Free Consultation" : undefined}
                    className="german-lead-form german-hero-form scroll-mt-36"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section
          id="about"
          className="german-transition-rounded relative scroll-mt-24 overflow-hidden py-20 sm:py-24"
        >
          <div className="absolute inset-0 german-story-bg" />
          <div
            className={`relative mx-auto max-w-5xl px-5 sm:px-8 ${
              isEnglish ? "text-left" : "text-right"
            }`}
          >
            <ScrollReveal>
              <span className="inline-flex items-center gap-2.5 rounded-full bg-[#2d6f95]/10 px-5 py-2.5 text-base font-bold text-[#245a79] sm:text-lg">
                <Pilcrow className="h-5 w-5 shrink-0" strokeWidth={2.2} aria-hidden />
                {isEnglish
                  ? "Legal reforms have opened new opportunities"
                  : "שינויים בחוק פתחו הזדמנויות חדשות"}
              </span>
              <div className="mt-5 flex items-center justify-start gap-4">
                <h2 className="font-sans text-3xl font-extrabold leading-tight sm:text-4xl">
                  {isEnglish
                    ? "Easier pathways to German and Austrian passports"
                    : "תקנות מקלות על קבלת דרכון גרמני"}
                </h2>
                {isEnglish && (
                  <div className="flex shrink-0 items-center">
                    <img
                      src="/german-passport-isolated.png"
                      alt="German passport"
                      className="relative z-10 h-24 w-20 -rotate-6 object-contain drop-shadow-[0_10px_14px_rgba(13,34,56,0.2)] sm:h-32 sm:w-28"
                      loading="lazy"
                      decoding="async"
                    />
                    <img
                      src="/austrian-passport-isolated.png"
                      alt="Austrian passport"
                      className="-ml-6 h-24 w-20 rotate-6 object-contain drop-shadow-[0_10px_14px_rgba(13,34,56,0.2)] sm:-ml-8 sm:h-32 sm:w-28"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
              </div>
              <h3 className="mt-4 font-sans text-2xl font-bold text-[#245a79]">
                {isEnglish
                  ? "You may also be eligible for German or Austrian citizenship"
                  : "אולי גם אתם זכאים לדרכון גרמני"}
              </h3>
            </ScrollReveal>

            <div className="relative mt-10 grid gap-5 text-start md:grid-cols-3">
              <div
                className="absolute left-[16.67%] right-[16.67%] top-[2.65rem] hidden h-px bg-gradient-to-l from-[#2d6f95]/20 via-[#2d6f95]/55 to-[#2d6f95]/20 md:block"
                aria-hidden
              />
              {eligibilityQuestions.map(({ title, text }, index) => (
                <ScrollReveal
                  key={title}
                  delay={90 + index * 70}
                  className="relative z-10"
                >
                  <article className="group relative h-full overflow-hidden rounded-2xl border border-[#d9e0e6] bg-white p-6 shadow-[0_10px_30px_rgba(13,34,56,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(13,34,56,0.1)]">
                    <span
                      className={`pointer-events-none absolute top-2 font-sans text-[5.5rem] font-black leading-none text-[#2d6f95]/[0.08] ${
                        isEnglish ? "right-3" : "left-3"
                      }`}
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4">
                        <h3 className="font-sans text-xl font-extrabold text-[#172b3d]">
                          {title}
                        </h3>
                      </div>
                      <p className="mt-3 text-base leading-7 text-[#5d6c79]">{text}</p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={180}>
              <div
                className="relative mx-auto mt-14 max-w-4xl px-2 text-start sm:px-6"
              >
                <div>
                  <h3 className="font-sans text-2xl font-extrabold">
                    {isEnglish
                      ? "Decker, Pex & Co. Law Firm"
                      : "משרד עורכי דין דקר, פקס ושות׳"}
                  </h3>
                  <p className="mt-4 text-lg leading-8 text-muted">
                    {isEnglish
                      ? "Our partners hold foreign citizenship themselves and understand the value of creating another opportunity for a family. We tailor a precise legal pathway to every client and manage the process with the authorities through completion."
                      : "שותפי המשרד הם בעלי אזרחויות זרות בעצמם, ומכירים מקרוב את החשיבות של הזדמנות נוספת עבור המשפחה. אנו מתאימים לכל לקוח מסלול משפטי מדויק ומנהלים את התהליך מול הרשויות עד להשלמתו."}
                  </p>
                  <p className="mt-5 font-bold text-[#245a79]">
                    {isEnglish
                      ? "With you throughout the process — from the eligibility review to receiving your passport."
                      : "איתכם לאורך כל הדרך — מבדיקת הזכאות ועד לקבלת הדרכון בפועל."}
                  </p>
                </div>

              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="german-transition-diagonal bg-white pb-20 pt-28 sm:pb-24 sm:pt-32">
          <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            <ScrollReveal
              variant={isEnglish ? "fade-right" : "fade-left"}
              className="h-full"
            >
              <div className="relative h-full">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#2d6f95]/15 to-[#d8bd83]/15 blur-2xl" />
                <div className="relative aspect-[1024/517] overflow-hidden rounded-[1.75rem] shadow-[0_24px_65px_rgba(13,34,56,0.18)]">
                  <img
                    src="/german-citizenship-team.jpg"
                    alt={
                      isEnglish
                        ? "The Decker, Pex & Co. legal team"
                        : "הצוות המשפטי של דקר, פקס ושות׳"
                    }
                    className="absolute inset-0 h-full w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d2238]/55 to-transparent" />
                  <span
                    dir={isEnglish ? "ltr" : "rtl"}
                    className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-left text-sm font-bold text-[#245a79] shadow-lg backdrop-blur-md"
                  >
                    <UserRoundCheck className="h-4 w-4" aria-hidden />
                    {isEnglish
                      ? "The team behind your application"
                      : "הצוות שמאחורי הבקשה שלכם"}
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal
              variant={isEnglish ? "fade-left" : "fade-right"}
              delay={100}
            >
              <div className="text-start">
                <h2 className="font-sans text-3xl font-extrabold leading-tight text-[#172b3d] sm:text-4xl">
                  {isEnglish
                    ? "Legal and archival expertise under one roof"
                    : "מומחיות משפטית וארכיונית תחת קורת גג אחת"}
                </h2>
                <p className="mt-5 text-lg leading-8 text-[#5d6c79]">
                  {isEnglish
                    ? "Your application is handled by a multidisciplinary team that combines legal expertise with practical archival research in Germany and Austria. We coordinate the records, translations, certifications, and legal submissions as one structured process."
                    : "הבקשה שלכם מטופלת על ידי צוות רב־תחומי המשלב מומחיות משפטית עם מחקר ארכיוני מעשי בגרמניה. אנו מרכזים את המסמכים, התרגומים, האימותים וההגשה המשפטית כתהליך אחד מסודר."}
                </p>

                <div className="mt-8 space-y-6">
                  {teamHighlights.map(({ icon: Icon, title, text }, index) => (
                    <div
                      key={title}
                      className={`flex items-start gap-4 ${
                        index > 0
                          ? "border-t border-[#dce3e8] pt-6 sm:border-0 sm:pt-0"
                          : ""
                      }`}
                    >
                      <Icon
                        className="mt-0.5 h-7 w-7 shrink-0 text-[#2d6f95]"
                        strokeWidth={1.8}
                        aria-hidden
                      />
                      <div>
                        <h3 className="font-sans text-lg font-extrabold text-[#172b3d]">
                          {title}
                        </h3>
                        <p className="mt-1 text-base leading-7 text-[#657482]">
                          {text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section
          id="video"
          className="german-transition-notch scroll-mt-24 bg-[#0a1930] px-5 pb-20 pt-28 text-white sm:px-8 sm:pb-24 sm:pt-32"
        >
          <div className="mx-auto max-w-7xl">
            <ScrollReveal className="text-center">
              <p className="text-base font-bold tracking-wide text-[#d8bd83] sm:text-lg">
                {isEnglish
                  ? "Guidance from German and Austrian citizenship lawyers"
                  : "מידע מעורך דין המתמחה באזרחות גרמנית"}
              </p>
              <h2 className="mt-3 font-sans text-3xl font-extrabold sm:text-4xl">
                {isEnglish
                  ? "What you need to know about obtaining a German or Austrian passport"
                  : "כל מה שחשוב לדעת על הוצאת דרכון גרמני"}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/70">
                {isEnglish
                  ? "Learn about eligibility, recent legal changes, and the first steps in the process."
                  : "צפו בהסבר על הזכאות, השינויים בחוק והצעדים הראשונים בתהליך."}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={120} className="mt-10">
              <VideoCarousel
                label={isEnglish ? "Videos" : "סרטונים"}
                rtl={!isEnglish}
                previousLabel={isEnglish ? "Previous videos" : "הסרטונים הקודמים"}
                nextLabel={isEnglish ? "Next videos" : "הסרטונים הבאים"}
              >
              {citizenshipVideos.map(([videoId, title]) => (
                <div
                  key={videoId}
                  className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-[calc((100%-3rem)/2.4)]"
                >
                  <div className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl shadow-black/30">
                    <div className="aspect-video">
                      <iframe
                        className="h-full w-full"
                        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ))}
              </VideoCarousel>
            </ScrollReveal>

            {citizenshipShorts.length > 0 && (
              <ScrollReveal delay={160} className="mt-12">
              <VideoCarousel
                label="Shorts"
                rtl={!isEnglish}
                previousLabel={isEnglish ? "Previous Shorts" : "הסרטונים הקודמים"}
                nextLabel={isEnglish ? "Next Shorts" : "הסרטונים הבאים"}
              >
                {citizenshipShorts.map(([videoId, title]) => (
                  <div
                    key={videoId}
                    className="w-[44%] shrink-0 snap-start sm:w-[30%] lg:w-[calc((100%-7.5rem)/5.4)]"
                  >
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/30">
                      <div className="relative aspect-[9/16]">
                        {playingShort === videoId ? (
                          <iframe
                            className="h-full w-full"
                            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&autoplay=1&playsinline=1`}
                            title={title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        ) : (
                          <button
                            type="button"
                            onClick={() => setPlayingShort(videoId)}
                            aria-label={`${isEnglish ? "Play video" : "הפעלת סרטון"}: ${title}`}
                            className="group absolute inset-0 h-full w-full"
                          >
                            <img
                              src={`https://i.ytimg.com/vi/${videoId}/oardefault.jpg`}
                              alt=""
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                              loading="lazy"
                              decoding="async"
                            />
                            <span className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/5 to-transparent transition group-hover:bg-black/20" />
                            <span
                              dir="ltr"
                              className="absolute left-3 top-3 flex items-center gap-1 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
                              aria-hidden
                            >
                              <svg viewBox="0 0 24 24" className="h-5 w-5">
                                <path
                                  fill="currentColor"
                                  d="M17.77 10.32l-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25z"
                                />
                                <path fill="#000" fillOpacity="0.55" d="M10 14.65v-5.3L15 12l-5 2.65z" />
                              </svg>
                              <span className="text-sm font-bold tracking-tight">Shorts</span>
                            </span>
                            <svg
                              viewBox="0 0 24 24"
                              className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)] transition group-hover:scale-110"
                              aria-hidden
                            >
                              <path
                                fill="#FF0033"
                                d="M17.77 10.32l-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25z"
                              />
                              <path fill="#fff" d="M10 14.65v-5.3L15 12l-5 2.65z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </VideoCarousel>
              </ScrollReveal>
            )}

            <ScrollReveal delay={240} className="mt-8 text-center">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 rounded-full bg-[#2d6f95] px-7 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#245a79]"
              >
                {isEnglish
                  ? "Get a Free Consultation"
                  : "בדיקת זכאות ללא התחייבות"}
                {isEnglish ? (
                  <ArrowRight className="h-5 w-5" aria-hidden />
                ) : (
                  <ArrowLeft className="h-5 w-5" aria-hidden />
                )}
              </button>
            </ScrollReveal>
          </div>
        </section>

        <section
          id="process"
          className="german-transition-rounded-reverse scroll-mt-24 bg-[#e8ebef] pb-44 pt-36 sm:pb-52 sm:pt-44"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <ScrollReveal
              className={`max-w-3xl ${
                isEnglish ? "mr-auto text-left" : "ml-auto text-right"
              }`}
            >
              <p className="text-base font-bold tracking-wide text-[#2d6f95] sm:text-lg">
                {isEnglish ? "A clear and structured process" : "תהליך ברור ומסודר"}
              </p>
              <h2 className="mt-3 font-sans text-3xl font-extrabold sm:text-4xl">
                {isEnglish
                  ? "How we review and advance your eligibility"
                  : "כך נבדוק ונקדם את הזכאות שלכם"}
              </h2>
            </ScrollReveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {processSteps.map(({ icon: Icon, title, text }, index) => (
                <ScrollReveal key={title} delay={index * 90}>
                  <article
                    className={`group relative h-full overflow-hidden border border-white/80 bg-white/90 p-7 shadow-[0_16px_38px_rgba(13,34,56,0.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(13,34,56,0.14)] ${
                      index === 0
                        ? "rounded-[2.75rem_0.75rem_2.75rem_1rem]"
                        : index === 1
                          ? "rounded-[0.75rem_2.75rem_0.75rem_2.75rem]"
                          : "rounded-[2.75rem_1rem_2.75rem_0.75rem]"
                    } ${isEnglish ? "text-left" : "text-right"}`}
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-[#2d6f95] via-[#71a8c5] to-[#d8bd83] opacity-70" />
                    <div className="flex items-center gap-4">
                      <Icon
                        className="h-10 w-10 shrink-0 text-[#2d6f95]"
                        strokeWidth={1.8}
                        aria-hidden
                      />
                      <h3 className="font-sans text-xl font-extrabold">{title}</h3>
                    </div>
                    <p className="mt-3 leading-7 text-muted">{text}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="german-transition-slant bg-[#f5f7f9] pb-20 pt-28 sm:pb-24 sm:pt-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <ScrollReveal className="text-center">
              <p className="text-base font-bold tracking-wide text-[#2d6f95] sm:text-lg">
                {isEnglish ? "Client testimonials" : "לקוחות מספרים"}
              </p>
              <h2 className="mt-3 font-sans text-3xl font-extrabold text-[#172b3d] sm:text-4xl">
                {isEnglish
                  ? "Legal guidance that makes a difference"
                  : "ליווי משפטי שמרגישים בו את ההבדל"}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#657482]">
                {isEnglish
                  ? "Professionalism, availability, and personal attention throughout the process."
                  : "מקצועיות, זמינות ויחס אישי — לאורך כל הדרך."}
              </p>
            </ScrollReveal>

            <div className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
              {germanCitizenshipReviews.map((review, index) => (
                <ScrollReveal
                  key={review.name}
                  delay={index * 90}
                  className="w-[84vw] max-w-[22rem] shrink-0 snap-center md:w-auto md:max-w-none"
                >
                  <blockquote className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#dce3e8] bg-white p-7 shadow-[0_12px_35px_rgba(13,34,56,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(13,34,56,0.11)] sm:p-8">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-[#2d6f95] via-[#5594b6] to-[#d8bd83] opacity-80" />
                    <Quote
                      className="h-9 w-9 text-[#d8bd83]"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <p className="mt-6 flex-1 text-lg leading-8 text-[#34495d]">
                      {review.text}
                    </p>
                    <footer className="relative mt-7 pt-5 before:absolute before:inset-x-0 before:top-0 before:h-8 before:rounded-tr-[2rem] before:border-r before:border-t before:border-[#e7ebef]">
                      <cite className="not-italic">
                        <span className="block font-sans text-base font-extrabold text-[#172b3d]">
                          {review.name}
                        </span>
                        <span className="mt-1 block text-sm text-[#71808d]">
                          {isEnglish ? "Firm client" : "לקוח/ת המשרד"}
                        </span>
                      </cite>
                    </footer>
                  </blockquote>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-20 overflow-visible bg-[#163b59] px-5 py-16 text-white sm:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal className="text-center">
              <h2 className="font-sans text-3xl font-extrabold">
                {isEnglish
                  ? "Let's Discuss Your Case"
                  : "הצעד הראשון לאזרחות גרמנית מתחיל בבדיקת זכאות"}
              </h2>
              <p className="mt-3 text-lg text-white/80">
                {isEnglish
                  ? "Tell us what happened. We'll guide you through the next steps."
                  : "אין צורך להגיע עם כל המסמכים. ספרו לנו את הסיפור המשפחתי ונבדוק."}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="mt-10 sm:rounded-3xl sm:border sm:border-white/10 sm:bg-white/[0.06] sm:p-7 sm:shadow-2xl sm:shadow-[#071522]/15 sm:backdrop-blur-sm">
                <ContactForm
                  id="bottom-contact-form"
                  variant="minimal"
                  sourceCode={GERMAN_CITIZENSHIP_SOURCE_CODE}
                  stableCountrySelect
                  hideHeader
                  submitLabel={isEnglish ? "Submit" : undefined}
                  messagePlaceholder={isEnglish ? "Your message" : undefined}
                  className="german-lead-form german-inline-form"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer variant="german" />
      <GermanContactFab language={language} />
    </div>
  );
}
