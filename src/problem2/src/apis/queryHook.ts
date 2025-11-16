import { getTokensPrices, swapTokens } from "@/apis/queryService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API_URL from "./url";
import type { TQueryConfigs, TTokenPriceResponse } from "@/types";
import { toast } from "sonner";
import { t } from "i18next";

export const useGetTokensPrices = (
  configs?: TQueryConfigs<TTokenPriceResponse[]>
) => {
  return useQuery({
    queryKey: [API_URL.GET_TOKENS_PRICES],
    queryFn: (): Promise<TTokenPriceResponse[]> =>
      new Promise((resolve) =>
        setTimeout(() => resolve(getTokensPrices()), 1000)
      ),
    select: (data) => {
      return (data || []).reduce((acc, item) => {
        acc[item.currency] = item;
        return acc;
      }, {} as Record<string, TTokenPriceResponse>);
    },
    ...configs,
  });
};

export const useSwapTokens = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [API_URL.SWAP_TOKENS],
    mutationFn: swapTokens,
    onSuccess: () => {
      toast.success(t("CONFIRM_MODAL/CURRENCY_SWAPPED_SUCCESSFULLY"));
      queryClient.invalidateQueries({ queryKey: [API_URL.GET_TOKENS_PRICES] });
    },
  });
};
