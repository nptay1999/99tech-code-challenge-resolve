import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TriangleAlert, X } from "lucide-react";
import type { ComponentProps } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import TransferBanner from "./TransferBanner";
import { Separator } from "@/components/ui/separator";
import {
  TRADE_PANEL_DEFAULT_VALUES,
  TRADING_FEE_PERCENTAGE,
  type TConvertSchema,
} from "@/components/TradePanel/TradePanel.config";
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/utils";
import { useGetTokensPrices, useSwapTokens } from "@/apis/queryHook";
import { Spinner } from "@/components/ui/spinner";

type TConfirmModalProps = ComponentProps<typeof DialogPrimitive.Root> & {
  swapInfo?: TConvertSchema;
  onClose: (type: "cancel" | "submit") => void;
};

function ConfirmModal({ swapInfo, onClose, ...props }: TConfirmModalProps) {
  const { t } = useTranslation();
  const { data } = useGetTokensPrices();
  const { mutate: swapTokens, isPending } = useSwapTokens();

  const fromToken =
    swapInfo?.from.token ?? TRADE_PANEL_DEFAULT_VALUES.from.token;
  const fromAmount = swapInfo?.from.amount ?? 0;
  const toToken = swapInfo?.to.token ?? TRADE_PANEL_DEFAULT_VALUES.to.token;
  const toAmount = swapInfo?.to.amount ?? 0;
  const exchangeRate = swapInfo?.exchangeRate ?? 0;
  const providerFees = fromAmount * exchangeRate * TRADING_FEE_PERCENTAGE;

  const getConvertedToUsd = (token: string, amount: number) => {
    if (!data) {
      return formatCurrency(0, "≈ $ ");
    }

    const tokenData = data?.[token];
    const usdData = data?.["USD"];

    if (!tokenData || !usdData || !amount) {
      return formatCurrency(0, "≈ $ ");
    }

    const rate = tokenData.price / usdData.price;

    return formatCurrency(amount * rate, "≈ $ ");
  };

  const handleConfirmSwap = () => {
    swapTokens(
      {
        fromToken,
        toToken,
        fromAmount,
        exchangeRate,
      },
      {
        onSuccess: () => {
          onClose?.("submit");
        },
      }
    );
  };

  return (
    <Dialog {...props}>
      <DialogContent
        className="sm:max-w-lg bg-background/70 backdrop-blur-lg"
        showCloseButton={false}
      >
        <DialogHeader className="flex-row justify-between">
          <DialogTitle className="text-2xl font-semibold">
            {t("CONFIRM_MODAL/CONFIRM_SWAP", {
              from: fromToken,
              to: toToken,
            })}
          </DialogTitle>

          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-full"
              onClick={() => onClose("cancel")}
            >
              <X />
            </Button>
          </DialogClose>
        </DialogHeader>

        <main className="py-6">
          <TransferBanner loading={isPending} className="mb-10" />

          <Separator className="mb-6" />

          <section className="flex align-top justify-between gap-4 mb-6">
            <span className="text-foreground/80">
              {t("CONFIRM_MODAL/SWAP")}
            </span>

            <div className="flex flex-col gap-1">
              <span className="font-medium text-lg text-foreground">
                {formatCurrency(fromAmount)} {fromToken}
              </span>

              <span className="text-foreground/80 text-sm text-right">
                {getConvertedToUsd(fromToken, fromAmount)}
              </span>
            </div>
          </section>

          <section className="flex align-top justify-between gap-4 mb-6">
            <span className="text-foreground/80">
              {t("CONFIRM_MODAL/MINIMUM_RECEIVE")}
            </span>

            <div className="flex flex-col gap-1">
              <span className="font-medium text-lg text-foreground">
                {formatCurrency(toAmount)} {toToken}
              </span>

              <span className="text-foreground/80 text-sm text-right">
                {getConvertedToUsd(toToken, toAmount)}
              </span>
            </div>
          </section>

          <Separator className="mb-6" />

          <section className="flex align-top justify-between gap-4 mb-6">
            <span className="text-foreground/80">
              {t("CONFIRM_MODAL/FEES")}
            </span>

            <div className="flex flex-col gap-1">
              <span className="text-foreground/80 text-sm text-right">
                {TRADING_FEE_PERCENTAGE * 100}%
              </span>
            </div>
          </section>

          <section className="flex align-top justify-between gap-4 mb-10">
            <span className="text-foreground/80">
              {t("CONFIRM_MODAL/PROVIDER_FEES")}
            </span>

            <div className="flex flex-col gap-1">
              <span className="text-foreground text-sm text-right font-medium">
                {formatCurrency(providerFees)} {fromToken}{" "}
                <span className="text-foreground/80 font-normal">
                  ({getConvertedToUsd(fromToken, providerFees)})
                </span>
              </span>
            </div>
          </section>

          <Alert variant="warning">
            <TriangleAlert className="mt-0.5" />
            <AlertDescription>
              {t(
                "CONFIRM_MODAL/HIGHER_FEES_MAY_APPLY_TO_SWAPS_WHEN_NETWORK_IS_CONGESTED"
              )}
            </AlertDescription>
          </Alert>
        </main>

        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="secondary"
            className="w-full font-semibold text-lg h-12 rounded-full"
            disabled={isPending}
            onClick={handleConfirmSwap}
          >
            {isPending && <Spinner />}
            {t("CONFIRM_MODAL/CONFIRM")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmModal;
