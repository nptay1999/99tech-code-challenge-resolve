import { sectionBlurVariants } from "@/lib/variants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TokenDefault } from "@/assets";
import { useGetTokensPrices } from "@/apis/queryHook";
import { Skeleton } from "@/components/ui/skeleton";
import { Controller, useFormContext } from "react-hook-form";
import {
  AVAILABLE_TOKENS,
  TRADE_PANEL_DEFAULT_VALUES,
  type TAvailableTokens,
} from "./TradePanel.config";

type TTokenSelectProps = {
  type: "from" | "to";
};

const TokenSelect = ({ type }: TTokenSelectProps) => {
  const form = useFormContext();
  const { data, isPending } = useGetTokensPrices();
  const defaultFromToken = TRADE_PANEL_DEFAULT_VALUES.from.token;
  const defaultToToken = TRADE_PANEL_DEFAULT_VALUES.to.token;

  const defaultSelectedToken =
    type === "from" ? defaultFromToken : defaultToToken;

  const handleSelectChange =
    (onChange: (...event: any[]) => void) => (val: string) => {
      onChange(val);

      if (!data) {
        return;
      }

      const fromToken = type === "from" ? val : form.getValues("from.token");
      const toToken = type === "to" ? val : form.getValues("to.token");

      const fromTokenPrice = data[fromToken]?.price ?? 1;
      const toTokenPrice = data[toToken]?.price ?? 1;

      const exchangeRate = fromTokenPrice / toTokenPrice;

      form.setValue(
        "availableAmount",
        AVAILABLE_TOKENS[fromToken as TAvailableTokens] ?? 0
      );
      form.setValue("from.amount", null);
      form.setValue("to.amount", null);
      form.setValue("exchangeRate", exchangeRate);
    };

  return (
    <>
      {isPending ? (
        <Skeleton className="h-8 w-30 rounded-sm inline-block" />
      ) : (
        <Controller
          name={type === "from" ? "from.token" : "to.token"}
          control={form.control}
          render={({ field: { onChange, value } }) => {
            return (
              <Select
                value={value}
                onValueChange={handleSelectChange(onChange)}
                defaultValue={defaultSelectedToken}
              >
                <SelectTrigger
                  size="sm"
                  className="py-1 border-muted-foreground min-w-30 border-0 text-muted dark:text-muted-foreground dark:bg-transparent dark:hover:bg-transparent focus-visible:ring-0 shadow-none"
                >
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent className={sectionBlurVariants()}>
                  {Object.values(data ?? {}).map((option) => (
                    <SelectItem
                      key={option.currency}
                      value={option.currency}
                      className="text-muted focus:bg-muted-foreground/20 focus:text-muted"
                      checkedIconClassName="text-muted"
                    >
                      <img
                        src={`/tokens/${option.currency}.svg`}
                        alt={option.currency}
                        onError={(e) => (e.currentTarget.src = TokenDefault)}
                        className="size-6 bg-white rounded-full"
                      />
                      <span>{option.currency}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }}
        />
      )}
    </>
  );
};

export default TokenSelect;
