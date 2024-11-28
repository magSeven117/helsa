import { generateResponse } from '@/modules/shared/infrastructure/ai/generate-response';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const text = await generateResponse(`
        Hola, podrías decirme cual es la raíz cuadrada de 4?
      `);
    return NextResponse.json({
      text,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: '' }), {
      status: 500,
    });
  }
};
