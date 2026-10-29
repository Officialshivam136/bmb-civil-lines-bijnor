import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminToken } from '@/lib/adminAuth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get('bmb_admin_auth');
  const sessionCheck = await verifyAdminToken(authCookie?.value);
  const isAuthenticated = sessionCheck.valid;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-admin-pathname', pathname);

  // 1. Admin login page and auth API
  if (pathname === '/admin/login' || pathname === '/api/admin/auth') {
    // If already logged in with valid token and visiting login page, redirect to admin overview
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
      const response = NextResponse.redirect(loginUrl);
      if (authCookie?.value && !isAuthenticated) {
        response.cookies.delete('bmb_admin_auth');
      }
      return response;
    }
  }

  // 3. Protect all /api/admin routes
  if (pathname.startsWith('/api/admin')) {
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or expired administrator session' },
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

