# ToDo

## Setup / Docs

- [x] Connect to Dependabot
- [ ] Connect and deploy to Vercel
- [x] Add GitHub code checks
- [x] PR template

## Features

- [x] Add a realistic landing page with header, footer, and navigation
- [x] Add simple auth flow with cookie-based sessions and Zustand
  - [x] Use Server Actions (`'use server'`) for form submissions
  - [x] Use `useActionState` for form state + server response handling
  - [x] Use `useFormStatus` for pending/loading UI during submission
  - [x] Use `useOptimistic` for instant UI feedback before server responds
- [x] Add Zustand for client state management
- [ ] Add TanStack Query for server state / data fetching
- [x] Add `error.tsx`, `not-found.tsx`, and `loading.tsx` app router pages
- [ ] Add client-side React error boundary component
- [ ] Add SEO / AEO metadata pattern (`generateMetadata`, Open Graph, canonical URL)
  - [ ] Add JSON-LD structured data helper using `schema-dts` for type-safe Schema.org markup
  - [ ] Ensure semantic HTML patterns support AI answer engine parsing
- [ ] Add `robots.ts` and `sitemap.ts` route handlers (benefits both SEO and AI crawlers)

## Infrastructure

- [ ] Add security headers to `next.config.ts` (HSTS, CSP, XSS protection)
- [ ] Set up MSW for mock API responses during development
- [ ] Enhance CI workflows (bundle size checks, CodeQL security scanning, Nx caching)
- [ ] Add madge
- [ ] Add depcruise
- [ ] Consider adding `useReportWebVitals()` to log Web Vitals to console during dev (DevTools may suffice)
- [ ] Add `size-limit` for bundle size tracking in CI
- [ ] Add production `Dockerfile` with multi-stage build (for non-Vercel deployments)
- [ ] Add dockerfile for local development
- [ ] Enable React Compiler in `next.config.ts` when stable (auto-memoization)

## Additional Core Functionality (evaluate per project)

- [ ] Add i18n with next-intl (hard to retrofit later)
- [ ] Add rate limiting middleware for API routes
- [ ] Add parallel routes pattern (`@modal`, `@sidebar`) for modals without losing URL state
- [ ] Add route groups (`(marketing)`, `(app)`) for separate layouts without affecting URLs

## Claude Skills/Rules

- [ ] Vercel - agent-skills - [github - agent skills](https://github.com/vercel-labs/agent-skills)
- [ ] Ad Hoc - Activate Framework
  - [Ad Hoc - article intro to Activate Framework](https://www.adhoc.team/2026/03/18/activate-framework-a-skills-kit-for-ai-development-in-government/)
  - [github - activate framework](https://github.com/adhocteam/activate-framework)
