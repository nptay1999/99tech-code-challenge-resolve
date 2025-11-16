import { typographyVariants } from "@/lib/variants";
import { Separator } from "@/components/ui/separator";
import Trans from "@/components/Trans";
import { useTranslation } from "react-i18next";
import { useGetTokensPrices } from "@/apis/queryHook";
import { Skeleton } from "@/components/ui/skeleton";
import { useFormContext, useWatch } from "react-hook-form";
import {
  TRADING_FEE_PERCENTAGE,
  type TConvertSchema,
} from "./TradePanel.config";

const HighLightText = ({
  children,
  isLoading,
}: {
  children?: React.ReactNode;
  isLoading?: boolean;
}) => {
  if (isLoading) {
    return <Skeleton className="h-12 w-27.5 inline-block" />;
  }

  return (
    <span
      className={typographyVariants({
        highlight: true,
      })}
    >
      {children}
    </span>
  );
};

function TradePanelLeft() {
  const { t } = useTranslation();
  const { control } = useFormContext<TConvertSchema>();
  const { isPending } = useGetTokensPrices();
  const [fromToken, toToken] = useWatch<TConvertSchema>({
    control,
    name: ["from.token", "to.token"],
  });

  return (
    <div className="space-y-4 text-center lg:text-left w-fit mx-auto">
      <h1
        className={typographyVariants({
          className:
            "text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl",
        })}
      >
        <Trans
          i18nKey="TRADE_PANEL/CONVERT_FROM_TO_TOKENS"
          values={{ fromToken: fromToken, toToken: toToken }}
          components={{
            from: <HighLightText isLoading={isPending} />,
            to: <HighLightText isLoading={isPending} />,
          }}
        />
      </h1>

      {/* Feature List */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm  lg:justify-start">
        <span className="inline-flex items-center gap-1">
          <span className="text-green-500 font-semibold">
            {t("TRADE_PANEL/ZERO_FEES", { fee: TRADING_FEE_PERCENTAGE * 100 })}
          </span>
        </span>
        <div className="h-3">
          <Separator orientation="vertical" />
        </div>
        <span className={typographyVariants({})}>
          {t("TRADE_PANEL/LOWER_LIMITS")}
        </span>
        <div className="h-3">
          <Separator orientation="vertical" />
        </div>
        <span className={typographyVariants({})}>
          {t("TRADE_PANEL/SIMPLE_TRANSACTIONS")}
        </span>
      </div>
    </div>
  );
}

export default TradePanelLeft;
