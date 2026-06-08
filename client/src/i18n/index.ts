import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "@/locales/en.json";
import he from "@/locales/he.json";

export const supportedLanguages = ["en", "he"] as const;
export type AppLanguage = (typeof supportedLanguages)[number];

function applyDocumentLanguage(lng: string) {
  const lang = lng.startsWith("he") ? "he" : "en";
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      he: { translation: he },
    },
    fallbackLng: "en",
    lng: "he",
    supportedLngs: [...supportedLanguages],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
      lookupLocalStorage: "dp-language",
    },
  })
  .then(() => {
    applyDocumentLanguage(i18n.language);
  });

i18n.on("languageChanged", applyDocumentLanguage);

export default i18n;
