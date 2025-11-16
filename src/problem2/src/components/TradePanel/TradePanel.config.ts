import { t } from "i18next";
import { z } from "zod";

export const createConvertSchema = () =>
  z
    .object({
      availableAmount: z.number().default(0),
      from: z.object({
        token: z.string().min(1, t("VALIDATION/TOKEN_IS_REQUIRED")),
        amount: z
          .number({ message: t("VALIDATION/AMOUNT_MUST_BE_A_NUMBER") })
          .positive(t("VALIDATION/AMOUNT_MINIMUM"))
          .min(0.00002, t("VALIDATION/AMOUNT_MINIMUM"))
          .max(1000, t("VALIDATION/AMOUNT_MAXIMUM"))
          .nullable(),
      }),
      to: z.object({
        token: z.string().min(1, t("VALIDATION/TOKEN_IS_REQUIRED")),
        amount: z
          .number({ message: t("VALIDATION/AMOUNT_MUST_BE_A_NUMBER") })
          .positive(t("VALIDATION/AMOUNT_MUST_BE_GREATER_THAN_ZERO"))
          .nullable(),
      }),
      exchangeRate: z.number().min(0).default(1),
    })
    .superRefine((data, ctx) => {
      if (data.from.amount && data.from.amount > data.availableAmount) {
        ctx.addIssue({
          code: "custom",
          message: t("VALIDATION/INSUFFICIENT_FUNDS"),
          path: ["from", "amount"],
        });
      }

      if (!data.from.amount && !data.to.amount) {
        ctx.addIssue({
          code: "custom",
          message: t("VALIDATION/AMOUNT_MINIMUM"),
          path: ["from", "amount"],
        });
      }
    });

export type TConvertSchema = z.infer<ReturnType<typeof createConvertSchema>>;

export const AVAILABLE_TOKENS = {
  USD: 3_934_023.54,
  WBTC: 234.3434234,
  ETH: 3546.23,
} as const;

export const TRADE_PANEL_DEFAULT_VALUES: TConvertSchema = {
  from: { token: "USD", amount: null },
  to: { token: "ETH", amount: null },
  availableAmount: AVAILABLE_TOKENS.USD,
  exchangeRate: 1.0,
};

export type TAvailableTokens = keyof typeof AVAILABLE_TOKENS;

export const TRADING_FEE_PERCENTAGE = 0.001; // 0.1%
