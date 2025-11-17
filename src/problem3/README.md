# Problem 3: Messy React - Solution Document

## Overview

This document outlines the computational inefficiencies and anti-patterns identified in the original React component code and explains the refactored solution that addresses these issues.

---

## Issues Identified

### 1. **Missing Type Definition**

```tsx
interface WalletBalance {
  currency: string;
  amount: number;
  // Missing: blockchain property
}
```

**Problem:** The `WalletBalance` interface lacks the `blockchain` property, which is referenced throughout the component logic.

**Impact:** This causes TypeScript compilation errors and makes the code incompatible with runtime behavior.

**Solution:** Added the `blockchain: string` property to the `WalletBalance` interface.

```tsx
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
```

---

### 2. **Inefficient Interface Design**

```tsx
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}
```

**Problem:** The `FormattedWalletBalance` interface duplicates all properties from `WalletBalance` instead of extending it.

**Impact:** Increases code redundancy and maintenance overhead. Changes to `WalletBalance` require manual updates to `FormattedWalletBalance`.

**Solution:** Used TypeScript interface inheritance:

```tsx
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}
```

---

### 3. **Function Recreation on Every Render**

**Problem:** The `getPriority` function is defined inside the component body, causing it to be recreated on every render.

**Impact:** Unnecessary memory allocation and potential performance degradation in frequently re-rendering components.

**Solution:** Moved `getPriority` function outside the component scope to prevent recreation.

---

### 4. **Inefficient Priority Lookup**

```tsx
const getPriority = (blockchain: any): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};
```

**Problem:** Uses a lengthy `switch` statement with multiple cases for blockchain priority lookup.

**Impact:** Verbose code that is harder to maintain and slower to execute compared to direct object property access.

**Solution:** Replaced the switch statement with a constant object lookup using `blockchainPriority: Record<string, number>`, providing O(1) lookup time.

```tsx
const blockchainPriority: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: string): number => {
  const priority = blockchainPriority[blockchain];

  if (!priority) {
    return -99;
  }

  return priority;
};
```

---

### 5. **Weak Type Safety**

**Problem:** The `getPriority` function parameter uses the `any` type instead of `string`.

**Impact:** Eliminates TypeScript's type checking benefits and allows potential runtime errors from invalid inputs.

**Solution:** Changed parameter type from `any` to `string` for proper type safety.

---

### 6. **Variable Name Mismatch**

```tsx
balances.filter((balance: WalletBalance) => {
  const balancePriority = getPriority(balance.blockchain);
  if (lhsPriority > -99) {
    if (balance.amount <= 0) {
      return true;
    }
  }
  return false;
});
```

**Problem:** The filter logic references `lhsPriority`, but the variable is named `balancePriority`.

**Impact:** This is a critical bug that causes a runtime error (ReferenceError: lhsPriority is not defined).

**Solution:** Corrected the variable reference to use `balancePriority` consistently.

---

### 7. **Inverted Filter Logic**

```tsx
if (lhsPriority > -99) {
  if (balance.amount <= 0) {
    return true;
  }
}
return false;
```

**Problem:** The filter condition `balance.amount <= 0` keeps balances with zero or negative amounts, which is likely unintended.

**Impact:** Displays empty or negative wallet balances to users, creating a poor user experience.

**Solution:** Changed the filter logic to `balancePriority > -99 && balance.amount > 0` (assuming the intent is to show positive balances).

```tsx
return balancePriority > -99 && balance.amount <= 0;
```

---

### 8. **Overcomplicated Sorting Logic**

```tsx
.sort((lhs: WalletBalance, rhs: WalletBalance) => {
  const leftPriority = getPriority(lhs.blockchain);
  const rightPriority = getPriority(rhs.blockchain);
  if (leftPriority > rightPriority) {
    return -1;
  } else if (rightPriority > leftPriority) {
    return 1;
  }
});
```

**Problem:** The sort comparator uses verbose if-else statements to return -1, 0, or 1.

**Impact:** Reduces code readability and maintainability without performance benefits.

**Solution:** Simplified to `return rightPriority - leftPriority`, which is more concise and equally effective.

```tsx
.sort((lhs: WalletBalance, rhs: WalletBalance) => {
  const leftPriority = getPriority(lhs.blockchain);
  const rightPriority = getPriority(rhs.blockchain);

  return rightPriority - leftPriority;
});
```

---

### 9. **Missing Sort Return Value**

**Problem:** The sort function doesn't return a value when priorities are equal.

**Impact:** Can cause unpredictable sorting behavior for items with equal priority.

**Solution:** The simplified subtraction approach automatically returns 0 when priorities are equal.

---

### 10. **Incorrect useMemo Dependencies**

```tsx
const sortedBalances = useMemo(() => {
  // Codes
}, [balances, prices]);
```

**Problem:** The `prices` variable is included in the `useMemo` dependency array despite not being used in the memoized calculation.

**Impact:** Causes unnecessary recalculations whenever prices change, even though the sorting logic doesn't depend on them.

**Solution:** Removed `prices` from the dependency array, leaving only `[balances]`.

```tsx
const sortedBalances = useMemo(() => {
  // Codes
}, [balances]);
```

---

### 11. **Redundant Data Transformation**

```tsx
const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  return {
    ...balance,
    formatted: balance.amount.toFixed(),
  };
});
```

**Problem:** The code maps over `sortedBalances` twice: once to create `formattedBalances` and again to create `rows`.

**Impact:** Iterates through the array unnecessarily, doubling the computational cost for large datasets.

**Solution:** Combined both operations into a single map operation during render, eliminating the intermediate `formattedBalances` array.

```tsx
const rows = sortedBalances.map((balance: WalletBalance) => {
  const formattedAmount = balance.amount.toFixed();
  const usdValue = prices[balance.currency] * balance.amount;

  return (/** JSX */);
})
```

---

### 12. **Pre-computation of Render Logic**

**Problem:** The `rows` variable is computed outside the JSX return statement before it's needed.

**Impact:** Reduces code clarity by separating the rendering logic from the actual render output.

**Solution:** Moved the mapping logic directly into the JSX return statement for better readability and maintainability.

```tsx
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
```

---

### 13. **Type Mismatch in Mapping**

**Problem:** The code maps over `sortedBalances` (typed as `WalletBalance[]`) but types the parameter as `FormattedWalletBalance`.

**Impact:** Type inconsistency that causes TypeScript errors and confuses the expected data structure.

**Solution:** Correctly typed the map parameter as `WalletBalance` and performed formatting inline.

---

### 14. **Anti-pattern: Using Array Index as React Key**

**Problem:** Uses the array `index` as the `key` prop for list items.

**Impact:** Can cause rendering bugs when items are reordered, deleted, or inserted. React may not properly track component identity, leading to incorrect state preservation and poor performance.

**Solution:** Changed to use `balance.currency` as the key, assuming currency is unique per wallet.

---

### 15. **Incorrect Props Interface Extension**

**Problem:** The component extends `BoxProps` which is undefined, and destructures `children` from props but never uses it.

**Impact:** Runtime errors due to missing type definitions and unnecessary prop destructuring.

**Solution:** Changed to extend `Omit<React.ComponentProps<"div">, "children">` for proper HTML div props without the children prop.

---

### 16. **Unclear Props Interface Name**

**Problem:** The generic name `Props` doesn't convey the component's purpose.

**Impact:** Reduces code readability and makes the codebase harder to navigate.

**Solution:** Renamed to `WalletPageProps` for clarity and better documentation.

---

### 17. **React.FC Type Issues**

**Problem:** Uses `React.FC<Props>` which has known issues with `defaultProps` typing and adds unnecessary complexity.

**Impact:** Can cause unexpected behavior with default props and reduces type inference quality.

**Solution:** Removed `React.FC` and used regular function component declaration with typed props parameter.

---

## Summary of Improvements

The refactored solution addresses all identified issues through:

- **Type Safety**: Proper TypeScript types throughout, eliminating `any` types and adding missing properties
- **Performance Optimization**: Eliminated redundant iterations, removed unnecessary re-creations, and fixed memoization dependencies
- **Code Quality**: Simplified complex logic, improved readability, and followed React best practices
- **Bug Fixes**: Corrected variable references, fixed filter logic, and resolved type mismatches
- **Maintainability**: Better naming conventions, clear structure, and reduced code duplication

The refactored component is more efficient, type-safe, maintainable, and follows modern React and TypeScript best practices.

# Problem 3: Messy React - Solution Document

## Overview

This document outlines the computational inefficiencies and anti-patterns identified in the original React component code and explains the refactored solution that addresses these issues.

---

## Issues Identified

### 1. **Missing Type Definition**

```tsx
interface WalletBalance {
  currency: string;
  amount: number;
  // Missing: blockchain property
}
```

**Problem:** The `WalletBalance` interface lacks the `blockchain` property, which is referenced throughout the component logic.

**Impact:** This causes TypeScript compilation errors and makes the code incompatible with runtime behavior.

**Solution:** Added the `blockchain: string` property to the `WalletBalance` interface.

```tsx
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
```

---

### 2. **Inefficient Interface Design**

```tsx
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}
```

**Problem:** The `FormattedWalletBalance` interface duplicates all properties from `WalletBalance` instead of extending it.

**Impact:** Increases code redundancy and maintenance overhead. Changes to `WalletBalance` require manual updates to `FormattedWalletBalance`.

**Solution:** Used TypeScript interface inheritance:

```tsx
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}
```

---

### 3. **Function Recreation on Every Render**

**Problem:** The `getPriority` function is defined inside the component body, causing it to be recreated on every render.

**Impact:** Unnecessary memory allocation and potential performance degradation in frequently re-rendering components.

**Solution:** Moved `getPriority` function outside the component scope to prevent recreation.

---

### 4. **Inefficient Priority Lookup**

```tsx
const getPriority = (blockchain: any): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};
```

**Problem:** Uses a lengthy `switch` statement with multiple cases for blockchain priority lookup.

**Impact:** Verbose code that is harder to maintain and slower to execute compared to direct object property access.

**Solution:** Replaced the switch statement with a constant object lookup using `blockchainPriority: Record<string, number>`, providing O(1) lookup time.

```tsx
const blockchainPriority: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: string): number => {
  const priority = blockchainPriority[blockchain];

  if (!priority) {
    return -99;
  }

  return priority;
};
```

---

### 5. **Weak Type Safety**

**Problem:** The `getPriority` function parameter uses the `any` type instead of `string`.

**Impact:** Eliminates TypeScript's type checking benefits and allows potential runtime errors from invalid inputs.

**Solution:** Changed parameter type from `any` to `string` for proper type safety.

---

### 6. **Variable Name Mismatch**

```tsx
balances.filter((balance: WalletBalance) => {
  const balancePriority = getPriority(balance.blockchain);
  if (lhsPriority > -99) {
    if (balance.amount <= 0) {
      return true;
    }
  }
  return false;
});
```

**Problem:** The filter logic references `lhsPriority`, but the variable is named `balancePriority`.

**Impact:** This is a critical bug that causes a runtime error (ReferenceError: lhsPriority is not defined).

**Solution:** Corrected the variable reference to use `balancePriority` consistently.

---

### 7. **Inverted Filter Logic**

```tsx
if (lhsPriority > -99) {
  if (balance.amount <= 0) {
    return true;
  }
}
return false;
```

**Problem:** The filter condition `balance.amount <= 0` keeps balances with zero or negative amounts, which is likely unintended.

**Impact:** Displays empty or negative wallet balances to users, creating a poor user experience.

**Solution:** Changed the filter logic to `balancePriority > -99 && balance.amount > 0` (assuming the intent is to show positive balances).

```tsx
return balancePriority > -99 && balance.amount <= 0;
```

---

### 8. **Overcomplicated Sorting Logic**

```tsx
.sort((lhs: WalletBalance, rhs: WalletBalance) => {
  const leftPriority = getPriority(lhs.blockchain);
  const rightPriority = getPriority(rhs.blockchain);
  if (leftPriority > rightPriority) {
    return -1;
  } else if (rightPriority > leftPriority) {
    return 1;
  }
});
```

**Problem:** The sort comparator uses verbose if-else statements to return -1, 0, or 1.

**Impact:** Reduces code readability and maintainability without performance benefits.

**Solution:** Simplified to `return rightPriority - leftPriority`, which is more concise and equally effective.

```tsx
.sort((lhs: WalletBalance, rhs: WalletBalance) => {
  const leftPriority = getPriority(lhs.blockchain);
  const rightPriority = getPriority(rhs.blockchain);

  return rightPriority - leftPriority;
});
```

---

### 9. **Missing Sort Return Value**

**Problem:** The sort function doesn't return a value when priorities are equal.

**Impact:** Can cause unpredictable sorting behavior for items with equal priority.

**Solution:** The simplified subtraction approach automatically returns 0 when priorities are equal.

---

### 10. **Incorrect useMemo Dependencies**

```tsx
const sortedBalances = useMemo(() => {
  // Codes
}, [balances, prices]);
```

**Problem:** The `prices` variable is included in the `useMemo` dependency array despite not being used in the memoized calculation.

**Impact:** Causes unnecessary recalculations whenever prices change, even though the sorting logic doesn't depend on them.

**Solution:** Removed `prices` from the dependency array, leaving only `[balances]`.

```tsx
const sortedBalances = useMemo(() => {
  // Codes
}, [balances]);
```

---

### 11. **Redundant Data Transformation**

```tsx
const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  return {
    ...balance,
    formatted: balance.amount.toFixed(),
  };
});
```

**Problem:** The code maps over `sortedBalances` twice: once to create `formattedBalances` and again to create `rows`.

**Impact:** Iterates through the array unnecessarily, doubling the computational cost for large datasets.

**Solution:** Combined both operations into a single map operation during render, eliminating the intermediate `formattedBalances` array.

```tsx
const rows = sortedBalances.map((balance: WalletBalance) => {
  const formattedAmount = balance.amount.toFixed();
  const usdValue = prices[balance.currency] * balance.amount;

  return (/** JSX */);
})
```

---

### 12. **Pre-computation of Render Logic**

**Problem:** The `rows` variable is computed outside the JSX return statement before it's needed.

**Impact:** Reduces code clarity by separating the rendering logic from the actual render output.

**Solution:** Moved the mapping logic directly into the JSX return statement for better readability and maintainability.

```tsx
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
```

---

### 13. **Type Mismatch in Mapping**

**Problem:** The code maps over `sortedBalances` (typed as `WalletBalance[]`) but types the parameter as `FormattedWalletBalance`.

**Impact:** Type inconsistency that causes TypeScript errors and confuses the expected data structure.

**Solution:** Correctly typed the map parameter as `WalletBalance` and performed formatting inline.

---

### 14. **Anti-pattern: Using Array Index as React Key**

**Problem:** Uses the array `index` as the `key` prop for list items.

**Impact:** Can cause rendering bugs when items are reordered, deleted, or inserted. React may not properly track component identity, leading to incorrect state preservation and poor performance.

**Solution:** Changed to use `balance.currency` as the key, assuming currency is unique per wallet.

---

### 15. **Incorrect Props Interface Extension**

**Problem:** The component extends `BoxProps` which is undefined, and destructures `children` from props but never uses it.

**Impact:** Runtime errors due to missing type definitions and unnecessary prop destructuring.

**Solution:** Changed to extend `Omit<React.ComponentProps<"div">, "children">` for proper HTML div props without the children prop.

---

### 16. **Unclear Props Interface Name**

**Problem:** The generic name `Props` doesn't convey the component's purpose.

**Impact:** Reduces code readability and makes the codebase harder to navigate.

**Solution:** Renamed to `WalletPageProps` for clarity and better documentation.

---

### 17. **React.FC Type Issues**

**Problem:** Uses `React.FC<Props>` which has known issues with `defaultProps` typing and adds unnecessary complexity.

**Impact:** Can cause unexpected behavior with default props and reduces type inference quality.

**Solution:** Removed `React.FC` and used regular function component declaration with typed props parameter.

---

## Summary of Improvements

The refactored solution addresses all identified issues through:

- **Type Safety**: Proper TypeScript types throughout, eliminating `any` types and adding missing properties
- **Performance Optimization**: Eliminated redundant iterations, removed unnecessary re-creations, and fixed memoization dependencies
- **Code Quality**: Simplified complex logic, improved readability, and followed React best practices
- **Bug Fixes**: Corrected variable references, fixed filter logic, and resolved type mismatches
- **Maintainability**: Better naming conventions, clear structure, and reduced code duplication

The refactored component is more efficient, type-safe, maintainable, and follows modern React and TypeScript best practices.
