import { useGetTokensPrices } from "@/apis/queryHook";
import { typographyVariants } from "@/lib/variants";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";
import { Controller, useFormContext } from "react-hook-form";
import type { TConvertSchema } from "./TradePanel.config";
import ValueRenderer from "./ValueRenderer";
import { formatCurrency } from "@/lib/utils";

function ExchangeRate() {
  const { t } = useTranslation();
  const { control } = useFormContext<TConvertSchema>();
  const { isPending } = useGetTokensPrices();

  const formatExchangeRate = (rate: number) => {
    return formatCurrency(rate);
  };

  return (
    <Controller
      name="exchangeRate"
      control={control}
      render={({ field: { value } }) => {
        return (
          <div
            className={typographyVariants({
              className:
                "text-center text-xs sm:text-sm flex items-center justify-center gap-1",
            })}
          >
            <span>{t("TRADE_PANEL/EXCHANGE_RATE")}:</span>

            {isPending ? (
              <Skeleton className="w-30 h-5 rounded-[3px] inline-block" />
            ) : (
              <span
                className={typographyVariants({
                  highlight: true,
                  className: "font-medium",
                })}
              >
                1 <ValueRenderer control={control} name="from.token" /> ={" "}
                {formatExchangeRate(value)}{" "}
                <ValueRenderer control={control} name="to.token" />
              </span>
            )}
          </div>
        );
      }}
    />
  );
}

export default ExchangeRate;
