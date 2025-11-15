import "i18next";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import de from "@/locales/de.json";
import es from "@/locales/es.json";
import cn from "@/locales/cn.json";

export type TDarkModeContext = {
  mode: "light" | "dark";
  toggleMode: () => void;
};

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    defaultNS: "en";
    resources: {
      en: typeof en;
      fr: typeof fr;
      de: typeof de;
      es: typeof es;
      cn: typeof cn;
    };
  }
}
