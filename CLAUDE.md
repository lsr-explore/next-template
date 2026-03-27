# CLAUDE.md

@AGENTS.md

## Project Conventions

- **pnpm** as package manager.
- **Biome** for formatting + general JS/TS linting.
- **ESLint** for accessibility (jsx-a11y), Next.js-specific rules, and Storybook rules.
- **Vitest** for unit/component tests.
- **Storybook** for component development and visual testing.
- **Pino** for server-side logging (do not import from client components).

## Shared UI Library

shadcn/ui components live in `libs/ui/src/` — import via `@next-template/ui/*`.

## Quality Checks

Run `pnpm check:all` to verify everything, or individual checks:

```sh
pnpm format:check   # Biome formatting
pnpm lint            # ESLint
pnpm typecheck       # TypeScript
pnpm test            # Vitest
```
