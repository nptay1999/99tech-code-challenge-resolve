import httpRestService from "@/apis/httpService";
import API_URL from "@/apis/url";
import type { TTokenPriceResponse } from "@/types";

export const getTokensPrices = async () => {
  return httpRestService.get<Array<TTokenPriceResponse>>(
    API_URL.GET_TOKENS_PRICES
  );
};

export const swapTokens = async (params: {
  fromToken: string;
  toToken: string;
  fromAmount: number;
  exchangeRate: number;
}) => {
  console.log("Swapping tokens with params:", params);
  return new Promise<{ success: boolean }>((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 2000);
  });
};
