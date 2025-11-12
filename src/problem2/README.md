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

## 📦 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Biome** - Fast linter and formatter (alternative to ESLint + Prettier)

## 🏗️ Project Structure

```
problem2/
├── public/           # Static assets
├── src/
│   ├── assets/       # Images, fonts, etc.
│   ├── App.tsx       # Main app component
│   ├── main.tsx      # Entry point
│   └── index.css     # Global styles
├── index.html        # HTML template
├── package.json      # Dependencies and scripts
├── tsconfig.json     # TypeScript config (references)
├── tsconfig.app.json # App TypeScript config
├── tsconfig.node.json # Node TypeScript config (for Vite)
├── vite.config.ts    # Vite configuration
└── biome.json        # Biome linting/formatting config
```

## 🔧 Configuration Notes

- **TypeScript**: Uses project references for better performance
  - `tsconfig.app.json` - For application code
  - `tsconfig.node.json` - For Vite config files
- **Biome**: All-in-one toolchain for web projects (replaces ESLint + Prettier)
- **Vite**: Configured to run on port 3000 with auto-open browser
