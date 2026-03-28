# next-template

A production-ready Next.js template with a contact list app demonstrating Server Actions, role-based access, accessibility, and modern React 19 patterns.

## Tech Stack

| Category | Tool |
|----------|------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, TypeScript, Turbopack) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (base-nova) |
| State Management | [Zustand](https://zustand.docs.pmnd.rs) (client auth state with persistence) |
| Formatting | [Biome](https://biomejs.dev) |
| Linting | [ESLint](https://eslint.org) + [jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) + [eslint-config-biome](https://github.com/nickmccurdy/eslint-config-biome) |
| Unit Testing | [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) + [vitest-axe](https://github.com/chaance/vitest-axe) |
| E2E Testing | [Playwright](https://playwright.dev) + [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright) |
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

## Demo App

The template includes a **contact list application** that demonstrates real-world patterns:

- **Landing page** with hero section and feature cards
- **Login** with two preset accounts (viewer / editor)
- **Contact list** with search, photo avatars, collapsible notes, and timezone display
- **Add / Edit forms** with Zod validation and inline error feedback
- **Delete** with confirmation dialog and optimistic UI updates
- **Role-based access** — viewers can browse; editors can create, update, and delete

### Preset Accounts

| Role | Email | Password |
|------|-------|----------|
| Viewer (read-only) | `viewer@example.com` | `ContactsViewer123` |
| Editor (full CRUD) | `editor@example.com` | `ContactsEditor123` |

### React 19 Patterns Used

- **Server Actions** (`'use server'`) for all form mutations
- **`useActionState`** for form state and server response handling
- **`useFormStatus`** for pending/loading UI during submission
- **`useOptimistic`** for instant UI feedback on delete

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/
    page.tsx            # Landing page
    layout.tsx          # Root layout with header + footer
    error.tsx           # Global error boundary
    not-found.tsx       # Global 404
    login/              # Login page + form
    contacts/           # Contact list, add, edit pages
    actions/            # Server Actions (auth, contacts)
  components/
    layout/             # Header, footer, nav link
    contacts/           # Contact card, form, delete dialog, submit button
    ui/                 # Inline alert
    auth/               # Auth sync
  lib/                  # Utilities (logger, contact store, auth session, timezone)
  store/                # Zustand auth store
  types/                # TypeScript types (contact, auth)
  env.ts                # Type-safe environment variables (T3 Env)
  instrumentation.ts    # OpenTelemetry setup
  proxy.ts              # Route protection (Next.js 16 proxy)
  stories/              # Storybook example stories
e2e/                    # Playwright end-to-end tests
libs/
  ui/src/               # Shared UI library (shadcn/ui components)
    components/         # UI components (button, card, alert, dialog, etc.)
    lib/                # Utilities (cn helper)
    hooks/              # Shared hooks
docs/                   # Reference documentation
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
| `pnpm e2e` | Run Playwright E2E tests |
| `pnpm e2e:ui` | Playwright interactive UI mode |
| `pnpm storybook` | Start Storybook on port 6006 |
| `pnpm analyze` | Build with bundle analyzer |
| `pnpm check:all` | Run all quality checks (format, lint, typecheck, test) |

## Testing Strategy

This project has three layers of testing:

- **Unit tests** — Vitest + Testing Library for component logic and rendering. Co-located as `*.test.tsx` files next to source.
- **Storybook tests** — Stories run as Vitest browser tests via `@storybook/addon-vitest`. The a11y addon fails on accessibility violations.
- **E2E tests** — Playwright runs against a production build across Chromium, Firefox, and WebKit. Tests live in `e2e/`.

### Accessibility Testing

Accessibility is checked at every layer:

| Layer | Tool | What it catches |
|-------|------|----------------|
| Lint time | `eslint-plugin-jsx-a11y` | Missing alt text, incorrect ARIA, invalid roles |
| Unit tests | `vitest-axe` | axe-core violations in rendered components |
| Storybook | `@storybook/addon-a11y` | axe-core violations across all stories |
| E2E tests | `@axe-core/playwright` | Full-page axe scans in real browsers |

## Architecture

### Data Flow

```
Server Component (reads data) → Client Component (renders UI)
                                        ↓
                                 Server Action (mutation)
                                        ↓
                                 revalidatePath (refresh)
```

- **Reads**: Server Components fetch directly from the in-memory store
- **Mutations**: Server Actions validate with Zod, update the store, and call `revalidatePath`
- **Auth**: Cookie-based sessions (set by Server Actions, read by `proxy.ts` and Server Components)
- **Client state**: Zustand synced from the server via `AuthSync` component

### Route Protection

`proxy.ts` (Next.js 16's replacement for middleware) protects routes:

- `/contacts/*` requires authentication
- `/contacts/new` and `/contacts/[id]/edit` require editor role
- Unauthenticated users are redirected to `/login`

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
