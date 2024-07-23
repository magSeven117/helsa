import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
const isOnboardingRoute = createRouteMatcher(["/complete(.*)", "/onboarding(.*)"]);
const publicRoutes = createRouteMatcher(["/sign(.*)"]);
const apiRoutes = createRouteMatcher(["/api(.*)"]);
export default clerkMiddleware((auth, req: NextRequest) => {
  if (apiRoutes(req)) {
    return NextResponse.next();
  }
  const { userId, sessionClaims } = auth();
  if (userId && isOnboardingRoute(req)) {
    return NextResponse.next();
  }
  if (!userId && !publicRoutes(req)) {
    const signInUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }
  if (userId && !sessionClaims?.metadata?.role) {
    const onboardingUrl = new URL("/complete/select-type", req.url);
    return NextResponse.redirect(onboardingUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
