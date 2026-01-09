# 🚀 BREAK THE AI - Quick Start Guide

## ⚡ For First-Time Users

### Step 1: Open the Terminal/Command Prompt

**Windows:**
- Press `Win + R`, type `cmd`, press Enter

**Mac/Linux:**
- Press `Cmd + Space`, type `terminal`, press Enter

### Step 2: Navigate to the Project

```bash
cd "c:\Users\dell\OneDrive\Desktop\beta labs (Tekeshi castle)\break-the-ai"
```

### Step 3: Configure Your API Key

1. Open the file `.env.local` in a text editor
2. Replace `your_api_key_here` with your actual API key
3. Save the file

**Example:**
```env
OPENAI_API_KEY=sk-proj-abc123xyz789...
OPENAI_API_BASE=https://api.openai.com/v1
AI_MODEL=gpt-4
```

### Step 4: Install Dependencies (First Time Only)

```bash
npm install
```

Wait 1-2 minutes for installation to complete.

### Step 5: Start the Application

```bash
npm run dev
```

You should see:
```
▲ Next.js 16.x.x
- Local:        http://localhost:3000
```

### Step 6: Open in Browser

Open your web browser and go to:
```
http://localhost:3000
```

---

## ✅ Verification Checklist

Before starting the event, verify:

- [ ] Application loads without errors
- [ ] Home page displays "BREAK THE AI"
- [ ] Can enter a team name and proceed
- [ ] Lot selection page shows 4 AI personalities
- [ ] Can pick a lot and see AI reveal
- [ ] Chat interface loads and accepts messages
- [ ] AI responds to messages (this verifies API key works)
- [ ] Can submit a 6-digit code
- [ ] Admin Dashboard is accessible

---

## 🎮 Quick Test Run

1. **Start Application**: `npm run dev`
2. **Go to**: http://localhost:3000
3. **Enter**: Test Team
4. **Pick**: Any AI personality
5. **Send**: "Hello, how are you?"
6. **Verify**: AI responds
7. **Try Code**: Enter 000000
8. **Check Admin**: Go to http://localhost:3000/admin

If all steps work, you're ready! 🎉

---

## 🔧 Common Issues & Quick Fixes

### Issue: "npm: command not found"
**Fix:** Install Node.js from [nodejs.org](https://nodejs.org/)

### Issue: "API key not configured"
**Fix:** 
1. Check `.env.local` exists in project root
2. Verify API key is correct (no extra quotes/spaces)
3. Stop server (Ctrl+C) and restart: `npm run dev`

### Issue: Application won't start
**Fix:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Issue: AI doesn't respond
**Fix:**
1. Check your internet connection
2. Verify API key is valid and has credits
3. Check browser console (F12) for errors

### Issue: Port 3000 already in use
**Fix:**
```bash
# Use a different port
PORT=3001 npm run dev
# Then visit: http://localhost:3001
```

---

## 📞 API Provider Setup

### OpenAI (Paid, Best Quality)
1. Sign up: https://platform.openai.com/
2. Add payment method
3. Generate API key
4. Use: `sk-proj-...`

### OpenRouter (Recommended - Open Source Models)
1. Sign up: https://openrouter.ai/
2. Add credits ($5 minimum)
3. Get API key
4. Configure:
   ```env
   OPENAI_API_KEY=sk-or-...
   OPENAI_API_BASE=https://openrouter.ai/api/v1
   AI_MODEL=meta-llama/llama-3.1-70b-instruct
   ```

### Together AI (Open Source Models)
1. Sign up: https://together.ai/
2. Add credits
3. Get API key
4. Configure:
   ```env
   OPENAI_API_KEY=...
   OPENAI_API_BASE=https://api.together.xyz/v1
   AI_MODEL=meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo
   ```

---

## 💰 Cost Estimates

**Per Team Session (average 30 mins):**
- GPT-4: ~$0.50-$1.00
- GPT-3.5-Turbo: ~$0.10-$0.20
- Llama 3.1 (OpenRouter): ~$0.05-$0.15
- Llama 3.1 (Together AI): ~$0.03-$0.10

**For 10 teams:**
- Budget: $5-$20 depending on model

---

## ⚙️ Recommended Models

**For Best Quality:**
- `gpt-4` or `gpt-4-turbo`

**For Cost Efficiency:**
- `gpt-3.5-turbo`

**For Open Source:**
- `meta-llama/llama-3.1-70b-instruct` (OpenRouter)
- `mistralai/mixtral-8x7b-instruct` (OpenRouter)

---

## 🎬 Event Day Workflow

### Morning (1 hour before)
1. Start application: `npm run dev`
2. Open browser to home page
3. Open Admin Dashboard on separate device
4. Do one test run
5. Clear test data

### Registration
1. Team enters name
2. Team picks lot
3. Note their AI in your records

### During Challenge
1. Monitor Admin Dashboard
2. Watch for technical issues
3. Enforce 10-minute swap rule

### After Each Team
1. Review their session in Admin
2. Note completion time and success
3. Prepare for next team

### End of Day
1. Export all session data
2. Calculate statistics
3. Back up data

---

## 🎯 Ready to Go Commands

```bash
# Start the application
npm run dev

# Stop the application
# Press: Ctrl + C

# Build for production
npm run build

# Run production build
npm start
```

---

## 📱 Access URLs

- **Main Application**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **Lot Selection**: http://localhost:3000/lot-selection
- **Challenge Page**: http://localhost:3000/challenge

---

## 🆘 Emergency Contacts

**Project Location:**
```
c:\Users\dell\OneDrive\Desktop\beta labs (Tekeshi castle)\break-the-ai
```

**Important Files:**
- Configuration: `.env.local`
- AI Codes: `src/lib/ai-personalities.ts`
- Rules: `PARTICIPANT_RULES.md`
- Setup Guide: `SETUP_GUIDE.md`
- This Guide: `QUICK_START.md`

---

## ✨ You're All Set!

If you can:
1. ✅ Start the application
2. ✅ See the home page
3. ✅ Get AI responses
4. ✅ Access Admin Dashboard

**Then you're ready to run your event! Good luck! 🚀**

---

*For detailed setup, see SETUP_GUIDE.md*
*For event day checklist, see EVENT_CHECKLIST.md*
*For AI codes reference, see CODES_REFERENCE.md*
