import { NextRequest, NextResponse } from 'next/server';
import { analyzeWebsite } from '@/lib/seo/analyzerService';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30; // 30s timeout on Vercel Pro/Hobby

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid website URL.' },
        { status: 400 }
      );
    }

    const report = await analyzeWebsite(url);

    return NextResponse.json(
      {
        success: true,
        report,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=120',
        },
      }
    );
  } catch (err: any) {
    const errorMessage = err?.message || 'An unexpected error occurred during website analysis.';
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 400 }
    );
  }
}
