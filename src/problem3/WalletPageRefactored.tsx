import React, { useMemo } from "react";
import WalletRow from "./WalletRow";
import { useWalletBalances } from "@/hooks/useWalletBalances";
import { usePrices } from "@/hooks/usePrices";
import classes from "./WalletPage.module.css";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Add missing blockchain property
}

/** Using interface inheritance for formatted wallet balance */
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

const blockchainPriority: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

/** Move on this function outside component to avoid re-creation on each render
 *  Remove switch case and use object lookup for better readability
 */
const getPriority = (blockchain: string): number => {
  const priority = blockchainPriority[blockchain];

  // early return for undefined priority
  if (!priority) {
    return -99;
  }

  return priority;
};

/** Extends correct React div props without children
 *  Renaming Props to WalletPageProps for clarity
 */
interface WalletPageProps
  extends Omit<React.ComponentProps<"div">, "children"> {}

/** Remove React.FC<T> Because of some problems about Typing defaultProps */
const WalletPage = (props: WalletPageProps) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);

        // Fixed logic for shorter and more readable code
        return balancePriority > -99 && balance.amount <= 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);

        // Simplified and fixed: directly return the difference for sorting
        return rightPriority - leftPriority;
      });
  }, [balances]); // Removed 'prices' from dependencies

  /** Remove `formattedBalances` that is unnecessary formatting logic from render */

  /** Move `rows` to the Render `return jsx` below to avoid inline mapping in JSX  */

  return (
    <div {...props}>
      {sortedBalances.map((balance: WalletBalance) => {
        // get formatted amount in one map to avoid multiple formatting
        const formattedAmount = balance.amount.toFixed();
        const usdValue = prices[balance.currency] * balance.amount;

        return (
          <WalletRow
            className={classes.row}
            key={balance.currency} // Better key, avoid using index
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={formattedAmount}
          />
        );
      })}
    </div>
  );
};

export default WalletPage;
