# Problem 2 - Portal

A React + TypeScript + Vite application integrated into the pnpm monorepo.

## 🚀 Getting Started

### Development

```bash
# From monorepo root
pnpm --filter problem2 dev

# Or from problem2 directory
cd src/problem2
pnpm dev
```

### Build

```bash
pnpm --filter problem2 build
```

### Preview Production Build

```bash
pnpm --filter problem2 preview
```

### Linting & Formatting

```bash
# Check for issues
pnpm --filter problem2 lint

# Auto-fix issues
pnpm --filter problem2 lint:fix

# Format code
pnpm --filter problem2 format

# Type checking
pnpm --filter problem2 type-check
```

### Running Tests

```bash
# Run all tests
pnpm --filter problem2 test

# Run tests in watch mode
pnpm --filter problem2 test:watch

# Run tests with coverage
pnpm --filter problem2 test:coverage
```

## 📦 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component system
- **Biome** - Fast linter and formatter (alternative to ESLint + Prettier)
- **Vitest** - Unit testing framework
- **Testing Library** - React component testing

## 🏗️ Project Structure

```
problem2/
├── public/           # Static assets
├── src/
│   ├── assets/       # Images, fonts, icons
│   ├── components/   # React components
│   │   ├── ui/       # shadcn/ui components
│   │   ├── TradePanel/  # Trade/Convert feature
│   │   ├── Header/   # App header
│   │   └── Footer/   # App footer
│   ├── contexts/     # React contexts
│   ├── hooks/        # Custom hooks
│   ├── lib/          # Utilities and helpers
│   │   ├── utils.ts     # Common utilities
│   │   ├── variants.ts  # Tailwind variants
│   │   └── i18n.ts      # Internationalization
│   ├── locales/      # Translation files
│   ├── styles/       # Global styles
│   ├── App.tsx       # Main app component
│   └── main.tsx      # Entry point
├── index.html        # HTML template
├── package.json      # Dependencies and scripts
├── tsconfig.json     # TypeScript config (references)
├── tsconfig.app.json # App TypeScript config
├── tsconfig.node.json # Node TypeScript config (for Vite)
├── vite.config.ts    # Vite configuration
└── biome.json        # Biome linting/formatting config
```

## 🎨 TradePanel Component

The **TradePanel** is a production-ready currency conversion feature that matches the design specifications.

### Features

- ✅ Responsive layout (split on desktop, stacked on mobile)
- ✅ Glass-morphism UI with blur effects
- ✅ Live exchange rate calculations
- ✅ Input validation (amount > 0, amount <= available balance)
- ✅ Token swapping with animated swap button
- ✅ Inline error messages
- ✅ Keyboard accessible
- ✅ ARIA labels for screen readers

### Usage

```tsx
import TradePanel from "@/components/TradePanel";

function App() {
  return (
    <div className="container mx-auto py-12">
      <TradePanel />
    </div>
  );
}
```

### Component Structure

```
TradePanel/
├── TradePanel.tsx      # Main component with state management
├── AmountInput.tsx     # Reusable input block for From/To
├── token-data.ts       # Token metadata and exchange rate logic
├── Formatters.ts       # Number formatting utilities
├── index.ts            # Barrel exports
├── TradePanel.test.tsx # Integration tests
└── Formatters.test.ts  # Unit tests
```

### Customization

**Tokens**: Edit `token-data.ts` to add/remove tokens:

```ts
export const TOKENS: Token[] = [
  {
    id: "btc",
    symbol: "BTC",
    name: "Bitcoin",
    icon: "₿",
    price: 96202.5738,
    available: 1.2,
  },
  // Add more tokens...
];
```

**Styling**: The component uses Tailwind CSS classes and shadcn/ui components. Customize appearance by:

- Modifying `lib/variants.ts` for glass effects
- Adjusting Tailwind classes in component files
- Updating `globals.css` for theme colors

**Exchange Rate**: Mock exchange rates are calculated based on USD prices in `token-data.ts`. For production, replace with live API:

```ts
// Replace getExchangeRate function with API call
export async function getExchangeRate(
  from: string,
  to: string
): Promise<number> {
  const response = await fetch(`/api/rates?from=${from}&to=${to}`);
  return response.json();
}
```

### Accessibility

The component follows WCAG 2.1 AA standards:

- All interactive elements are keyboard-focusable
- ARIA labels describe button purposes
- Error messages use `role="alert"` for screen reader announcements
- Focus indicators visible on all controls
- Proper tab order maintained

### Testing

Run tests for the TradePanel:

```bash
# All TradePanel tests
pnpm test TradePanel

# Just formatter tests
pnpm test Formatters

# Watch mode
pnpm test:watch
```

**Test Coverage**:

- ✅ Number formatting edge cases
- ✅ Amount validation
- ✅ Token swapping logic
- ✅ User interactions (input, button clicks)
- ✅ Error states

## 🔧 Configuration Notes

- **TypeScript**: Uses project references for better performance
  - `tsconfig.app.json` - For application code
  - `tsconfig.node.json` - For Vite config files
- **Biome**: All-in-one toolchain for web projects (replaces ESLint + Prettier)
- **Vite**: Configured to run on port 3000 with auto-open browser
- **Tailwind**: Extended with custom colors and glass-morphism utilities

## 📝 Development Workflow

1. **Start dev server**: `pnpm dev`
2. **Make changes**: Edit files in `src/`
3. **Test changes**: `pnpm test` or `pnpm test:watch`
4. **Lint code**: `pnpm lint:fix`
5. **Format code**: `pnpm format`
6. **Type check**: `pnpm type-check`
7. **Build**: `pnpm build`
8. **Preview**: `pnpm preview`

## 🚢 Deployment

The project builds to the `dist/` folder:

```bash
pnpm build
```

Deploy `dist/` to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Biome Documentation](https://biomejs.dev/)

---

### Commit Message Template

```
feat(problem2): implement TradePanel component with live exchange rates

- Add TradePanel main component with state management
- Create AmountInput reusable component
- Implement token-data utilities with exchange rate calculations
- Add Formatters for number display and parsing
- Update lib/variants.ts with glass-morphism styles
- Add comprehensive unit and integration tests
- Update README with usage and customization docs

BREAKING CHANGE: None
```
