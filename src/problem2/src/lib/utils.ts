import { clsx, type ClassValue } from "clsx";
import currency from "currency.js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number, prefix?: string) => {
  return currency(amount, {
    symbol: prefix ?? "",
    precision: amount > 1000 ? 2 : 5,
  }).format();
};
