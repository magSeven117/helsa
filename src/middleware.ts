import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
const publicRoutes = createRouteMatcher(['/sign(.*)', '/recovery-password(.*)']);
const apiRoutes = createRouteMatcher(['/api(.*)']);
export default clerkMiddleware((auth, req: NextRequest) => {
  if (apiRoutes(req)) {
    return NextResponse.next();
  }
  const { userId } = auth();
  if (!userId && !publicRoutes(req)) {
    const signInUrl = new URL('/sign-in', req.url);
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
