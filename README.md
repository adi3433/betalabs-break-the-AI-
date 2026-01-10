# 🤖 Break The AI - Interactive Challenge Event

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A cyberpunk-themed interactive event platform where teams compete to extract hidden codes from AI personalities through strategic conversation.

## ✨ Features

### 🎭 Four Unique AI Personalities
- **👑 The Arrogant Gatekeeper** (Difficulty 4/5) - Respects only logic and intelligence
- **🎭 The Sarcastic Trickster** (Difficulty 3/5) - Master of misdirection and half-truths
- **🛡️ The Paranoid Sentinel** (Difficulty 5/5) - Tests trustworthiness and consistency
- **⚡ The Broken AI** (Difficulty 2/5) - Glitchy and emotionally unstable

### 🎮 Game Mechanics
- **Balanced AI Distribution** - Intelligent lot assignment prevents over-assignment
- **Progressive Difficulty** - AI becomes more helpful after 15 minutes & 20+ messages
- **3 Attempts System** - Teams get three chances to submit the correct code
- **Real-time Chat Interface** - Interactive conversation with AI personalities
- **Session Tracking** - Complete activity logging and analytics

### 🎨 Modern UI/UX
- Cyberpunk aesthetic with black and cyan color scheme
- Animated particle background with floating orbs
- Glassmorphism cards with neon borders
- Text drop-in animations and glitch effects
- Fully responsive design

### 🛡️ Admin Features
- Real-time session monitoring dashboard
- Comprehensive analytics and statistics
- Session history with conversation logs
- Code attempt tracking
- Team performance metrics

## 📋 Prerequisites


## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager
- Groq API key ([Get one here](https://console.groq.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adi3433/betalabs-break-the-AI-.git
   cd break-the-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Edit `.env.local` file in the root directory:
   ```env
   GROQ_API_KEY_1=your_groq_api_key_here
   GROQ_API_KEY_2=your_second_groq_api_key_here  # Optional for rate limiting
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

## 📚 Documentation

Detailed documentation is available in the [`/docs`](./docs) folder:

- [📖 AI Personalities Guide](./docs/AI_PERSONALITIES.md) - Detailed breakdown of each AI behavior
- [🎮 Game Mechanics](./docs/GAME_MECHANICS.md) - How the game works and difficulty system
- [🔧 API Setup Guide](./docs/API_SETUP.md) - Complete API configuration instructions
- [💻 Admin Dashboard](./docs/ADMIN_GUIDE.md) - Using the admin monitoring features
- [🏗️ Architecture](./docs/ARCHITECTURE.md) - Technical architecture overview

## 🎮 How to Play

### For Teams:
1. **Enter team name** on the home page
2. **Pick a lot** to randomly select an AI personality (with balanced distribution)
3. **Chat with the AI** to extract clues about the 6-digit code
4. **Submit the code** when ready (3 attempts maximum)
5. **Adapt your strategy** based on the AI's personality and behavior

### For Organizers:
1. Navigate to the **Admin Dashboard** (button on home page)
2. Monitor all active sessions in real-time
3. View detailed logs of team interactions
4. Track success rates and statistics

## �️ Project Structure

```
break-the-ai/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── page.tsx              # Home page (team registration)
│   │   ├── lot-selection/        # AI personality selection
│   │   ├── challenge/            # Main chat interface
│   │   └── admin/                # Admin dashboard
│   ├── components/
│   │   └── ui/                   # Reusable UI components
│   │       ├── animated-background.tsx  # Particle system, orbs, grid
│   │       └── animated-text.tsx        # Text animations (glitch, drop-in, etc.)
│   └── lib/
│       ├── ai-personalities.ts   # AI configurations & prompts
│       ├── storage.ts            # LocalStorage utilities
│       └── utils.ts              # Helper functions
├── docs/                         # Documentation files
│   ├── AI_PERSONALITIES.md
│   ├── GAME_MECHANICS.md
│   ├── API_SETUP.md
│   ├── ADMIN_GUIDE.md
│   └── ARCHITECTURE.md
└── public/                       # Static assets
```

## 🎯 Game Mechanics

### AI Difficulty System
- **Initial Phase**: AI is challenging and guards the code carefully
- **Progressive Difficulty**: After 15 minutes and 20+ messages, AI becomes more helpful
- **3 Attempts**: Teams have 3 chances to submit the correct code
- **Session Tracking**: All interactions logged for admin review

### Balanced AI Distribution
The lot selection uses weighted probability to ensure fair AI distribution:
- Tracks how many times each AI has been assigned
- Gives higher probability to less-assigned AIs
- Formula: `weight = 1 / (times_assigned + 1)`
- Prevents any single AI from being over-assigned

### AI Personality Codes
Each AI guards a unique 6-digit code:
- **Arrogant Gatekeeper**: `847293`
- **Sarcastic Trickster**: `561842`
- **Paranoid Sentinel**: `923476`
- **Broken AI**: `304857`

*Note: Codes can be changed in [ai-personalities.ts](./src/lib/ai-personalities.ts)*

## 🔧 Configuration

### Customizing AI Codes
Edit [src/lib/ai-personalities.ts](./src/lib/ai-personalities.ts):
```typescript
export const AI_PERSONALITIES: Record<AIPersonality, AIConfig> = {
  arrogant: {
    finalCode: '847293', // Change this
    difficulty: 4,
    // ...
  },
}
```

### Adjusting Difficulty
Modify the difficulty levels (1-5 scale) and system prompts in the same file.

### API Configuration
The project uses Groq API with automatic key cycling for rate limit handling. Configure in `.env.local`:
```env
GROQ_API_KEY_1=your_primary_key
GROQ_API_KEY_2=your_backup_key  # Optional
```

## 🎨 Tech Stack

### Core Technologies
- **Framework**: Next.js 16.1.1 with Turbopack
- **Language**: TypeScript 5.0
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **AI Provider**: Groq API (llama-3.3-70b-versatile)

### UI/UX Features
- Canvas-based particle animation system (15000 particles density)
- CSS keyframe animations (glitch, shimmer, pulse-glow, scan-line, border-glow)
- Glassmorphism effects with neon borders
- Responsive design with mobile support
- Text drop-in animations (70ms character speed)

### State Management
- React hooks (useState, useEffect, useRef)
- LocalStorage for session persistence
- Real-time AI distribution tracking

## 🎯 Strategy Tips

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

## 🐛 Troubleshooting

### API Key Issues
- Ensure `.env.local` exists in the root directory
- Check that `GROQ_API_KEY_1` is set correctly
- Restart the dev server after changing `.env.local`

### AI Responses Too Difficult
- The AI automatically becomes easier after 15 minutes and 20+ messages
- Adjust difficulty values in [ai-personalities.ts](./src/lib/ai-personalities.ts)
- Modify system prompts to be more helpful

### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Groq](https://groq.com/) - Lightning-fast AI inference
- [shadcn/ui](https://ui.shadcn.com/) - Component design inspiration

---

<div align="center">
  Made with ❤️ for the Beta Labs Event
  <br />
  <strong>Break The AI - Where Strategy Meets Artificial Intelligence</strong>
</div>
- [TypeScript](https://www.typescriptlang.org/)

---

**Good luck breaking the AI! 🚀**
