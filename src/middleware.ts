import { NextRequest } from 'next/server';

export default async function middleware(req: NextRequest) {}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
