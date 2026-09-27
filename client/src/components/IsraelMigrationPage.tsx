import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  HeartHandshake,
  Images,
  Landmark,
  Languages,
  Scale,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { GermanContactFab } from "@/components/GermanContactFab";
import { ScrollReveal } from "@/components/ScrollReveal";
import { dunsLogo, siteLogo, siteLogoAlt, teamPhoto } from "@/data/assets";
import i18n from "@/i18n";
import { ISRAEL_MIGRATION_SOURCE_CODE } from "@/lib/sourceCode";

const heroPoints = [
  "אנחנו דואגים להכל — אתם רק תקבלו עדכונים על התקדמות התיק",
  "מומחיות עמוקה בניווט הליכי משרד הפנים, עם שיעורי הצלחה מהגבוהים בתחום",
  "ניסיון עשיר ומוכח בפתרון מקרים מורכבים ומאתגרים",
];

const processSteps = [
  {
    icon: FileCheck2,
    title: "בדיקת המקרה ובניית אסטרטגיה",
    text: "נבחן את נסיבות הקשר, המסמכים והסטטוס הקיים ונבנה מסלול משפטי מדויק.",
  },
  {
    icon: Landmark,
    title: "הכנת התיק מול רשות האוכלוסין",
    text: "נרכז את הראיות, הטפסים והמסמכים ונכין אתכם לראיונות ולכל שלב בהליך.",
  },
  {
    icon: ShieldCheck,
    title: "ליווי עד להסדרת המעמד",
    text: "נייצג אתכם מול הרשויות, נטפל בדרישות נוספות ונלווה אתכם עד לקבלת ההחלטה.",
  },
];

const teamHighlights = [
  {
    icon: Scale,
    title: "עורכי דין מובילים בתחום ההגירה",
    text: "ידע משפטי מעמיק וניסיון מעשי בהליכים מול רשות האוכלוסין ומשרד הפנים.",
  },
  {
    icon: Languages,
    title: "שירות רב־לשוני למשפחות בינלאומיות",
    text: "תקשורת ברורה ורגישה בעברית ובשפות נוספות, לכל אורך ההליך.",
  },
  {
    icon: HeartHandshake,
    title: "ליווי אישי בתהליך רגיש",
    text: "זמינות, שקיפות והכנה יסודית כדי שתדעו מה צפוי בכל שלב.",
  },
];

export function IsraelMigrationPage() {
  const [storySlide, setStorySlide] = useState(0);

  useEffect(() => {
    void i18n.changeLanguage("he");
    document.documentElement.lang = "he";
    document.documentElement.dir = "rtl";
    document.documentElement.classList.add("german-page-active");
    document.body.classList.add("german-page-active");
    document.title = "הסדרת מעמד לבן או בת זוג בישראל | דקר, פקס ושות׳";

    return () => {
      document.documentElement.classList.remove("german-page-active");
      document.body.classList.remove("german-page-active");
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStorySlide((current) => (current + 1) % 3);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  const changeStorySlide = (direction: 1 | -1) => {
    setStorySlide((current) => (current + direction + 3) % 3);
  };

  const scrollToForm = () => {
    const form = document.getElementById("israel-migration-form");
    if (!form) return;
    const headerHeight =
      document.querySelector("header")?.getBoundingClientRect().height ?? 0;
    window.scrollTo({
      top:
        window.scrollY +
        form.getBoundingClientRect().top -
        headerHeight -
        28,
      behavior: "smooth",
    });
  };

  return (
    <div
      dir="rtl"
      className="german-page min-h-screen bg-[#0d2238] text-[#171717]"
    >
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
            className="hidden items-center justify-center gap-10 lg:flex"
          >
            <a href="#about" className="text-base font-medium text-white/75 transition hover:text-white">
              הסדרת מעמד
            </a>
            <a href="#team" className="text-base font-medium text-white/75 transition hover:text-white">
              הצוות שלנו
            </a>
            <a href="#video" className="text-base font-medium text-white/75 transition hover:text-white">
              סרטוני הסבר
            </a>
            <a href="#process" className="text-base font-medium text-white/75 transition hover:text-white">
              התהליך
            </a>
          </nav>
          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex w-auto items-center gap-1.5 rounded-full bg-[#2d6f95] px-3.5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#071522]/20 transition hover:-translate-y-0.5 hover:bg-[#245a79] sm:px-5"
          >
            <span className="sm:hidden">בדיקת המקרה</span>
            <span className="hidden sm:inline">בדיקת התאמה ללא התחייבות</span>
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
            src="/israel-migration-hero.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center opacity-60"
            loading="eager"
            fetchPriority="high"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#071727]/95 via-[#0d2238]/78 to-[#0d2238]/55" />
          <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-4 sm:px-8 sm:pb-20 sm:pt-6 lg:pb-24 lg:pt-8">
            <div className="mx-auto max-w-4xl text-center">
              <ScrollReveal>
                <h1 className="font-sans text-[2.55rem] font-extrabold leading-tight sm:text-[3.25rem] lg:text-[4rem]">
                  קבלו אזרחות ישראלית
                  <span className="block text-[#d8bd83]">לבן או בת הזוג</span>
                </h1>
                <p className="mt-4 font-sans text-2xl font-extrabold text-[#d8bd83] sm:text-3xl">
                  99% הצלחה
                </p>
                <span className="mt-4 inline-flex rounded-full border border-[#d8bd83]/35 bg-[#d8bd83]/10 px-4 py-1.5 text-sm font-bold text-[#e2c994]">
                  בדיקת מקרה ראשונית ללא התחייבות
                </span>
              </ScrollReveal>

              <div className="mx-auto mt-8 max-w-3xl">
                {heroPoints.map((point, index) => (
                  <ScrollReveal key={point} delay={80 + index * 60}>
                    <div className="flex items-center justify-center gap-4">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#d8bd83] text-[#0d2238]">
                        <Check className="h-5 w-5" strokeWidth={3} aria-hidden />
                      </span>
                      <span className={`py-3.5 text-center text-base font-medium sm:text-lg ${index < heroPoints.length - 1 ? "border-b border-white/[0.09]" : ""}`}>
                        {point}
                      </span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={260}>
                <div className="mt-8 flex items-center justify-center gap-5 border-t border-white/15 pt-6">
                  <p className="text-lg font-bold leading-7 sm:text-xl">
                    משרד דקר, פקס, לוי — בדיוק עורכי הדין שחיפשתם
                  </p>
                  <img src={dunsLogo} alt="Duns 100" className="h-20 w-auto object-contain sm:h-24" />
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={160}>
              <div className="relative mx-auto mt-12 w-full text-white sm:rounded-3xl sm:border sm:border-white/10 sm:bg-white/[0.06] sm:p-7 sm:shadow-2xl sm:shadow-[#071522]/20 sm:backdrop-blur-sm">
                <ContactForm
                  id="israel-migration-form"
                  variant="minimal"
                  sourceCode={ISRAEL_MIGRATION_SOURCE_CODE}
                  stableCountrySelect
                  hideHeader
                  className="german-lead-form german-inline-form scroll-mt-36"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section
          id="about"
          className="german-transition-rounded relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
        >
          <div className="absolute inset-0 german-story-bg" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16" dir="ltr">
            <ScrollReveal variant="fade-right">
              <div
                className="relative"
                onWheel={(event) => {
                  if (
                    event.shiftKey ||
                    Math.abs(event.deltaX) > Math.abs(event.deltaY)
                  ) {
                    changeStorySlide(event.deltaX + event.deltaY > 0 ? 1 : -1);
                  }
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#dce8ef] via-[#eef3f6] to-[#cad9e2] shadow-[0_22px_55px_rgba(13,34,56,0.14)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(45,111,149,0.2),transparent_40%)]" />
                  <div className="absolute inset-0 grid place-items-center text-center text-[#245a79]">
                    <div key={storySlide} className="animate-in fade-in duration-500">
                      <Images className="mx-auto h-14 w-14 opacity-60" strokeWidth={1.5} aria-hidden />
                      <p className="mt-3 text-sm font-bold">
                        תמונת לקוח {storySlide + 1} תתווסף בקרוב
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => changeStorySlide(-1)}
                    aria-label="לתמונה הקודמת"
                    className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#245a79] shadow-lg backdrop-blur transition hover:bg-white"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => changeStorySlide(1)}
                    aria-label="לתמונה הבאה"
                    className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#245a79] shadow-lg backdrop-blur transition hover:bg-white"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden />
                  </button>
                </div>
                <div className="mt-5 flex items-center justify-center gap-2.5">
                  {[0, 1, 2].map((slide) => (
                    <button
                      key={slide}
                      type="button"
                      onClick={() => setStorySlide(slide)}
                      aria-label={`מעבר לתמונה ${slide + 1}`}
                      aria-current={storySlide === slide}
                      className={`h-2.5 rounded-full transition-all ${
                        storySlide === slide
                          ? "w-8 bg-[#2d6f95]"
                          : "w-2.5 bg-[#2d6f95]/25 hover:bg-[#2d6f95]/45"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" className="text-right" delay={100}>
              <div dir="rtl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#2d6f95]/10 px-5 py-2.5 text-base font-bold text-[#245a79] sm:text-lg">
                  <UsersRound className="h-5 w-5" aria-hidden />
                  זוגיות בינלאומית, ליווי ישראלי
                </span>
                <h2 className="mt-5 font-sans text-3xl font-extrabold leading-tight sm:text-4xl">
                  הסדרת מעמד לבן זוג זר בישראל
                </h2>
                <p className="mt-5 text-lg leading-8 text-[#5d6c79]">
                  עם למעלה משני עשורים של ניסיון וידע מעמיק בתחום דיני ההגירה,
                  משרדנו מוביל בהצלחה מאות תיקים של איחוד משפחות והסדרת מעמד.
                  אנחנו מכירים את הנהלים, הדרישות והמורכבות של כל תיק — ומנהלים
                  את ההליך עבורכם באופן יסודי, שקוף ואישי.
                </p>
                <p className="mt-5 font-bold leading-7 text-[#245a79]">
                  אנו מבינים שההתמודדות מול רשויות ההגירה יכולה להיות מורכבת
                  ומתישה. לכן אנחנו כאן.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="team" className="german-transition-diagonal scroll-mt-24 bg-white pb-20 pt-28 sm:pb-28 sm:pt-36">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
            <ScrollReveal variant="fade-right">
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#2d6f95]/15 to-[#d8bd83]/15 blur-2xl" />
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-[0_24px_65px_rgba(13,34,56,0.18)]">
                  <img src={teamPhoto} alt="צוות משרד עורכי הדין דקר, פקס ושות׳" className="h-full w-full object-cover" loading="lazy" />
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fade-left" delay={100}>
              <div className="text-start">
                <p className="font-bold text-[#2d6f95]">הצוות שמאחורי התיק שלכם</p>
                <h2 className="mt-3 font-sans text-3xl font-extrabold leading-tight text-[#172b3d] sm:text-4xl">
                  משרד דקר, פקס ושות׳
                </h2>
                <p className="mt-5 text-lg font-bold leading-8 text-[#34495d]">
                  הסדרת מעמד חוקי עבור בני זוג זרים של ישראלים
                </p>
                <p className="mt-3 text-lg leading-8 text-[#5d6c79]">
                  פנו אלינו במידה ואתם מבקשים להשלים הסדרת מעמד חוקי לבן או בת
                  זוג בישראל. שלבי ההליך המדורג, הראיונות, כנות הקשר והמסמכים
                  מטופלים אצלנו כתהליך משפטי אחד, מסודר ומדויק.
                </p>
                <div className="mt-8 space-y-6">
                  {teamHighlights.map(({ icon: Icon, title, text }, index) => (
                    <div key={title} className={`flex items-start gap-4 ${index ? "border-t border-[#dce3e8] pt-6 sm:border-0 sm:pt-0" : ""}`}>
                      <Icon className="mt-0.5 h-7 w-7 shrink-0 text-[#2d6f95]" strokeWidth={1.8} aria-hidden />
                      <div>
                        <h3 className="font-sans text-lg font-extrabold text-[#172b3d]">{title}</h3>
                        <p className="mt-1 leading-7 text-[#657482]">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="video" className="german-transition-notch scroll-mt-24 bg-[#0a1930] px-5 pb-36 pt-36 text-white sm:px-8 sm:pb-44 sm:pt-44">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal className="text-center">
              <p className="text-base font-bold tracking-wide text-[#d8bd83] sm:text-lg">
                מידע מעורכי דין המתמחים בהגירה ומעמד
              </p>
              <h2 className="mt-3 font-sans text-3xl font-extrabold sm:text-4xl">
                מהו ההליך המדורג להסדרת מעמד בן זוג זר בישראל?
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-white/70">
                צפו בהסברים על הסדרת מעמד, ראיונות כנות קשר והדרך להתנהל נכון מול רשות האוכלוסין.
              </p>
            </ScrollReveal>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {[
                ["c0pbHb1e5YI", "הסדרת מעמד לבן זוג זר בישראל"],
                ["vWD2OZwOnAg", "הליך מדורג וראיונות מול משרד הפנים"],
              ].map(([videoId, title], index) => (
                <ScrollReveal key={videoId} delay={120 + index * 60}>
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
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={240} className="mt-10 text-center">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 rounded-full bg-[#2d6f95] px-7 py-3.5 font-bold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#367fa6]"
              >
                בדקו מה הצעד הבא עבורכם
                <ArrowLeft className="h-5 w-5" aria-hidden />
              </button>
            </ScrollReveal>
          </div>
        </section>

        <section
          id="process"
          className="relative z-10 -mt-10 scroll-mt-24 overflow-hidden rounded-tl-[5rem] rounded-tr-[1.5rem] bg-[#e8ebef] py-28 text-[#172b3d] sm:-mt-14 sm:rounded-tl-[10rem] sm:rounded-tr-[3.5rem] sm:py-36"
        >
          <img
            src="/israel-migration-process.png"
            alt=""
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-[70%] object-cover object-center opacity-[0.22] mix-blend-multiply [mask-image:linear-gradient(to_right,black_0%,black_58%,transparent_100%)]"
            loading="lazy"
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#e8ebef] via-[#e8ebef]/75 to-transparent" />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <ScrollReveal className="ml-auto max-w-2xl text-right">
              <span className="inline-flex rounded-full border border-[#2d6f95]/15 bg-[#2d6f95]/10 px-4 py-2 text-sm font-bold text-[#245a79]">
                מסלול משפטי ברור, בלי סימני שאלה
              </span>
              <h2 className="mt-5 font-sans text-3xl font-extrabold leading-tight sm:text-5xl">
                הדרך להסדרת המעמד
                <span className="block text-[#2d6f95]">בנויה משלושה צעדים</span>
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#5d6c79]">
                אנחנו מרכזים את ההליך, מכינים אתכם מראש ומנהלים את הקשר מול
                הרשויות — כך שתדעו בכל רגע מה הושלם ומהו השלב הבא.
              </p>
            </ScrollReveal>

            <div className="relative mt-16 grid gap-7 md:grid-cols-3 md:gap-5">
              {processSteps.map(({ icon: Icon, title, text }, index) => (
                <ScrollReveal key={title} delay={index * 100} className="relative z-10">
                  <article
                    className={`group relative h-full overflow-hidden border border-white/75 bg-white/70 p-7 shadow-[0_24px_55px_rgba(13,34,56,0.12)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#2d6f95]/30 hover:bg-white/85 ${
                      index === 0
                        ? "rounded-[3.5rem_0.75rem_3.5rem_1rem]"
                        : index === 1
                          ? "rounded-[0.75rem_3.5rem_0.75rem_3.5rem]"
                          : "rounded-[3.5rem_1rem_3.5rem_0.75rem]"
                    }`}
                  >
                    <span
                      className="pointer-events-none absolute -top-2 right-5 font-sans text-[6.5rem] font-black leading-none text-[#2d6f95]/[0.08]"
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <div className="relative z-10 flex justify-end">
                      <Icon
                        className="h-11 w-11 text-[#2d6f95]"
                        strokeWidth={1.7}
                        aria-hidden
                      />
                    </div>
                    <h3 className="relative z-10 mt-7 font-sans text-xl font-extrabold text-[#172b3d]">
                      {title}
                    </h3>
                    <p className="relative z-10 mt-3 leading-7 text-[#5d6c79]">{text}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-20 bg-[#163b59] px-5 py-16 text-white sm:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal className="text-center">
              <h2 className="font-sans text-3xl font-extrabold">
                לבדיקת המקרה שלכם, השאירו פרטים ונחזור אליכם
              </h2>
              <p className="mt-3 text-lg text-white/80">
                ספרו לנו בקצרה על הזוגיות והסטטוס הנוכחי ונבחן את הצעד הבא.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="mt-10 sm:rounded-3xl sm:border sm:border-white/10 sm:bg-white/[0.06] sm:p-7 sm:shadow-2xl sm:shadow-[#071522]/15 sm:backdrop-blur-sm">
                <ContactForm
                  id="israel-migration-bottom-form"
                  variant="minimal"
                  sourceCode={ISRAEL_MIGRATION_SOURCE_CODE}
                  stableCountrySelect
                  hideHeader
                  className="german-lead-form german-inline-form"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer variant="migration" />
      <GermanContactFab language="he" topic="israel-migration" />
    </div>
  );
}
