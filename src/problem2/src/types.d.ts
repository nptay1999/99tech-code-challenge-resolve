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

export type TTradePanelState = {
  fromToken: TTokenPriceResponse;
  setFromToken: (token: TTokenPriceResponse) => void;
  toToken: TTokenPriceResponse;
  setToToken: (token: TTokenPriceResponse) => void;
  tokenPrices: Record<string, TTokenPriceResponse>;
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

export type TTokenPriceResponse = {
  currency: string;
  date: string;
  price: number;
};

export type TQueryConfigs<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  "queryKey" | "queryFn"
>;
