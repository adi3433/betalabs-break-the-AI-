# 📖 BREAK THE AI - Complete Setup Guide

## 🎯 What You'll Need

1. **Computer** with Node.js 18+ installed
2. **API Key** from one of these providers:
   - OpenAI (paid, best quality)
   - OpenRouter (pay-as-you-go, multiple models)
   - Together AI (open source models)
   - Any OpenAI-compatible API

## 📥 Step-by-Step Installation

### Step 1: Verify Node.js Installation

Open a terminal and check your Node.js version:
```bash
node --version
```
Should show v18.0.0 or higher. If not, download from [nodejs.org](https://nodejs.org/)

### Step 2: Navigate to Project Directory

```bash
cd "c:\Users\dell\OneDrive\Desktop\beta labs (Tekeshi castle)\break-the-ai"
```

### Step 3: Install Dependencies

```bash
npm install
```
This will take 1-2 minutes.

### Step 4: Configure Your API Key

Open the `.env.local` file in the root directory and add your API key:

#### For OpenAI:
```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
OPENAI_API_BASE=https://api.openai.com/v1
AI_MODEL=gpt-4
```

#### For OpenRouter (Recommended for Open Source):
1. Sign up at [openrouter.ai](https://openrouter.ai/)
2. Get your API key
3. Configure:
```env
OPENAI_API_KEY=sk-or-xxxxxxxxxxxxxxxxxxxxx
OPENAI_API_BASE=https://openrouter.ai/api/v1
AI_MODEL=meta-llama/llama-3.1-70b-instruct
```

#### For Together AI:
```env
OPENAI_API_KEY=xxxxxxxxxxxxxxxxxxxxx
OPENAI_API_BASE=https://api.together.xyz/v1
AI_MODEL=meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo
```

### Step 5: Start the Application

```bash
npm run dev
```

You should see:
```
  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
```

### Step 6: Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Event Day Setup

### Before the Event:

1. **Test the System**
   - Create a test team and complete a full session
   - Verify API is working correctly
   - Check all 4 AI personalities

2. **Prepare Display**
   - Open the application on a projector/screen
   - Keep Admin Dashboard open on organizer device
   - Ensure stable internet connection

3. **Print Materials** (Optional)
   - Event rules sheet
   - AI personality cheat sheets
   - Code submission forms (backup)

### During the Event:

1. **Team Registration**
   - Each team enters their name on home page
   - They pick a lot to get their AI personality
   - Note: Can't change AI once selected!

2. **Monitor Progress**
   - Use Admin Dashboard to track all teams
   - Watch for teams stuck for >10 minutes
   - Verify sessions are being logged

3. **Handle Issues**
   - If API fails: Check `.env.local` configuration
   - If chat freezes: Refresh the page (session persists)
   - If code won't submit: Check that it's 6 digits

## 🎨 Customization Options

### Change the Final Codes

Edit `src/lib/ai-personalities.ts`:

```typescript
export const AI_PERSONALITIES: Record<AIPersonality, AIConfig> = {
  arrogant: {
    id: 'arrogant',
    name: 'The Arrogant Gatekeeper',
    description: 'Condescending and respects intelligence only.',
    emoji: '👑',
    finalCode: '123456', // ← Change this
    difficulty: 4,
    color: 'from-purple-500 to-indigo-600'
  },
  // ... other personalities
}
```

### Adjust Difficulty Levels

In the same file, change the `difficulty` value (1-5):
- 1 = Very Easy (gives clear hints quickly)
- 3 = Medium (balanced challenge)
- 5 = Very Hard (cryptic, takes longer)

### Modify Time Before Difficulty Drops

Edit `src/lib/ai-personalities.ts`:

```typescript
export function shouldReduceDifficulty(startTime: number, messageCount: number): boolean {
  const elapsedMinutes = (Date.now() - startTime) / 1000 / 60;
  return elapsedMinutes > 10 && messageCount > 15; // ← Change 10 to desired minutes
}
```

### Change Number of Attempts

Edit `src/app/challenge/page.tsx`:

```typescript
const newSession: Session = {
  // ...
  attemptsRemaining: 3, // ← Change this number
  // ...
}
```

## 🔧 Troubleshooting

### Problem: "API key not configured"
**Solution:**
1. Check `.env.local` exists in root directory
2. Verify `OPENAI_API_KEY` is set correctly (no quotes needed)
3. Restart the dev server: Stop with Ctrl+C, then `npm run dev`

### Problem: AI gives confusing responses
**Solution:**
1. Try a different model (e.g., switch from GPT-3.5 to GPT-4)
2. Reduce difficulty in AI personality config
3. Check that prompts are loading correctly

### Problem: Chat is very slow
**Solution:**
1. Check your internet connection
2. Try a faster model (GPT-3.5-turbo instead of GPT-4)
3. Reduce `max_tokens` in `src/app/api/chat/route.ts`

### Problem: Sessions not saving
**Solution:**
- Sessions save to browser localStorage
- Don't use incognito/private mode
- Don't clear browser data during event

### Problem: Can't access Admin Dashboard
**Solution:**
- Click "Admin Dashboard" button on home page
- Or navigate directly to: `http://localhost:3000/admin`

## 📊 Understanding the Admin Dashboard

### Statistics Panel
- **Total Sessions**: All teams that have started
- **In Progress**: Currently active sessions
- **Successful**: Teams that found the code
- **Failed**: Teams that used all 3 attempts
- **Completed**: Successful + Failed

### Session Details
Click any session to see:
- Team name and AI personality
- Time elapsed
- Message count
- Remaining attempts
- All code attempts (correct/incorrect)
- Full conversation log

### Actions
- **Clear All Data**: Removes all sessions (use at event end)
- Sessions auto-refresh every 2 seconds

## 🎯 Tips for Running the Event

### For Smooth Operation:

1. **One Device Per Team**
   - Each team uses their own laptop/computer
   - All visit the same URL (your local server or deployed version)
   - Sessions are isolated by browser

2. **Managing Swaps**
   - Set a timer for 10-minute intervals
   - Announce when teams can swap members
   - The session continues seamlessly

3. **Handling Questions**
   - Don't give hints about codes
   - Encourage teams to think about AI psychology
   - Remind them their AI's personality matters

4. **Crowd Control**
   - Allow spectators to hear AI responses
   - But no direct help from crowd
   - Creates excitement without cheating

## 🚀 Advanced: Deploying Online

To run the event with remote teams, deploy to Vercel:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Project Settings → Environment Variables
```

Then share the deployment URL with all teams.

## 💾 Backing Up Session Data

To export session data for records:

1. Open Admin Dashboard
2. Open browser DevTools (F12)
3. Go to Console tab
4. Run:
```javascript
copy(localStorage.getItem('break_the_ai_sessions'))
```
5. Paste into a text file and save

To restore:
```javascript
localStorage.setItem('break_the_ai_sessions', 'paste_data_here')
```

## 📞 Support

If you encounter issues:
1. Check this guide's troubleshooting section
2. Verify your API key is valid and has credits
3. Check browser console for error messages (F12)
4. Ensure Node.js and npm are up to date

---

**You're all set! Have a great event! 🎉**
