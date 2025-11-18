# Solution

## Folder Structure Description

This repository is organized as a **pnpm monorepo** with three distinct problem solutions located in the src directory:

```
├── src/
│   ├── problem1/          # Three algorithmic approaches to sum integers
│   ├── problem2/          # Currency swap web application (React + TypeScript)
│   └── problem3/          # React component refactoring exercise
├── package.json           # Root package configuration
├── pnpm-workspace.yaml    # pnpm workspace definition
└── readme.md              # This file
```

Each problem folder contains its own `problem.md` describing the challenge, along with solution files and supporting documentation.

---

## First Step Before Explore Solution

Before exploring any solution, install all dependencies from the **root directory**:

```bash
pnpm install
```

This command will install dependencies for all problems in the monorepo.

---

## Problem 1

### Problem Summary

Provide three unique implementations of a function that calculates the sum of all integers from 1 to n (i.e., `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`).

### Solution Approaches

The solution provides three different implementations:

1. **Iterative Loop Approach** (`sum_to_n_a`)

   - Uses a `while` loop to accumulate the sum by decrementing from n to 1
   - Time complexity: O(n)
   - Space complexity: O(1)

2. **Mathematical Formula Approach** (`sum_to_n_b`)

   - Applies the arithmetic series formula: `sum = n × (n + 1) / 2`
   - Time complexity: O(1)
   - Space complexity: O(1)
   - Most efficient approach for large values of n

3. **Array Reduce Approach** (`sum_to_n_c`)
   - Creates an array of integers from 1 to n, then uses the `reduce` function to sum them
   - Time complexity: O(n)
   - Space complexity: O(n)
   - Demonstrates functional programming paradigm

- **Additional Note: Recursive Approach (Not Implemented)**
  - A recursive version could also compute the sum, but it is not included here because, in this context, performance and call-stack growth concerns outweigh the stylistic benefits of recursion.

All implementations include input validation to handle edge cases (non-numeric values, zero, and negative numbers).

### Files

- `solution.js` - Contains all three implementations
- `solution.test.js` - Comprehensive test suite covering edge cases and large values

### Running Tests

```bash
# From root directory
pnpm test:problem1

# Or from problem1 directory
cd src/problem1
pnpm test
```

---

## Problem 2

### Problem Summary

Create a currency swap form that allows users to exchange assets from one currency to another. The application should feature an intuitive interface with input validation, real-time exchange rate calculations, and visual appeal.

### Preview Commands with Dev Enviroment

```bash
# Start development server
pnpm dev:problem2

# Or from problem1 directory
cd src/problem1
pnpm dev
```

### Tech Stack

- **React 18** - Modern UI library with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component system built on Radix UI
- **React Hook Form** - Performant form validation
- **Biome** - All-in-one toolchain for linting and formatting
- **Vitest** - Unit testing framework
- **Testing Library** - React component testing utilities

### Key Features

- **Responsive Design**: Optimized for desktop and mobile viewports
- **Glass-morphism UI**: Modern blur effects and transparency
- **Real-time Exchange Rates**: Live conversion calculations based on token prices
- **Input Validation**: Validates amounts against available balances with inline error messages
- **Token Swapping**: Animated swap button to reverse From/To selections
- **Internationalization (i18n)**: Multi-language support (English, French, German, Spanish, Chinese)
- **Accessibility**: WCAG 2.1 AA compliant with ARIA labels and keyboard navigation
- **Theme Toggle**: Light and dark mode support

### Folder Structure Overview

```
problem2/
├── public/               # Static assets (tokens, icons)
├── src/
│   ├── assets/          # Images and flag icons
│   ├── components/
│   │   ├── ui/          # shadcn/ui components (Button, Card, Dialog, etc.)
│   │   ├── TradePanel/  # Main currency swap feature
│   │   ├── Header/      # Application header with theme toggle
│   │   └── Footer/      # Application footer with language selector
│   ├── contexts/        # React Context providers (Dark Mode)
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilities (formatters, variants, i18n config)
│   ├── locales/         # Translation JSON files
│   ├── styles/          # Global CSS
│   ├── App.tsx          # Root application component
│   └── main.tsx         # Application entry point
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

### Testing Strategy

The solution includes comprehensive test coverage for:

- Number formatting utilities with edge cases
- Amount validation logic
- Token swapping behavior
- User interactions (input changes, button clicks)
- Error state handling

### Additional Documentation

For detailed component documentation, customization guides, and deployment instructions, refer to **`README.md`**.

---

## Problem 3

### Problem Summary

Identify computational inefficiencies and anti-patterns in a React component that displays wallet balances. The component uses React Hooks, TypeScript, and functional programming patterns but contains multiple issues affecting performance, type safety, and maintainability.

### Solution

The refactored solution is provided in `WalletPageRefactored.tsx`. This improved implementation addresses all identified issues while maintaining the same functionality.

### Additional Documentation

For a detailed analysis of all 17 identified issues with before/after code examples, refer to **`README.md`**.

### Key Improvements

#### Type Safety Enhancements

- **Missing Property Resolution**: Added the `blockchain` property to the `WalletBalance` interface, which was referenced throughout the component but not defined in the type
- **Interface Inheritance**: Refactored `FormattedWalletBalance` to extend `WalletBalance` instead of duplicating properties, reducing redundancy
- **Proper Type Annotations**: Replaced `any` type with `string` in the `getPriority` function parameter for stronger type checking
- **Correct Props Extension**: Changed from undefined `BoxProps` to `Omit<React.ComponentProps<"div">, "children">` for proper HTML div props
- **Improved Naming**: Renamed generic `Props` interface to `WalletPageProps` for better code clarity

#### Performance Optimizations

- **Function Hoisting**: Moved `getPriority` function outside the component body to prevent unnecessary recreation on every render
- **Object Lookup**: Replaced verbose `switch` statement with a constant object lookup (`blockchainPriority`) for O(1) access time
- **Eliminated Redundant Mapping**: Combined filtering, sorting, and formatting operations to avoid multiple array iterations
- **Fixed useMemo Dependencies**: Removed `prices` from the dependency array since it wasn't used in the memoized calculation, preventing unnecessary recalculations

#### Logic Corrections

- **Variable Reference Fix**: Corrected the filter logic to reference `balancePriority` instead of the undefined `lhsPriority` variable
- **Filter Logic Improvement**: Changed the condition to properly filter balances with priority greater than -99 and positive amounts
- **Simplified Sorting**: Replaced verbose if-else comparator with direct subtraction (`rightPriority - leftPriority`) for cleaner code
- **Missing Return Value**: Ensured the sort function always returns a value (the subtraction approach automatically returns 0 when priorities are equal)

#### Code Quality Improvements

- **Removed React.FC**: Eliminated `React.FC<Props>` type annotation due to known issues with `defaultProps` typing and reduced type inference quality
- **Better Key Prop**: Changed from using array `index` to `balance.currency` as the React key to prevent rendering bugs during list reordering
- **Inline Rendering**: Moved the row mapping logic directly into the JSX return statement for better readability and maintainability
- **Type Consistency**: Fixed type mismatch where `sortedBalances` (typed as `WalletBalance[]`) was incorrectly mapped with `FormattedWalletBalance` parameter type

### Impact

The refactored component achieves:

- **Improved Performance**: Eliminated unnecessary computations and array iterations
- **Enhanced Type Safety**: Proper TypeScript typing throughout with no `any` types
- **Bug-Free Logic**: Corrected variable references and filter conditions
- **Better Maintainability**: Clearer code structure following React and TypeScript best practices
- **Reduced Complexity**: Simplified logic without sacrificing functionality
