import TradePanelLeft from "./TradePanelLeft";
import TradePanelRight from "./TradePanelRight";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createConvertSchema,
  TRADE_PANEL_DEFAULT_VALUES,
  type TConvertSchema,
} from "./TradePanel.config";
import { useGetTokensPrices } from "@/apis/queryHook";
import { useEffect, useId, useState } from "react";
import ConfirmModal from "../ConfirmModal";

function TradePanel() {
  const formId = useId();
  const [swapData, setSwapData] = useState<TConvertSchema>();
  const { data, isPending } = useGetTokensPrices({
    cacheTime: 0,
  });
  const form = useForm({
    resolver: zodResolver(createConvertSchema()),
    defaultValues: TRADE_PANEL_DEFAULT_VALUES,
    mode: "onChange",
  });

  const initExchangeRate = () => {
    const defaultFromToken = TRADE_PANEL_DEFAULT_VALUES.from.token;
    const defaultToToken = TRADE_PANEL_DEFAULT_VALUES.to.token;

    const fromTokenPrice = data?.[defaultFromToken]?.price ?? 1;
    const toTokenPrice = data?.[defaultToToken]?.price ?? 1;

    const exchangeRate = fromTokenPrice / toTokenPrice;

    form.setValue("exchangeRate", exchangeRate);
  };

  useEffect(() => {
    if (data && !isPending) {
      initExchangeRate();
    }
  }, [data, isPending]);

  const handleSubmit: SubmitHandler<TConvertSchema> = (data) => {
    setSwapData(data);
  };

  return (
    <div className="w-full lg:mt-26">
      <FormProvider {...form}>
        <form
          id={formId}
          onSubmit={form.handleSubmit(handleSubmit, console.error)}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <TradePanelLeft />
            </div>

            <div>
              <TradePanelRight />
            </div>
          </div>
        </form>
      </FormProvider>
      <ConfirmModal
        swapInfo={swapData}
        open={Boolean(swapData)}
        onClose={(type: "cancel" | "submit") => {
          setSwapData(undefined);

          if (type === "submit") {
            form.reset();
            initExchangeRate();
          }
        }}
      />
    </div>
  );
}

export default TradePanel;
