import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileSearch,
  Landmark,
  Quote,
  Scale,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { GermanContactFab } from "@/components/GermanContactFab";
import { ScrollReveal } from "@/components/ScrollReveal";
import { siteLogo, siteLogoAlt } from "@/data/assets";
import i18n from "@/i18n";
import { GERMAN_CITIZENSHIP_SOURCE_CODE } from "@/lib/sourceCode";

const eligibilityPoints = [
  "100% אחוזי הצלחה למתאימים",
  "מחלקה גרמנית מקצועית ומנוסה לשירותכם",
  "שנים של הצלחות באיתור מסמכים בארכיונים גרמניים",
  "אימות מסמכים עם נוטריון דובר השפה",
  "טיפול מא׳ ועד ת׳ ללא סחבת מיותרת",
  "בלי לוותר על האזרחות הקיימת",
];

const processSteps = [
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

const eligibilityQuestions = [
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

const germanCitizenshipReviews = [
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

export function GermanCitizenshipPage() {
  const [languageReady, setLanguageReady] = useState(() =>
    i18n.language.startsWith("he")
  );
  const [formFocused, setFormFocused] = useState(false);

  useEffect(() => {
    void i18n.changeLanguage("he").finally(() => setLanguageReady(true));
    document.documentElement.lang = "he";
    document.documentElement.dir = "rtl";
    document.documentElement.classList.add("german-page-active");
    document.body.classList.add("german-page-active");
    document.title = "אזרחות ודרכון גרמני | דקר, פקס ושות׳";

    return () => {
      document.documentElement.classList.remove("german-page-active");
      document.body.classList.remove("german-page-active");
    };
  }, []);

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
    <div dir="rtl" className="german-page min-h-screen bg-[#0d2238] text-[#171717]">
      <header className="sticky top-0 z-50 bg-[#0d2238]/95 text-white backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_auto] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:grid-cols-[auto_1fr_auto]">
          <a
            href="#top"
            aria-label="דקר, פקס ושות׳ — דף הבית"
            className="rounded-xl bg-white px-2 py-0.5 shadow-sm"
          >
            <img
              src={siteLogo}
              alt={siteLogoAlt}
              className="h-14 w-auto max-w-[13.5rem] object-contain sm:h-16"
            />
          </a>
          <nav
            aria-label="ניווט מהיר בעמוד"
            className="hidden items-center justify-center gap-7 lg:flex lg:gap-10"
          >
            <a
              href="#about"
              className="text-base font-medium text-white/75 transition hover:text-white"
            >
              מי זכאי
            </a>
            <a
              href="#video"
              className="text-base font-medium text-white/75 transition hover:text-white"
            >
              סרטון הסבר
            </a>
            <a
              href="#process"
              className="text-base font-medium text-white/75 transition hover:text-white"
            >
              התהליך
            </a>
            <a
              href="#contact-form"
              className="text-base font-medium text-white/75 transition hover:text-white"
            >
              צור קשר
            </a>
          </nav>
          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex w-auto justify-self-start items-center gap-1.5 rounded-full bg-[#2d6f95] px-3.5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#071522]/20 transition hover:-translate-y-0.5 hover:bg-[#245a79] sm:gap-2 sm:px-5"
          >
            <span className="sm:hidden">בדיקת זכאות</span>
            <span className="hidden sm:inline">בדיקת זכאות ללא התחייבות</span>
            <ArrowLeft className="h-4 w-4" aria-hidden />
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
            className="absolute inset-0 h-full w-full object-cover object-left opacity-45"
            loading="eager"
            fetchPriority="high"
            aria-hidden
          />
          <div className="absolute inset-0 opacity-90 german-hero-glow" />
          <div
            className={`relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:items-start lg:py-24 ${
              formFocused ? "lg:grid-cols-1" : "lg:grid-cols-[1.08fr_0.92fr]"
            }`}
          >
            <div className={formFocused ? "lg:hidden" : undefined}>
              <ScrollReveal>
                <p className="mb-4 text-base font-bold tracking-[0.12em] text-[#d8bd83] sm:text-lg">
                  דקר, פקס ושות׳ — המחלקה לאזרחות גרמנית
                </p>
                <span className="inline-flex rounded-full border border-[#d8bd83]/35 bg-[#d8bd83]/10 px-4 py-1.5 text-sm font-bold text-[#e2c994]">
                  בדיקת זכאות ללא התחייבות
                </span>
                <h1 className="mt-4 font-sans text-[2.6rem] font-extrabold leading-tight sm:text-[3.25rem] lg:text-[4rem]">
                  דרכון גרמני
                  <span className="block text-[#d8bd83]">ואזרחות בביטחון</span>
                </h1>
                <p className="mt-6 max-w-2xl text-xl font-bold leading-relaxed text-white sm:text-2xl">
                  המשרד המוביל בישראל עם ניסיון מוכח, הצלחות והמלצות
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

              {/* <ScrollReveal delay={420}>
                <div className="mt-8 rounded-2xl border border-[#d8bd83]/35 bg-white/[0.06] p-5">
                  <p className="text-lg font-bold text-[#e2c994]">
                    גם אם אין לכם מסמכים — אל דאגה!
                  </p>
                  <p className="mt-1 leading-relaxed text-white/90">
                    בדיקה ראשונית אפשרית עם שם מלא, שם קרוב משפחה ותאריך לידה.
                  </p>
                </div>
              </ScrollReveal> */}
            </div>

            <ScrollReveal variant="fade-left" delay={180}>
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
                    <ArrowRight className="h-4 w-4" aria-hidden />
                    למידע נוסף על אזרחות גרמנית
                  </button>
                )}
                <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-[#d8bd83]/10 via-[#3e86ad]/10 to-[#3e86ad]/20 blur-2xl" />
                <div className="relative rounded-[1.75rem] bg-white/[0.6] text-charcoal shadow-[0_28px_80px_rgba(3,18,32,0.3)] backdrop-blur-xl">
                  <div className="mx-4 h-1.5 rounded-full bg-gradient-to-l from-[#2d6f95] via-[#5594b6] to-[#d8bd83]" />
                  <div className="pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full bg-[#2d6f95]/[0.06] blur-2xl" />
                  <div className="relative p-6 sm:p-8 lg:p-9">
                  <ContactForm
                    variant="minimal"
                    sourceCode={GERMAN_CITIZENSHIP_SOURCE_CODE}
                    stableCountrySelect
                    className="german-lead-form german-hero-form scroll-mt-36"
                  />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="about" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24">
          <div className="absolute inset-0 german-story-bg" />
          <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
            <ScrollReveal>
              <span className="inline-flex rounded-full bg-[#2d6f95]/10 px-5 py-2.5 text-base font-bold text-[#245a79] sm:text-lg">
                שינויים בחוק פתחו הזדמנויות חדשות
              </span>
              <h2 className="mt-5 font-sans text-3xl font-extrabold leading-tight sm:text-4xl">
                תקנות מקלות על קבלת דרכון גרמני
              </h2>
              <h3 className="mt-4 font-sans text-2xl font-bold text-[#245a79]">
                אולי גם אתם זכאים לדרכון גרמני
              </h3>
            </ScrollReveal>

            <div className="relative mt-10 grid gap-5 text-right md:grid-cols-3">
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
                  <article className="group h-full rounded-2xl border border-[#d9e0e6] bg-white p-6 shadow-[0_10px_30px_rgba(13,34,56,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(13,34,56,0.1)]">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-sans text-xl font-extrabold text-[#172b3d]">
                          {title}
                        </h3>
                        <span className="inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-lg bg-[#e8f1f6] px-2 font-sans text-sm font-extrabold text-[#245a79]">
                          {index + 1}
                        </span>
                      </div>
                      <p className="mt-3 text-base leading-7 text-[#5d6c79]">{text}</p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={180}>
              <div className="mx-auto mt-14 max-w-3xl px-2 sm:px-6">
                <h3 className="font-sans text-2xl font-extrabold">
                  משרד עורכי דין דקר, פקס ושות׳
                </h3>
                <p className="mt-4 text-lg leading-8 text-muted">
                  שותפי המשרד הם בעלי אזרחויות זרות בעצמם, ומכירים מקרוב את החשיבות
                  של הזדמנות נוספת עבור המשפחה. אנו מתאימים לכל לקוח מסלול משפטי
                  מדויק ומנהלים את התהליך מול הרשויות עד להשלמתו.
                </p>
                <p className="mt-5 font-bold text-[#245a79]">
                  איתכם לאורך כל הדרך — מבדיקת הזכאות ועד לקבלת הדרכון בפועל.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section
          id="video"
          className="scroll-mt-24 bg-[#0a1930] px-5 py-20 text-white sm:px-8 sm:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <ScrollReveal className="text-center">
              <p className="text-base font-bold tracking-wide text-[#d8bd83] sm:text-lg">
                מידע מעורך דין המתמחה באזרחות גרמנית
              </p>
              <h2 className="mt-3 font-sans text-3xl font-extrabold sm:text-4xl">
                כל מה שחשוב לדעת על הוצאת דרכון גרמני
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/70">
                צפו בהסבר על הזכאות, השינויים בחוק והצעדים הראשונים בתהליך.
              </p>
            </ScrollReveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <ScrollReveal delay={120}>
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl shadow-black/30">
                  <div className="aspect-video">
                    <iframe
                      className="h-full w-full"
                      src="https://www.youtube-nocookie.com/embed/ihoeFNe8WSA?start=1&rel=0"
                      title="הוצאת דרכון גרמני — דקר, פקס ושות׳"
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
                      src="https://www.youtube-nocookie.com/embed/nzo4qhRv-rI?rel=0"
                      title="זכאות לאזרחות גרמנית — דקר, פקס ושות׳"
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
                בדיקת זכאות ללא התחייבות
                <ArrowLeft className="h-5 w-5" aria-hidden />
              </button>
            </ScrollReveal>
          </div>
        </section>

        <section id="process" className="scroll-mt-24 bg-[#e8ebef] py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <ScrollReveal className="text-center">
              <p className="text-base font-bold tracking-wide text-[#2d6f95] sm:text-lg">תהליך ברור ומסודר</p>
              <h2 className="mt-3 font-sans text-3xl font-extrabold sm:text-4xl">
                כך נבדוק ונקדם את הזכאות שלכם
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

        <section className="bg-[#f5f7f9] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <ScrollReveal className="text-center">
              <p className="text-base font-bold tracking-wide text-[#2d6f95] sm:text-lg">
                לקוחות מספרים
              </p>
              <h2 className="mt-3 font-sans text-3xl font-extrabold text-[#172b3d] sm:text-4xl">
                ליווי משפטי שמרגישים בו את ההבדל
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#657482]">
                מקצועיות, זמינות ויחס אישי — לאורך כל הדרך.
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
                    <footer className="mt-7 border-t border-[#e7ebef] pt-5">
                      <cite className="not-italic">
                        <span className="block font-sans text-base font-extrabold text-[#172b3d]">
                          {review.name}
                        </span>
                        <span className="mt-1 block text-sm text-[#71808d]">
                          לקוח/ת המשרד
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
                הצעד הראשון לאזרחות גרמנית מתחיל בבדיקת זכאות
              </h2>
              <p className="mt-3 text-lg text-white/80">
                אין צורך להגיע עם כל המסמכים. ספרו לנו את הסיפור המשפחתי ונבדוק.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-[#071522]/15 backdrop-blur-sm sm:p-7">
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
      <GermanContactFab />
    </div>
  );
}
