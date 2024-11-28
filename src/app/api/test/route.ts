import { generateEmbeddings } from '@/modules/shared/infrastructure/ai/generate-embeddings';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const embeddings = await generateEmbeddings(`
        Dr. Jose Veliz, specialist in cardiology or general medicine.
        with a consulting score above of 4.5.
        and more than 10 years of experience.
        with disponibility on:
        Monday 2024-12-02
      `);
    return NextResponse.json({
      embeddings,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: '' }), {
      status: 500,
    });
  }
};
