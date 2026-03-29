import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Strip locale prefix to check the underlying path
  const localePrefix = routing.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
  const pathWithoutLocale = localePrefix
    ? pathname.replace(new RegExp(`^/${localePrefix}`), '') || '/'
    : pathname;

  // If no locale prefix, let intl middleware handle the redirect
  if (!localePrefix) {
    return intlMiddleware(request);
  }

  // Public routes — let intl middleware handle response
  if (pathWithoutLocale === '/' || pathWithoutLocale === '/login') {
    return intlMiddleware(request);
  }

  // Protected routes: redirect to login if no session
  if (pathWithoutLocale.startsWith('/contacts')) {
    const session = request.cookies.get('auth-session');

    if (!session?.value) {
      return NextResponse.redirect(new URL(`/${localePrefix}/login`, request.url));
    }

    // Editor-only routes
    const isEditorRoute =
      pathWithoutLocale === '/contacts/new' || /\/contacts\/[^/]+\/edit/.test(pathWithoutLocale);

    if (isEditorRoute) {
      try {
        const parsed = JSON.parse(session.value) as { role?: string };
        if (parsed.role !== 'editor') {
          return NextResponse.redirect(new URL(`/${localePrefix}/contacts`, request.url));
        }
      } catch {
        return NextResponse.redirect(new URL(`/${localePrefix}/login`, request.url));
      }
    }
  }

  return intlMiddleware(request);
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$).*)'],
};
