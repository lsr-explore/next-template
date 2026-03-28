import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('auth-session');

  // Public routes
  if (pathname === '/' || pathname === '/login') {
    return NextResponse.next();
  }

  // Protected routes: redirect to login if no session
  if (pathname.startsWith('/contacts')) {
    if (!session?.value) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Editor-only routes
    const isEditorRoute = pathname === '/contacts/new' || /\/contacts\/[^/]+\/edit/.test(pathname);

    if (isEditorRoute) {
      try {
        const parsed = JSON.parse(session.value) as { role?: string };
        if (parsed.role !== 'editor') {
          return NextResponse.redirect(new URL('/contacts', request.url));
        }
      } catch {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$).*)'],
};
