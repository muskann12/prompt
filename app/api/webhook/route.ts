import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming JSON body
    const body = await req.json();
    const { message } = body;

    // Check if 'message' is provided
    if (!message) {
      return NextResponse.json(
        { error: 'The "message" field is required.' },
        { status: 400 }
      );
    }

    // Example response logic (you can replace this with your AI logic)
    const reply = `Your message was received: "${message}". The design will be ready soon!`;

    // Send success response
    return NextResponse.json({ success: true, reply });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}