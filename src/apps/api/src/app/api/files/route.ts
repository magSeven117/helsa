import { handleUpload, HandleUploadBody } from '@vercel/blob/client';
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '../../actions/user/get-current-user';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const body = (await req.json()) as HandleUploadBody;
  try {
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        const data = await getCurrentUser();
        if (!data) {
          throw new Error('Unauthorized');
        }

        return {
          tokenPayload: JSON.stringify({ user: data.data }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {},
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 } // The webhook will retry 5 times waiting for a 200
    );
  }
};
