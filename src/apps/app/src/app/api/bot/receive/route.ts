import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  console.log(req.headers);
  console.log(await req.json());
  return NextResponse.json({
    message: 'ok',
    data: {
      name: 'test',
    },
  });
};
