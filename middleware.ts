import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // TEMPORARILY DISABLED - Allow access to dashboard without auth
  return NextResponse.next();

  // Protected routes
  // const protectedRoutes = ['/dashboard', '/contacts', '/deals', '/activities', '/tasks', '/data-access'];
  // const authRoutes = ['/login', '/signup'];

  // const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));
  // const isAuthRoute = authRoutes.some(route => req.nextUrl.pathname.startsWith(route));

  // // Check for auth token in cookies
  // const token = req.cookies.get('sb-access-token');
  // const isAuthenticated = !!token;

  // // Redirect to login if trying to access protected route without auth
  // if (isProtectedRoute && !isAuthenticated) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  // // Redirect to dashboard if trying to access auth pages while authenticated
  // if (isAuthRoute && isAuthenticated) {
  //   return NextResponse.redirect(new URL('/dashboard', req.url));
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
