import { betterAuthMiddleware } from '@helsa/auth/middleware';
import { NextRequest } from 'next/server';
const publicRoutes = ['/sign-in', '/sign-up', '/recovery-password'];
export default async function middleware(req: NextRequest) {
  return betterAuthMiddleware(req, publicRoutes);
}
