import { BetterUser, getSession } from '@helsa/auth/server';
import { NextRequest, NextResponse } from 'next/server';
import { errorMapper } from './error-mapper';

export const withUser = (
  handler: (params: {
    req: NextRequest;
    user: BetterUser;
    params: { [key: string]: any };
    searchParams: { [key: string]: any };
  }) => Promise<NextResponse | void>,
) => {
  return async (req: NextRequest, { params }: { params: Promise<any> }) => {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const user = session.user as BetterUser;
    const urlParams = await params;
    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries());

    try {
      return handler({ req, user, params: urlParams, searchParams });
    } catch (error) {
      const formattedError = errorMapper(error);
      return NextResponse.json(
        {
          message: formattedError.message,
        },
        {
          status: formattedError.status,
        },
      );
    }
  };
};
