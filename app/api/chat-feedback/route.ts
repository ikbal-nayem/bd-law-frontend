import { NextResponse } from "next/server";

const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000';

export async function POST(req: Request) {
  try {
    const { message_id, rating, feedback, suggested_answer } = await req.json();

    const response = await fetch(FASTAPI_URL + '/chat/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message_id,
        rating,
        ...(feedback && { feedback }),
        ...(suggested_answer && { suggested_answer }),
      }),
    });

    if (!response.ok) {
      throw new Error(`FastAPI responded with status: ${response.status}`);
    }

    return NextResponse.json({ message: 'Feedback sent successfully' });
  } catch (error) {
    console.error('Error sending feedback:', error);
    return NextResponse.json({ error: 'Failed to send feedback' }, { status: 500 });
  }
};