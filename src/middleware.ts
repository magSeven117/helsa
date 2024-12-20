import { betterFetch } from '@better-fetch/fetch';
import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/sign-in', '/sign-up', '/recovery-password'];

export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  const { data: session } = await betterFetch<any>('/api/auth/get-session', {
    baseURL: req.nextUrl.origin,
    headers: {
      cookie: req.headers.get('cookie') || '',
    },
  });

  if (!session && !publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (session && session.user.role === 'UNDEFINED' && req.nextUrl.pathname !== '/select-role') {
    return NextResponse.redirect(new URL(`/select-role?userId=${session.user.id}`, req.url));
  }

  if (session && publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(!api|trpc)(.*)'],
};
