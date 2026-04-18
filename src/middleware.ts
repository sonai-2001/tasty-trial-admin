import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const { pathname } = request.nextUrl;

  // 1. If user is on the login page and has a token, redirect to dashboard
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 2. If user is NOT on the login page and has NO token, redirect to login
  // Exclude public assets and the login page itself to avoid infinite loops
  const isPublicPath = pathname === '/login' || pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.');
  
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
