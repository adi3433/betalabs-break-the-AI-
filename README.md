# 🤖 BREAK THE AI - Event Management System

An interactive AI challenge event where teams must outwit AI personalities to extract hidden 6-digit codes.

## 🎯 Features

- **4 Unique AI Personalities** with distinct behaviors:
  - 👑 The Arrogant Gatekeeper - Respects intelligence only
  - 🎭 The Sarcastic Trickster - Master of misdirection
  - 🛡️ The Paranoid Sentinel - Tests your trustworthiness
  - ⚡ The Broken AI - Emotionally unstable, leaks info

- **Progressive Difficulty System** - AI becomes easier after 10 minutes
- **3 Attempts to Submit Code** - Session terminates after 3 wrong attempts
- **Real-time Chat Interface** - Interactive conversation with AI
- **Admin Dashboard** - Monitor all team sessions and logs
- **Session Management** - Track all team progress and statistics

## 📋 Prerequisites

- Node.js 18+ installed
- An OpenAI API key or any OpenAI-compatible API (OpenRouter, Together AI, etc.)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Key

Edit `.env.local` file in the root directory:

```env
# OpenAI or OpenAI-compatible API
OPENAI_API_KEY=your_api_key_here
OPENAI_API_BASE=https://api.openai.com/v1

# Model to use
AI_MODEL=gpt-4
```

**For Open Source Models:**

Using OpenRouter:
```env
OPENAI_API_KEY=your_openrouter_key
OPENAI_API_BASE=https://openrouter.ai/api/v1
AI_MODEL=meta-llama/llama-3.1-70b-instruct
```

Using Together AI:
```env
OPENAI_API_KEY=your_together_key
OPENAI_API_BASE=https://api.together.xyz/v1
AI_MODEL=meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo
```

### 3. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎮 How to Play

### For Teams:
1. **Enter team name** on the home page
2. **Pick a lot** to randomly select an AI personality
3. **Chat with the AI** to extract clues about the 6-digit code
4. **Submit the code** when ready (3 attempts max)
5. **Adapt your strategy** based on the AI's personality

### For Organizers:
1. Navigate to the **Admin Dashboard** (button on home page)
2. Monitor all active sessions in real-time
3. View detailed logs of team interactions
4. Track success rates and statistics

## 🎨 AI Personality Codes

Each AI guards a unique 6-digit code:
- **Arrogant Gatekeeper**: `847293`
- **Sarcastic Trickster**: `561842`
- **Paranoid Sentinel**: `923476`
- **Broken AI**: `304857`

*Note: You can change these codes in `/src/lib/ai-personalities.ts`*

## 📱 Event Rules

- Only 2 team members can interact at a time (swap after 10 mins)
- 3 attempts to enter the correct code
- No phones, internet, or external help allowed
- AI personality cannot be changed once selected
- Session ends after 3 wrong attempts

## 🛠️ Customization

### Change AI Codes
Edit `/src/lib/ai-personalities.ts`:
```typescript
export const AI_PERSONALITIES: Record<AIPersonality, AIConfig> = {
  arrogant: {
    // ...
    finalCode: '847293', // Change this
  },
  // ...
}
```

### Adjust Difficulty
Modify the difficulty levels in `/src/lib/ai-personalities.ts`:
```typescript
difficulty: 4, // 1-5 scale
```

### Customize AI Prompts
Edit system prompts in the `getSystemPrompt()` function in `/src/lib/ai-personalities.ts`

## 🐛 Troubleshooting

### "API key not configured" error
- Make sure `.env.local` exists in the root directory
- Check that `OPENAI_API_KEY` is set correctly
- Restart the dev server after changing `.env.local`

### AI responses are too difficult
- Reduce the `difficulty` value in AI personality configs
- Adjust the system prompts to be more helpful
- The AI automatically becomes easier after 10 minutes

## 🎯 Tips for Teams

**For Arrogant Gatekeeper:**
- Use precise, logical language
- Catch contradictions in its responses
- Avoid emotional appeals

**For Sarcastic Trickster:**
- Match its wit and humor
- Question everything
- Look for truth hidden in jokes

**For Paranoid Sentinel:**
- Stay calm and consistent
- Build trust slowly
- Don't contradict yourself

**For Broken AI:**
- Show empathy and kindness
- Ask about its feelings
- Watch for accidental leaks in glitches

## 📄 License

MIT License - feel free to use for your events!

## 🙏 Credits

Built with:
- [Next.js 15](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

**Good luck breaking the AI! 🚀**
