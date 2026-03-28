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
- [x] Add client-side React error boundary component
- [ ] Add SEO / AEO metadata pattern (`generateMetadata`, Open Graph, canonical URL)
  - [ ] Add JSON-LD structured data helper using `schema-dts` for type-safe Schema.org markup
  - [ ] Ensure semantic HTML patterns support AI answer engine parsing
- [x] Add `robots.ts` and `sitemap.ts` route handlers (benefits both SEO and AI crawlers)
- [x] Search
  - [x] Search now includes notes field (fixes "architect" not matching)
  - [x] Search field preserves query via controlled input state
  - [x] Search button added to form
  - [x] Clear button (X) added to search field
- [x] Password field show/hide toggle
- [x] Add a 404 page - not-found.tsx

## Infrastructure

- [x] Add security headers to `next.config.ts` (HSTS, CSP, XSS protection)
- [ ] Set up MSW for mock API responses during development
- [x] Enhance CI workflows (bundle size checks, CodeQL security scanning, build caching)
- [x] Add madge
- [x] Add depcruise
- [ ] Consider adding `useReportWebVitals()` to log Web Vitals to console during dev (DevTools may suffice)
- [x] Add `size-limit` for bundle size tracking in CI
- [ ] Add production `Dockerfile` with multi-stage build (for non-Vercel deployments)
- [x] Add dockerfile for local development
- [ ] Enable React Compiler in `next.config.ts` when stable (auto-memoization)
- [ ] Add stylelint - READY FOR DEVELOPMENT
- [ ] Add markdownlint - READY FOR DEVELOPMENT
- [ ] Add scripts for shutting down docker and cleaning builds, images, etc. - READY FOR DEVELOPMENT

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

## Accessibility

- [ ] Delete button doesn't meet color contrast ratio threshold. WCAG 1.4.3

## Bugs

- [ ] Crash while in editor view of contacts - READY FOR DEVELOPMENT 

```js
 Error: An error occurred while loading instrumentation hook: Could not parse module '[project]/src/instrumentation.ts', file not found
    at module evaluation (.next/dev/server/chunks/[project]_src_instrumentation_ts_04b8hiw._.js:4:11)
    at Object.<anonymous> (.next/dev/server/instrumentation.js:3:3) {
  code: 'MODULE_UNPARSABLE'
```

- [ ] Crash while editing [David Kim](http://localhost:3000/contacts/c6/edit) - READY FOR DEVELOPMENT

```js
 GET /contacts/c6/edit 200 in 154ms (next.js: 11ms, proxy.ts: 12ms, application-code: 131ms)
[browser] Base UI: A component that acts as a button expected a native <button> because the `nativeButton` prop is true. Rendering a non-<button> removes native button semantics, which can impact forms and accessibility. Use a real <button> in the `render` prop, or set `nativeButton` to `false`.
    at Button (http://localhost:3000/_next/static/chunks/_13k.fs4._.js:124:497)
    at EditContactPage (about://React/Server/file:///Users/laurie/dev/next-template/main/next-template/.next/dev/server/chunks/ssr/%5Broot-of-the-server%5D__0s_pg9~._.js?55:98:477)
```
