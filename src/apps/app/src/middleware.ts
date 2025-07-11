import { getMiddlewareSession } from '@helsa/auth/utils/get-middleware-session';
import { NextRequest, NextResponse } from 'next/server';
const publicRoutes = new Set(['/sign-in', '/sign-up', '/recovery-password']);
export default async function middleware(req: NextRequest) {
  const session = await getMiddlewareSession(req);
  const isPublicRoute = publicRoutes.has(req.nextUrl.pathname);

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (
    session &&
    session.user.role === 'UNDEFINED' &&
    req.nextUrl.pathname !== '/select-role' &&
    req.nextUrl.pathname !== '/onboarding'
  ) {
    return NextResponse.redirect(new URL(`/select-role?userId=${session.user.id}`, req.url));
  }

  if (session && (isPublicRoute || req.nextUrl.pathname === '/')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/((?!api|queue|notifications|payment|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
