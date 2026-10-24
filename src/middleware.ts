import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get('bmb_admin_auth');
  const isAuthenticated = Boolean(authCookie?.value && authCookie.value.trim().length > 0);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-admin-pathname', pathname);

  // 1. Admin login page and auth API
  if (pathname === '/admin/login' || pathname === '/api/admin/auth') {
    // If already logged in and visiting login page, redirect to admin overview
    if (pathname === '/admin/login' && isAuthenticated) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next({
      request: { headers: requestHeaders }
    });
  }

  // 2. Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Protect all /api/admin routes
  if (pathname.startsWith('/api/admin')) {
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized: Administrator session required' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next({
    request: { headers: requestHeaders }
  });
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
