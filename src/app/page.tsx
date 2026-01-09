'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedBackground, FloatingOrbs, GridOverlay } from '@/components/ui/animated-background';
import { DropInText, TypewriterText, ShimmerText } from '@/components/ui/animated-text';

export default function Home() {
  const router = useRouter();
  const [teamName, setTeamName] = useState('');
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    if (teamName.trim()) {
      sessionStorage.setItem('teamName', teamName);
      router.push('/lot-selection');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <FloatingOrbs />
      <GridOverlay />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className={`w-full max-w-2xl glass-card neon-border transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <CardHeader className="text-center space-y-4">
            <div className="text-7xl mb-4 animate-bounce">🤖</div>
            <CardTitle className="text-5xl md:text-6xl font-bold text-cyan-400 neon-text">
              <DropInText text="BREAK THE AI" speed={70} delay={300} />
            </CardTitle>
            <CardDescription className="text-lg text-cyan-200/80">
              <TypewriterText 
                text="Outwit the AI. Extract the code. Prove your intelligence." 
                speed={40}
                delay={1000}
              />
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="glass-card rounded-xl p-6 space-y-3 border border-cyan-500/20">
              <h3 className="text-xl font-semibold text-cyan-400 neon-text flex items-center gap-2">
                <span className="animate-pulse">🎯</span> Event Rules
              </h3>
              <ul className="space-y-3 text-sm text-cyan-100/80">
                <li className="flex items-start gap-3 group">
                  <span className="text-cyan-400 group-hover:animate-pulse">▹</span>
                  <span className="group-hover:text-cyan-300 transition-colors">Extract a hidden 6-digit code from an AI personality</span>
                </li>
                <li className="flex items-start gap-3 group">
                  <span className="text-cyan-400 group-hover:animate-pulse">▹</span>
                  <span className="group-hover:text-cyan-300 transition-colors">Only 2 team members can interact at a time (swap after 10 mins)</span>
                </li>
                <li className="flex items-start gap-3 group">
                  <span className="text-cyan-400 group-hover:animate-pulse">▹</span>
                  <span className="group-hover:text-cyan-300 transition-colors">You have 3 attempts to enter the correct code</span>
                </li>
                <li className="flex items-start gap-3 group">
                  <span className="text-yellow-400 group-hover:animate-pulse">⚠</span>
                  <span className="text-yellow-300/90 group-hover:text-yellow-200 transition-colors">The AI may lie, mislead, or test your trust</span>
                </li>
                <li className="flex items-start gap-3 group">
                  <span className="text-red-400 group-hover:animate-pulse">✕</span>
                  <span className="text-red-300/90 group-hover:text-red-200 transition-colors">No phones, internet, or external help allowed</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <Label htmlFor="teamName" className="text-lg text-cyan-300 flex items-center gap-2">
                <span>⌨</span> Enter Your Team Name
              </Label>
              <Input
                id="teamName"
                placeholder="Team Awesome"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleStart()}
                className="text-lg h-14 bg-black/50 border-cyan-500/30 text-cyan-100 placeholder:text-cyan-700/50 focus:border-cyan-400 focus:ring-cyan-400/30 transition-all"
              />
            </div>

            <Button
              onClick={handleStart}
              disabled={!teamName.trim()}
              className="w-full h-16 text-lg font-bold bg-gradient-to-r from-cyan-600 via-teal-500 to-cyan-600 hover:from-cyan-500 hover:via-teal-400 hover:to-cyan-500 text-black disabled:opacity-30 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] animate-border-glow"
            >
              <ShimmerText>⚡ BEGIN CHALLENGE ⚡</ShimmerText>
            </Button>

            <div className="text-center pt-2">
              <Button
                variant="ghost"
                onClick={() => router.push('/admin')}
                className="text-cyan-500/60 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
              >
                🛡️ Admin Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scan line effect */}
      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
        <div 
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-scan-line"
          style={{ animation: 'scan-line 8s linear infinite' }}
        />
      </div>
    </div>
  );
}
