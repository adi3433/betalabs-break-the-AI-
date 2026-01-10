import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages, personality, difficulty } = await req.json();

    const apiBase = process.env.OPENAI_API_BASE || 'https://api.groq.com/openai/v1';
    const model = process.env.AI_MODEL || 'llama-3.3-70b-versatile';

    // Collect all available API keys
    const apiKeys: string[] = [];
    for (let i = 1; i <= 10; i++) {
      const key = process.env[`OPENAI_API_KEY${i === 1 ? '' : `_${i}`}`];
      if (key) apiKeys.push(key);
    }
    // Also check backup key for backwards compatibility
    if (process.env.OPENAI_API_KEY_BACKUP) {
      apiKeys.push(process.env.OPENAI_API_KEY_BACKUP);
    }

    if (apiKeys.length === 0) {
      return NextResponse.json(
        { error: 'No API keys configured' },
        { status: 500 }
      );
    }

    console.log(`Found ${apiKeys.length} API keys for rotation`);

    // Try each API key in sequence until one works
    let lastError: any = null;
    for (let i = 0; i < apiKeys.length; i++) {
      const apiKey = apiKeys[i];
      console.log(`Trying API key ${i + 1}/${apiKeys.length}...`);

      try {
        const response = await fetch(`${apiBase}/chat/completions`, {
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

        // If successful, return response
        if (response.ok) {
          const data = await response.json();
          return NextResponse.json(data);
        }

        // If rate limited, try next key
        if (response.status === 429) {
          console.log(`API key ${i + 1} rate limited, trying next...`);
          lastError = await response.json();
          continue;
        }

        // For other errors, return immediately
        const errorData = await response.json();
        return NextResponse.json(errorData, { status: response.status });

      } catch (error) {
        console.error(`Error with API key ${i + 1}:`, error);
        lastError = error;
        continue;
      }
    }

    // All keys exhausted
    return NextResponse.json(
      { error: 'All API keys rate limited. Please try again in a few moments.', details: lastError },
      { status: 429 }
    );

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
