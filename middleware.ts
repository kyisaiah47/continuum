import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Protected routes for all three products
  const protectedRoutes = [
    '/myn',
    '/ethos',
    '/continuum'
  ];
  const authRoutes = ['/login', '/signup'];

  const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => req.nextUrl.pathname.startsWith(route));

  // Check for custom auth session in cookies
  const session = req.cookies.get('continuum_session');
  const isAuthenticated = !!session;

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
