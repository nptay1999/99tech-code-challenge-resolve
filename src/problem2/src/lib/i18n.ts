import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import locale files
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import de from "@/locales/de.json";
import es from "@/locales/es.json";
import cn from "@/locales/cn.json";

// Define resources with all locales
const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  de: {
    translation: de,
  },
  es: {
    translation: es,
  },
  cn: {
    translation: cn,
  },
};

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en", // fallback language if translation is missing

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    // Enable debug mode in development
    debug: false,
  });

export default i18n;
