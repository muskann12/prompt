import { NextRequest, NextResponse } from 'next/server';
import { convertRomanUrduToEnglishPrompt } from '@/lib/prompt-genie/api'; // ✅ import your function

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const romanUrduText = body?.message;

    if (!romanUrduText) {
      return NextResponse.json({ error: 'Missing message in body' }, { status: 400 });
    }

    const result = await convertRomanUrduToEnglishPrompt(romanUrduText);

    return NextResponse.json({
      success: true,
      englishPrompt: result.englishPrompt,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}