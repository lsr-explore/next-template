import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod/v4';

export const env = createEnv({
  /**
   * Server-side environment variables — not exposed to the browser.
   * Validated at build time.
   */
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  },

  /**
   * Client-side environment variables — must be prefixed with NEXT_PUBLIC_.
   * Exposed to the browser bundle.
   */
  client: {
    // NEXT_PUBLIC_APP_URL: z.string().url(),
  },

  /**
   * Runtime values — must match the keys defined above.
   * Destructure from process.env so Next.js can statically replace them.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    LOG_LEVEL: process.env.LOG_LEVEL,
    // NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  /**
   * Skip validation in environments where env vars aren't available
   * (e.g., Docker builds, CI linting steps).
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Treat empty strings as undefined so missing vars are caught.
   */
  emptyStringAsUndefined: true,
});
