import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isStaticOrApi =
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/quotes/') ||
    /\.\w+$/.test(pathname);

  const isNetlifyDemoRoute =
    pathname.startsWith('/blobs') ||
    pathname.startsWith('/classics') ||
    pathname.startsWith('/edge') ||
    pathname.startsWith('/image-cdn') ||
    pathname.startsWith('/middleware') ||
    pathname.startsWith('/revalidation') ||
    pathname.startsWith('/routing');

  if (isStaticOrApi) {
    return NextResponse.next();
  }

  if (isNetlifyDemoRoute) {
    const response = NextResponse.next();
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('X-Middleware-Executed', 'true');
    return response;
  }

  const response = intlMiddleware(request);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.svg|images|.*\\.svg|.*\\.png|.*\\.jpg).*)'],
};
