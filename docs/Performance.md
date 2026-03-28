# Performance Monitoring

This template includes comprehensive performance monitoring tools to track and optimize your application.

## Tools Included

### 1. Web Vitals Tracking

> **Note**: This template does not yet include a `WebVitals` component. See [ToDo.md](ToDo.md) for the planned `useReportWebVitals()` integration. For now, use Chrome DevTools Lighthouse or Performance panel.

Core Web Vitals metrics to track:

- **LCP (Largest Contentful Paint)**: Loading performance
  - Good: < 2.5s
  - Needs Improvement: 2.5s - 4s
  - Poor: > 4s

- **INP (Interaction to Next Paint)**: Responsiveness
  - Good: < 200ms
  - Needs Improvement: 200ms - 500ms
  - Poor: > 500ms

- **CLS (Cumulative Layout Shift)**: Visual stability
  - Good: < 0.1
  - Needs Improvement: 0.1 - 0.25
  - Poor: > 0.25

- **FCP (First Contentful Paint)**: Initial render speed
  - Good: < 1.8s
  - Needs Improvement: 1.8s - 3s
  - Poor: > 3s

- **TTFB (Time to First Byte)**: Server response time
  - Good: < 800ms
  - Needs Improvement: 800ms - 1800ms
  - Poor: > 1800ms

#### Production Reporting

Once Web Vitals tracking is added, send metrics to your analytics service:

```typescript
// Example: report via useReportWebVitals()
import { useReportWebVitals } from 'next/web-vitals';

useReportWebVitals((metric) => {
  // Google Analytics
  gtag('event', metric.name, {
    value: Math.round(metric.value),
    metric_id: metric.id,
    metric_rating: metric.rating,
  });

  // Or custom endpoint
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify(metric),
  });
});
```

### 2. Bundle Analyzer

**Configuration**: `next.config.ts`

Visualize your JavaScript bundle size and identify optimization opportunities.

#### Usage

```bash
# Build with bundle analysis
pnpm analyze

# Opens two HTML reports in your browser:
# - Client bundle: .next/analyze/client.html
# - Server bundle: .next/analyze/server.html
```

#### What to Look For

1. **Large Dependencies**: Packages > 100KB
   - Consider alternatives or code splitting
   - Use dynamic imports for non-critical code

2. **Duplicate Packages**: Same library different versions
   - Check package-lock.json for conflicts
   - Use `pnpm dedupe` to consolidate

3. **Unused Code**: Large modules with low usage
   - Tree-shake by using named imports
   - Lazy load with `next/dynamic`

#### Example Optimizations

```typescript
// ❌ Imports entire library
import _ from 'lodash';

// ✅ Imports only needed functions
import debounce from 'lodash/debounce';

// ✅ Lazy load heavy components
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <Skeleton />,
  ssr: false,
});
```

### 3. Bundle Size Limits (size-limit)

> **Note**: `size-limit` is not yet installed. See [ToDo.md](ToDo.md). The guidance below applies once it's set up.

Enforce hard limits on bundle sizes to prevent bundle bloat. The build will fail if bundles exceed defined limits.

#### Example Configuration

Add to `package.json`:

```json
{
  "size-limit": [
    {
      "name": "Total client-side JavaScript",
      "path": ".next/static/chunks/**/*.js",
      "limit": "500 KB",
      "gzip": true
    },
    {
      "name": "Total client-side CSS",
      "path": ".next/static/chunks/**/*.css",
      "limit": "50 KB",
      "gzip": true
    }
  ]
}
```

#### When to Adjust Limits

**Increase limits** when:

- Adding substantial features (e.g., charts, rich text editors)
- New major dependencies required
- Document the reason in commit message

**Decrease limits** when:

- Removing dependencies
- Optimizing bundle size
- After successful code splitting

## Performance Best Practices

### 1. Code Splitting

Use dynamic imports for routes and heavy components:

```typescript
import dynamic from 'next/dynamic';

const AdminPanel = dynamic(() => import('@/components/AdminPanel'), {
  loading: () => <Spinner />,
});
```

### 2. Image Optimization

Always use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src="/photo.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // for LCP images
  placeholder="blur"
/>
```

### 3. Font Optimization

Use Next.js font optimization (already configured):

```typescript
// app/layout.tsx
import { Geist } from 'next/font/google';

const geist = Geist({ subsets: ['latin'] });
```

### 4. Route Prefetching

Next.js automatically prefetches routes. Disable when not needed:

```typescript
<Link href="/heavy-page" prefetch={false}>
  Heavy Page
</Link>
```

### 5. React Server Components

Use Server Components by default (Next.js App Router):

```typescript
// Default: Server Component (no 'use client')
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// Only add 'use client' when needed:
// - useState, useEffect, event handlers
// - Browser APIs (window, document)
// - Third-party libraries that require client
```

## Monitoring Performance

### Development

1. **Chrome DevTools**
   - Performance tab: Record and analyze
   - Lighthouse: Run audits (Cmd+Shift+P > "Lighthouse")
   - Network tab: Check bundle sizes

2. **React DevTools Profiler**
   - Install React DevTools extension
   - Use Profiler tab to measure component render times

3. **Console Logs**
   - Web Vitals automatically log in development
   - Look for performance warnings

### Production

Recommended services:

1. **Vercel Analytics** (if hosting on Vercel)

   ```bash
   pnpm add @vercel/analytics @vercel/speed-insights
   ```

2. **Google Analytics 4** with Web Vitals

   ```typescript
   gtag('event', metric.name, { value: metric.value });
   ```

3. **Sentry Performance Monitoring**

   ```bash
   pnpm add @sentry/nextjs
   ```

4. **Custom Analytics Endpoint**

   ```typescript
   // app/api/analytics/route.ts
   export async function POST(request: Request) {
     const metric = await request.json();
     // Store in database or forward to service
     await db.webVitals.create({ data: metric });
     return Response.json({ success: true });
   }
   ```

## Common Performance Issues

### Issue: High LCP

**Causes**:

- Large images without optimization
- Blocking JavaScript
- Slow server response (TTFB)

**Solutions**:

- Use Next.js `<Image>` with `priority` prop
- Move JavaScript to bottom or use `defer`
- Optimize API responses, add caching
- Use CDN for static assets

### Issue: High CLS

**Causes**:

- Images without dimensions
- Dynamic content insertion
- Web fonts loading

**Solutions**:

- Always specify image width/height
- Reserve space for dynamic content
- Use `font-display: swap` (Next.js does this)

### Issue: High INP

**Causes**:

- Heavy JavaScript execution
- Too many re-renders
- Expensive computations on main thread

**Solutions**:

- Use React.memo for expensive components
- Debounce user inputs
- Move heavy work to Web Workers
- Use `useDeferredValue` for non-urgent updates

### Issue: Large Bundle Size

**Causes**:

- Large dependencies (moment.js, lodash, etc.)
- Importing entire libraries
- Not using tree-shaking

**Solutions**:

- Replace large libraries (moment → date-fns)
- Use named imports
- Analyze with `pnpm analyze`
- Code split with dynamic imports

## Useful Commands

```bash
# Analyze bundle size (opens interactive treemap)
pnpm analyze

# Build for production
pnpm build

# Test production build locally
pnpm build && pnpm start

# Run Lighthouse in CI
npx lighthouse http://localhost:3000 --output=html
```

## Resources

- [Web Vitals](https://web.dev/vitals/)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Bundle Size Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/bundle-analyzer)
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
