import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { sectionBlurVariants, typographyVariants } from "@/lib/variants";
import { useTranslation } from "react-i18next";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn, formatCurrency } from "@/lib/utils";
import { FieldError } from "@/components/ui/field";
import TokenSelect from "./TokenSelect";
import {
  Controller,
  useFormContext,
  type ControllerRenderProps,
} from "react-hook-form";
import { useGetTokensPrices } from "@/apis/queryHook";
import {
  TRADING_FEE_PERCENTAGE,
  type TConvertSchema,
} from "./TradePanel.config";
import type { ChangeEvent } from "react";

type TAmountInputProps = {
  type: "from" | "to";
  className?: string;
  placeholder?: string;
};

function AmountInput({ type, className, placeholder }: TAmountInputProps) {
  const { t } = useTranslation();
  const { control, setValue, getValues } = useFormContext();
  const { isPending } = useGetTokensPrices();

  const handleAmountChange =
    (
      field: ControllerRenderProps<TConvertSchema, "from.amount" | "to.amount">
    ) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value === "" ? null : Number(e.target.value);
      const { onChange } = field;

      onChange(value);

      if (type === "to") {
        return;
      }

      if (!value) {
        setValue("to.amount", null);
        return;
      }

      const exchangeRate = getValues("exchangeRate");

      const convertedAmount =
        value * exchangeRate * (1 - TRADING_FEE_PERCENTAGE);

      setValue(
        "to.amount",
        Number(convertedAmount.toFixed(convertedAmount > 1000 ? 2 : 5))
      );
    };

  return (
    <Controller
      control={control}
      name={`${type}.amount`}
      render={({ field, fieldState: { error } }) => (
        <Card
          className={sectionBlurVariants({ className: cn("gap-4", className) })}
        >
          <CardHeader>
            <div className="flex items-center justify-between gap-6">
              <span className={typographyVariants({ className: "text-sm" })}>
                {type === "from" ? t("TRADE_PANEL/FROM") : t("TRADE_PANEL/TO")}
              </span>

              {type === "from" && (
                <Controller
                  control={control}
                  name={`${type}.token`}
                  render={({ field: { value: token } }) => {
                    return (
                      <Controller
                        control={control}
                        name="availableAmount"
                        render={({ field: { value: availableAmount } }) => (
                          <span
                            className={typographyVariants({
                              className: "text-sm opacity-70",
                            })}
                          >
                            {t("TRADE_PANEL/AVAILABLE", {
                              amount: formatCurrency(availableAmount),
                              token,
                            })}
                          </span>
                        )}
                      />
                    );
                  }}
                />
              )}
            </div>
          </CardHeader>

          <CardContent>
            <InputGroup className="border-muted/30 h-16">
              <InputGroupInput
                placeholder={placeholder}
                className={typographyVariants({
                  highlight: true,
                  className: [
                    "text-right placeholder:text-muted/70 dark:placeholder:text-muted-foreground text-lg! sm:text-2xl! lg:text-3xl! h-full",
                    "appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]",
                    type === "to" &&
                      "disabled:opacity-100! opacity-70 cursor-not-allowed",
                  ],
                })}
                type="number"
                value={field.value ?? ""}
                disabled={type === "to" || isPending}
                onChange={handleAmountChange(
                  field as unknown as ControllerRenderProps<
                    TConvertSchema,
                    "from.amount" | "to.amount"
                  >
                )}
              />
              <InputGroupAddon>
                <TokenSelect type={type} />
              </InputGroupAddon>
            </InputGroup>
          </CardContent>

          <CardFooter className="flex-col items-end">
            <ConvertToUsd type={type} amount={field.value} />
            {type === "from" && (
              <FieldError
                errors={[error]}
                className="text-sm font-semibold h-5"
              />
            )}
          </CardFooter>
        </Card>
      )}
    />
  );
}

const ConvertToUsd = ({
  type,
  amount,
}: {
  type: "from" | "to";
  amount: number | null;
}) => {
  const { control } = useFormContext();
  const { data } = useGetTokensPrices();

  const getConvertedToUsd = (token: string) => {
    if (!data) {
      return "";
    }

    const tokenData = data?.[token];
    const usdData = data?.["USD"];

    if (!tokenData || !usdData || !amount) {
      return "";
    }

    const rate = tokenData.price / usdData.price;

    return formatCurrency(amount * rate, "≈ $ ");
  };

  return (
    <Controller
      control={control}
      name={`${type}.token`}
      render={({ field: { value: token } }) => (
        <p className={typographyVariants({ className: "text-sm mb-1 h-5" })}>
          {getConvertedToUsd(token)}
        </p>
      )}
    />
  );
};

export default AmountInput;
