import { NextRequest, NextResponse } from 'next/server';

// Smart key rotation: tracks usage and distributes load evenly
let currentKeyIndex = 0;
let keyUsageCount: { [key: number]: number } = {};

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

    // Initialize usage tracking for all keys
    for (let i = 0; i < apiKeys.length; i++) {
      if (keyUsageCount[i] === undefined) {
        keyUsageCount[i] = 0;
      }
    }

    console.log(`Found ${apiKeys.length} API keys | Current rotation: Key ${currentKeyIndex + 1}`);

    // Smart selection: Start with the next key in round-robin
    const startIndex = currentKeyIndex;
    let lastError: any = null;
    
    // Try keys starting from current position, then wrap around if needed
    for (let attempt = 0; attempt < apiKeys.length; attempt++) {
      const keyIndex = (startIndex + attempt) % apiKeys.length;
      const apiKey = apiKeys[keyIndex];
      console.log(`Trying Key ${keyIndex + 1} (used ${keyUsageCount[keyIndex]} times)`);

      console.log(`Trying Key ${keyIndex + 1} (used ${keyUsageCount[keyIndex]} times)`);

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

        // If successful, update tracking and return response
        if (response.ok) {
          keyUsageCount[keyIndex]++;
          currentKeyIndex = (keyIndex + 1) % apiKeys.length; // Move to next key for next request
          console.log(`✅ Key ${keyIndex + 1} success | Next rotation: Key ${currentKeyIndex + 1}`);
          const data = await response.json();
          return NextResponse.json(data);
        }

        // If rate limited, try next key
        if (response.status === 429) {
          console.log(`⚠️ Key ${keyIndex + 1} rate limited (${keyUsageCount[keyIndex]} uses), trying next...`);
          lastError = await response.json();
          continue;
        }

        // For other errors, return immediately
        const errorData = await response.json();
        return NextResponse.json(errorData, { status: response.status });

      } catch (error) {
        console.error(`Error with Key ${keyIndex + 1}:`, error);
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
