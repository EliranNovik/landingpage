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
import { siteLogo, siteLogoAlt, teamPhoto } from "@/data/assets";
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
  "An experienced German citizenship team at your service",
  "Years of success locating records in German archives",
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
    text: "We review your family history and locate relevant records in Israel and German archives.",
  },
  {
    icon: Scale,
    title: "Building the legal application",
    text: "Our German citizenship team prepares the application, translations, certifications, and required documents.",
  },
  {
    icon: Landmark,
    title: "Submission and ongoing representation",
    text: "We manage the process with the German authorities and keep you informed through the grant of citizenship.",
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
    text: "Children, grandchildren, and great-grandchildren of German citizens or residents who fled Germany during the persecution of 1933–1945 may be eligible for German citizenship.",
  },
  {
    title: "Do not have the documents?",
    text: "An eligibility review can begin even without documents. Our team knows the relevant archives, authorities, and legal requirements in Germany.",
  },
  {
    title: "What happens next?",
    text: "Our dedicated department guides Israeli families toward European citizenship with professionalism, transparency, and personal support at every stage.",
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
          text: "Focused research in German archives to locate civil, residency, and family records relevant to your application.",
        },
        {
          icon: Scale,
          title: "Experienced citizenship lawyers",
          text: "Legal analysis, application preparation, and representation throughout the German citizenship process.",
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
  const [languageReady, setLanguageReady] = useState(() =>
    i18n.language.startsWith(language)
  );
  const [formFocused, setFormFocused] = useState(false);

  useEffect(() => {
    void i18n.changeLanguage(language).finally(() => setLanguageReady(true));
    document.documentElement.lang = language;
    document.documentElement.dir = isEnglish ? "ltr" : "rtl";
    document.documentElement.classList.add("german-page-active");
    document.body.classList.add("german-page-active");
    document.title = isEnglish
      ? "German Citizenship and Passport | Decker, Pex & Co."
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
              {isEnglish ? "Check eligibility" : "בדיקת זכאות"}
            </span>
            <span className="hidden sm:inline">
              {isEnglish
                ? "Free eligibility check"
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
                    ? "Decker, Pex & Co. — German Citizenship Department"
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
                  {isEnglish ? "German Passport" : "דרכון גרמני"}
                  <span className="block text-[#d8bd83]">
                    {isEnglish ? "Citizenship with Confidence" : "ואזרחות בביטחון"}
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
                      ? "More information about German citizenship"
                      : "למידע נוסף על אזרחות גרמנית"}
                  </button>
                )}
                <div className="relative text-white">
                  <ContactForm
                    variant="minimal"
                    sourceCode={GERMAN_CITIZENSHIP_SOURCE_CODE}
                    stableCountrySelect
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
          <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2.5 rounded-full bg-[#2d6f95]/10 px-5 py-2.5 text-base font-bold text-[#245a79] sm:text-lg">
                <Pilcrow className="h-5 w-5 shrink-0" strokeWidth={2.2} aria-hidden />
                {isEnglish
                  ? "Legal reforms have opened new opportunities"
                  : "שינויים בחוק פתחו הזדמנויות חדשות"}
              </span>
              <div className="mt-5 flex items-center justify-center gap-4">
                <h2 className="font-sans text-3xl font-extrabold leading-tight sm:text-4xl">
                  {isEnglish
                    ? "Easier pathways to a German passport"
                    : "תקנות מקלות על קבלת דרכון גרמני"}
                </h2>
                {isEnglish && (
                  <img
                    src="/german-passport-isolated.png"
                    alt="German passport"
                    className="h-24 w-20 shrink-0 object-contain drop-shadow-[0_10px_14px_rgba(13,34,56,0.2)] sm:h-32 sm:w-28"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>
              <h3 className="mt-4 font-sans text-2xl font-bold text-[#245a79]">
                {isEnglish
                  ? "You may also be eligible for German citizenship"
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
                className={`relative mx-auto mt-14 max-w-4xl px-2 sm:px-6 ${
                  isEnglish ? "md:text-left" : ""
                }`}
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
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-[0_24px_65px_rgba(13,34,56,0.18)]">
                  <img
                    src={teamPhoto}
                    alt={
                      isEnglish
                        ? "The Decker, Pex & Co. legal team"
                        : "הצוות המשפטי של דקר, פקס ושות׳"
                    }
                    className="absolute inset-0 h-full w-full object-cover"
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
                    ? "Your application is handled by a multidisciplinary team that combines legal expertise with practical archival research in Germany. We coordinate the records, translations, certifications, and legal submissions as one structured process."
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
                  ? "Guidance from a German citizenship lawyer"
                  : "מידע מעורך דין המתמחה באזרחות גרמנית"}
              </p>
              <h2 className="mt-3 font-sans text-3xl font-extrabold sm:text-4xl">
                {isEnglish
                  ? "What you need to know about obtaining a German passport"
                  : "כל מה שחשוב לדעת על הוצאת דרכון גרמני"}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/70">
                {isEnglish
                  ? "Learn about eligibility, recent legal changes, and the first steps in the process."
                  : "צפו בהסבר על הזכאות, השינויים בחוק והצעדים הראשונים בתהליך."}
              </p>
            </ScrollReveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <ScrollReveal delay={120}>
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl shadow-black/30">
                  <div className="aspect-video">
                    <iframe
                      className="h-full w-full"
                      src={
                        isEnglish
                          ? "https://www.youtube-nocookie.com/embed/X8BPaMIjv98?start=10&rel=0"
                          : "https://www.youtube-nocookie.com/embed/ihoeFNe8WSA?start=1&rel=0"
                      }
                      title={
                        isEnglish
                          ? "Obtaining a German passport — Decker, Pex & Co."
                          : "הוצאת דרכון גרמני — דקר, פקס ושות׳"
                      }
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={180}>
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl shadow-black/30">
                  <div className="aspect-video">
                    <iframe
                      className="h-full w-full"
                      src={
                        isEnglish
                          ? "https://www.youtube-nocookie.com/embed/zvKgJiQPhIc?rel=0"
                          : "https://www.youtube-nocookie.com/embed/nzo4qhRv-rI?rel=0"
                      }
                      title={
                        isEnglish
                          ? "German citizenship eligibility — Decker, Pex & Co."
                          : "זכאות לאזרחות גרמנית — דקר, פקס ושות׳"
                      }
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={240} className="mt-8 text-center">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 rounded-full bg-[#2d6f95] px-7 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#245a79]"
              >
                {isEnglish
                  ? "Free eligibility check"
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
            <ScrollReveal className="text-center">
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
                  <article className="h-full rounded-3xl border border-[#d9dde2] bg-white p-7 shadow-lg shadow-black/5">
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
                  ? "Your first step toward German citizenship starts with an eligibility review"
                  : "הצעד הראשון לאזרחות גרמנית מתחיל בבדיקת זכאות"}
              </h2>
              <p className="mt-3 text-lg text-white/80">
                {isEnglish
                  ? "You do not need to have every document. Tell us your family history and we will review it."
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
