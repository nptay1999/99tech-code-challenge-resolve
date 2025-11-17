import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sectionBlurVariants, typographyVariants } from "@/lib/variants";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import AmountInput from "./AmountInput";
import ExchangeRate from "./ExchangeRate";
import SwapButton from "./SwapButton";
import { TRADING_FEE_PERCENTAGE } from "./TradePanel.config";

function TradePanelRight() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className={cn(sectionBlurVariants())}>
        <CardHeader>
          {/* Card Header */}
          <div className="inline-flex items-center gap-2.5">
            <h2
              className={typographyVariants({
                highlight: true,
                className: "text-2xl",
              })}
            >
              {t("TRADE_PANEL/CONVERT")}
            </h2>
            <Badge className="bg-green-600 mt-1">
              {t("TRADE_PANEL/ZERO_FEES", {
                fee: TRADING_FEE_PERCENTAGE * 100,
              })}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <AmountInput type="from" placeholder="0.00002" />

          <SwapButton />

          <AmountInput type="to" className="mb-4" placeholder="0.00000" />

          <ExchangeRate />
        </CardContent>

        <CardFooter>
          {/* Preview Button */}
          <Button
            type="submit"
            size="lg"
            className={cn(
              sectionBlurVariants(),
              typographyVariants({ highlight: true }),
              "w-full text-xl opacity-80 hover:opacity-100 dark:opacity-70 dark:hover:opacity-100 h-14"
            )}
          >
            Preview
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default TradePanelRight;
