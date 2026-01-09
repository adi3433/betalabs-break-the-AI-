import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages, personality, difficulty } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    const backupApiKey = process.env.OPENAI_API_KEY_BACKUP;
    const apiBase = process.env.OPENAI_API_BASE || 'https://api.groq.com/openai/v1';
    const model = process.env.AI_MODEL || 'llama-3.3-70b-versatile';

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Try primary key first
    let response = await fetch(`${apiBase}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.8,
        max_tokens: 500,
      }),
    });

    // If rate limited and backup key exists, try backup
    if (response.status === 429 && backupApiKey) {
      console.log('Primary key rate limited, switching to backup key...');
      response = await fetch(`${apiBase}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${backupApiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.8,
          max_tokens: 500,
        }),
      });
    }

    if (!response.ok) {
      const error = await response.text();
      console.error('Groq API error:', error);
      return NextResponse.json(
        { error: 'Failed to get AI response' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
