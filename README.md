# next-template

A production-ready Next.js template with quality tooling, accessibility, observability, and Vercel deployment.

## Tech Stack

| Category | Tool |
|----------|------|
| Framework | [Next.js](https://nextjs.org) (App Router, TypeScript, Turbopack) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| Formatting | [Biome](https://biomejs.dev) |
| Linting | [ESLint](https://eslint.org) + [jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) + [eslint-config-biome](https://github.com/nickmccurdy/eslint-config-biome) |
| Testing | [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) + [vitest-axe](https://github.com/chaance/vitest-axe) |
| Component Dev | [Storybook](https://storybook.js.org) (with a11y addon) |
| Logging | [Pino](https://getpino.io) (server-side) |
| Observability | [OpenTelemetry](https://opentelemetry.io) via [@vercel/otel](https://vercel.com/docs/observability/otel-overview) |
| Env Validation | [T3 Env](https://env.t3.gg) + [Zod](https://zod.dev) |
| Type Safety | Strict TypeScript + [ts-reset](https://github.com/total-typescript/ts-reset) |
| Bundle Analysis | [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) |
| Commits | [Conventional Commits](https://www.conventionalcommits.org) via commitlint + husky |
| CI | GitHub Actions (quality, build, test) |
| Dependency Updates | Dependabot (weekly, grouped) |
| Deployment | [Vercel](https://vercel.com) (zero config) |

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/           # Next.js App Router pages and layouts
  lib/           # Utilities (logger, etc.)
  env.ts         # Type-safe environment variables (T3 Env)
  instrumentation.ts  # OpenTelemetry setup
  stories/       # Storybook example stories
libs/
  ui/src/        # Shared UI library (shadcn/ui components)
    components/  # UI components
    lib/         # Utilities (cn helper)
    hooks/       # Shared hooks
docs/            # Reference documentation
```

Import shared UI components via `@next-template/ui/*`:

```tsx
import { Button } from '@next-template/ui/components/ui/button';
import { cn } from '@next-template/ui/lib/utils';
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | ESLint (a11y + Next.js rules) |
| `pnpm lint:fix` | ESLint with auto-fix |
| `pnpm format` | Biome format + lint (auto-fix) |
| `pnpm format:check` | Biome check (no fix) |
| `pnpm typecheck` | TypeScript type checking |
| `pnpm test` | Run Vitest |
| `pnpm test:watch` | Vitest in watch mode |
| `pnpm test:coverage` | Vitest with coverage report |
| `pnpm storybook` | Start Storybook on port 6006 |
| `pnpm analyze` | Build with bundle analyzer |
| `pnpm check:all` | Run all quality checks (format, lint, typecheck, test) |

## Linting Strategy

This project uses **Biome** and **ESLint** together:

- **Biome** handles formatting and general JS/TS linting
- **ESLint** handles accessibility (jsx-a11y), Next.js, and Storybook rules
- **eslint-config-biome** (last in ESLint config) disables overlapping rules
- Biome's a11y rules are disabled in favor of jsx-a11y's more mature rule set

See [docs/biome-eslint-a11y-rules.md](docs/biome-eslint-a11y-rules.md) for a detailed comparison.

## Environment Variables

Environment variables are validated at build time using [T3 Env](https://env.t3.gg). Define your variables in `src/env.ts`:

```tsx
import { env } from '@/env';

// Type-safe, validated at build time
console.log(env.NODE_ENV);
```

## Deployment

Deploy to Vercel with zero configuration. Push to your connected repository and Vercel handles the rest.

OpenTelemetry tracing is automatically enabled on Vercel via the instrumentation file.
