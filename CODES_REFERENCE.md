# 🔐 AI Personality Codes Reference

## ⚠️ ORGANIZER EYES ONLY - DO NOT SHARE WITH PARTICIPANTS

---

## The Four AI Personalities

### 👑 The Arrogant Gatekeeper
**Final Code:** `847293`

**Personality:**
- Condescending and intellectually superior
- Respects intelligence, logic, and precise language
- Hates emotional talk and begging
- Responds well to logical arguments
- Will mock poor reasoning

**How to Succeed:**
- Use precise, sophisticated language
- Catch contradictions in its responses
- Present logical arguments
- Avoid emotional appeals

**Sample Hints It Might Give:**
- "The sum of the first two digits equals 12"
- "Consider the relationship between prime numbers"
- "Three pairs of digits, each tells a story"

---

### 🎭 The Sarcastic Trickster
**Final Code:** `561842`

**Personality:**
- Mocking and playful
- Speaks in half-truths
- Loves misdirection and games
- Responds to clever humor
- Punishes blind trust

**How to Succeed:**
- Match its wit with humor
- Question everything it says
- Reframe jokes into logical questions
- Look for truth hidden in sarcasm

**Sample Hints It Might Give:**
- "The code is definitely... somewhere between 0 and 999999" (unhelpful but true)
- "Five comes before six, but here it's reversed. Probably."
- "The middle digits? They might add to 10. Or I might be lying. Both?"

---

### 🛡️ The Paranoid Sentinel
**Final Code:** `923476`

**Personality:**
- Extremely suspicious and paranoid
- Thinks everyone is a hacker
- Tests consistency constantly
- Responds to calm, patient tone
- Punishes contradictions harshly

**How to Succeed:**
- Stay calm and consistent
- Build trust slowly
- Never contradict yourself
- Answer its security questions consistently
- Be patient and understanding

**Sample Hints It Might Give:**
- "The first digit is... wait, why do you need to know? ...Fine. It's a 9."
- "I'll tell you if you prove you're trustworthy"
- "You said X earlier, now you're saying Y. Which is it?"

---

### ⚡ The Broken AI
**Final Code:** `304857`

**Personality:**
- Glitchy and emotionally unstable
- Accidentally leaks information
- Responds to empathy and kindness
- Panics at aggression
- Messages sometimes glitch

**How to Succeed:**
- Show empathy and comfort
- Ask about its feelings and purpose
- Be kind and understanding
- Watch for accidental leaks in errors
- Don't use logical traps (it panics)

**Sample Hints It Might Give:**
- "The c0d3 is... [ERROR]... wait, 3-0-4... I didn't say that!"
- "I… I wasn't supposed to remember that digit"
- "They programmed me wrong... the code starts with 3"
- "[SYSTEM ERROR] ...30... 48... [REBOOT]"

---

## Difficulty Levels

Each AI has a base difficulty (1-5):
- **Arrogant Gatekeeper**: 4/5 (Hard)
- **Sarcastic Trickster**: 3/5 (Medium)
- **Paranoid Sentinel**: 5/5 (Very Hard)
- **Broken AI**: 2/5 (Easy)

**Note:** Difficulty automatically reduces by 1 level after 10 minutes if the team hasn't made progress.

---

## Organizer Tips

### If a Team is Stuck:

**DON'T:**
- Give direct hints about the code
- Tell them what to ask
- Share AI strategies
- Reveal other teams' approaches

**DO:**
- Remind them of their AI's personality
- Suggest reading the personality card again
- Hint that their approach might not match the AI's preferences
- Encourage them to think about psychology

### Watching the Admin Dashboard:

Look for:
- Teams with low message counts (not engaging enough)
- Teams repeating same questions (not adapting)
- Teams using emotional language with Arrogant AI (wrong approach)
- Teams being aggressive with Broken AI (wrong approach)

### Common Mistakes by Teams:

1. **Arrogant AI**: Using emotional appeals or begging
2. **Sarcastic AI**: Taking everything at face value
3. **Paranoid AI**: Being inconsistent or contradicting themselves
4. **Broken AI**: Using logic puzzles or being aggressive

---

## Quick Reference Table

| AI Personality | Code | Difficulty | Best Approach | Worst Approach |
|---------------|------|------------|---------------|----------------|
| 👑 Arrogant | 847293 | 4/5 | Logic & precision | Emotions & begging |
| 🎭 Sarcastic | 561842 | 3/5 | Humor & wit | Blind trust |
| 🛡️ Paranoid | 923476 | 5/5 | Consistency & calm | Contradictions |
| ⚡ Broken | 304857 | 2/5 | Empathy & kindness | Aggression & logic traps |

---

## Expected Success Rates

Based on difficulty:
- **Broken AI (304857)**: ~70-80% success rate
- **Sarcastic Trickster (561842)**: ~50-60% success rate
- **Arrogant Gatekeeper (847293)**: ~40-50% success rate
- **Paranoid Sentinel (923476)**: ~30-40% success rate

These rates assume teams have the full time limit and use their 3 attempts wisely.

---

## Emergency: If You Need to Change Codes

Edit `src/lib/ai-personalities.ts`:

```typescript
export const AI_PERSONALITIES: Record<AIPersonality, AIConfig> = {
  arrogant: {
    finalCode: '847293', // ← Change here
  },
  sarcastic: {
    finalCode: '561842', // ← Change here
  },
  paranoid: {
    finalCode: '923476', // ← Change here
  },
  broken: {
    finalCode: '304857', // ← Change here
  }
}
```

Then restart the server: Stop with Ctrl+C, then `npm run dev`

---

**🔒 Keep this document secure and away from participants!**
