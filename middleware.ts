import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Public landing pages - should NOT be protected
  const publicLandingPages = ['/myn', '/ethos', '/continuum'];

  // Protected routes - dashboard and subroutes only
  const protectedRoutes = [
    '/myn/dashboard',
    '/myn/vault',
    '/myn/requests',
    '/myn/access',
    '/myn/earnings',
    '/myn/settings',
    '/ethos/dashboard',
    '/ethos/contacts',
    '/ethos/deals',
    '/ethos/activities',
    '/ethos/tasks',
    '/ethos/data-access',
    '/continuum/dashboard',
    '/continuum/contracts',
    '/continuum/explorer',
    '/continuum/api-keys',
    '/continuum/docs',
    '/continuum/playground'
  ];
  const authRoutes = ['/login', '/signup'];

  const isPublicLandingPage = publicLandingPages.some(route => req.nextUrl.pathname === route);
  const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => req.nextUrl.pathname.startsWith(route));

  // Check for custom auth session in cookies
  const session = req.cookies.get('continuum_session');
  const isAuthenticated = !!session;

  // Allow public landing pages without auth
  if (isPublicLandingPage) {
    return NextResponse.next();
  }

  // Redirect to login if trying to access protected route without auth
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Redirect to appropriate product dashboard if trying to access auth pages while authenticated
  if (isAuthRoute && isAuthenticated) {
    // Check for last used product in cookie, default to ethos
    const lastProduct = req.cookies.get('last-product')?.value || 'ethos';
    return NextResponse.redirect(new URL(`/${lastProduct}/dashboard`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
