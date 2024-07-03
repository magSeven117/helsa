import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export const authGuard = async (
  controller: (userId: string, req: NextRequest) => Promise<NextResponse>
) => {
  return async (req: NextRequest) => {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('', { status: 401 });
    }

    return controller(userId, req);
  };
};

export const pageAuthGuard = () => {
  const { userId } = auth();
  if (!userId) {
    return redirect('/sign-in');
  }
  return userId;
};
