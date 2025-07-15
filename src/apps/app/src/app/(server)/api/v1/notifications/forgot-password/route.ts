import { NextRequest, NextResponse } from 'next/server';
export const POST = async (req: NextRequest) => {
  return NextResponse.json({
    message: 'Verification route is not directly accessible. Use the auth plugin to send verification emails.',
  });
};
