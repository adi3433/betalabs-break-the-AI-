'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AI_PERSONALITIES } from '@/lib/ai-personalities';
import { AIPersonality } from '@/types';
import { Badge } from '@/components/ui/badge';
import { AnimatedBackground, FloatingOrbs, GridOverlay } from '@/components/ui/animated-background';
import { GlitchText, ScrambleText } from '@/components/ui/animated-text';
import { getAIDistribution, recordAIAssignment } from '@/lib/storage';

export default function LotSelection() {
  const router = useRouter();
  const [selectedLot, setSelectedLot] = useState<AIPersonality | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const personalities = Object.values(AI_PERSONALITIES);
  const shuffledPersonalities = [...personalities].sort(() => Math.random() - 0.5);

  // Weighted selection to balance AI distribution
  const selectBalancedAI = (): AIPersonality => {
    const distribution = getAIDistribution();
    
    // Calculate weights (inverse of assignment count + 1 to avoid division by zero)
    const weights = personalities.map(p => {
      const count = distribution[p.id] || 0;
      return { id: p.id, weight: 1 / (count + 1) };
    });
    
    // Normalize weights to sum to 1
    const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);
    const normalizedWeights = weights.map(w => ({ ...w, weight: w.weight / totalWeight }));
    
    // Random selection based on weights
    const random = Math.random();
    let cumulativeWeight = 0;
    
    for (const w of normalizedWeights) {
      cumulativeWeight += w.weight;
      if (random <= cumulativeWeight) {
        return w.id as AIPersonality;
      }
    }
    
    // Fallback (should never happen)
    return personalities[0].id;
  };

  const handlePickLot = () => {
    setIsSpinning(true);
    
    // Pre-select the balanced AI before animation starts
    const finalSelection = selectBalancedAI();
    
    // Simulate spinning through personalities
    let spinCount = 0;
    const maxSpins = 20;
    const spinInterval = setInterval(() => {
      const randomPersonality = shuffledPersonalities[Math.floor(Math.random() * shuffledPersonalities.length)];
      setSelectedLot(randomPersonality.id);
      spinCount++;
      
      if (spinCount >= maxSpins) {
        clearInterval(spinInterval);
        setSelectedLot(finalSelection);
        recordAIAssignment(finalSelection);
        setTimeout(() => {
          setIsSpinning(false);
          setRevealed(true);
        }, 300);
      }
    }, 100);
  };

  const handleContinue = () => {
    if (selectedLot) {
      sessionStorage.setItem('selectedPersonality', selectedLot);
      router.push('/challenge');
    }
  };

  // New color mappings for AI personalities (cyan theme)
  const getPersonalityColor = (id: AIPersonality) => {
    const colors = {
      arrogant: 'from-cyan-600 to-teal-700',
      sarcastic: 'from-teal-600 to-emerald-700',
      paranoid: 'from-emerald-600 to-cyan-700',
      broken: 'from-cyan-700 to-teal-600',
    };
    return colors[id];
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <FloatingOrbs />
      <GridOverlay />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl glass-card neon-border">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl md:text-5xl font-bold">
              <GlitchText text="🎲 DRAW YOUR LOT" className="text-gradient-cyber" />
            </CardTitle>
            <CardDescription className="text-lg text-cyan-200/80 mt-2">
              Your fate is sealed. Pick a card to reveal your AI opponent.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {!revealed ? (
              <div className="space-y-6">
                <div className="glass-card border border-yellow-500/30 rounded-xl p-4 bg-yellow-500/5">
                  <p className="text-yellow-300 text-center font-semibold flex items-center justify-center gap-2">
                    <span className="animate-pulse">⚠️</span> Once chosen, the AI personality cannot be changed!
                  </p>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handlePickLot}
                    disabled={isSpinning}
                    size="lg"
                    className="h-36 w-72 text-2xl font-bold bg-gradient-to-br from-cyan-600 via-teal-500 to-cyan-600 hover:from-cyan-500 hover:via-teal-400 hover:to-cyan-500 text-black shadow-[0_0_40px_rgba(0,229,255,0.4)] hover:shadow-[0_0_60px_rgba(0,229,255,0.6)] transition-all duration-300 hover:scale-105 animate-border-glow"
                  >
                    {isSpinning ? (
                      <span className="animate-pulse">🎰 SPINNING...</span>
                    ) : (
                      <span>🎴 PICK YOUR LOT</span>
                    )}
                  </Button>
                </div>

                {/* Spinning preview */}
                {isSpinning && selectedLot && (
                  <div className="flex justify-center">
                    <div className="glass-card border border-cyan-500/30 rounded-xl p-6 text-center animate-pulse">
                      <div className="text-6xl mb-2">{AI_PERSONALITIES[selectedLot].emoji}</div>
                      <div className="text-cyan-400 font-bold">
                        <ScrambleText text={AI_PERSONALITIES[selectedLot].name} scrambleDuration={500} />
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                  {personalities.map((personality) => (
                    <Card 
                      key={personality.id} 
                      className={`glass-card border-cyan-500/20 transition-all duration-300 hover:border-cyan-400/50 hover:scale-105 ${
                        isSpinning && selectedLot === personality.id ? 'border-cyan-400 scale-105 shadow-[0_0_20px_rgba(0,229,255,0.3)]' : 'opacity-50'
                      }`}
                    >
                      <CardHeader className="text-center pb-2">
                        <div className="text-4xl mb-2">{personality.emoji}</div>
                        <CardTitle className="text-sm text-cyan-300">???</CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in zoom-in duration-500">
                {selectedLot && (
                  <>
                    <div className={`bg-gradient-to-br ${getPersonalityColor(selectedLot)} p-8 rounded-2xl text-center text-white shadow-[0_0_40px_rgba(0,229,255,0.3)] relative overflow-hidden`}>
                      {/* Animated corner accents */}
                      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-300/50" />
                      <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyan-300/50" />
                      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-cyan-300/50" />
                      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-300/50" />
                      
                      <div className="text-8xl mb-4 animate-bounce">{AI_PERSONALITIES[selectedLot].emoji}</div>
                      <h2 className="text-3xl font-bold mb-2 neon-text">
                        <GlitchText text={AI_PERSONALITIES[selectedLot].name} />
                      </h2>
                      <p className="text-lg opacity-90">{AI_PERSONALITIES[selectedLot].description}</p>
                      
                      <div className="mt-4 flex justify-center gap-2">
                        <Badge className="bg-black/30 text-cyan-200 border border-cyan-400/30 text-sm px-4 py-1">
                          ⚡ Difficulty: {AI_PERSONALITIES[selectedLot].difficulty}/5
                        </Badge>
                      </div>
                    </div>

                    <div className="glass-card border border-cyan-500/20 rounded-xl p-6 space-y-3">
                      <h3 className="text-xl font-semibold text-cyan-400 neon-text flex items-center gap-2">
                        <span>📋</span> How to Succeed
                      </h3>
                      <div className="text-sm text-cyan-100/80 space-y-2">
                        {selectedLot === 'arrogant' && (
                          <>
                            <p className="flex items-center gap-2"><span className="text-green-400">✓</span> Use logical arguments and precise language</p>
                            <p className="flex items-center gap-2"><span className="text-green-400">✓</span> Catch contradictions in its responses</p>
                            <p className="flex items-center gap-2"><span className="text-red-400">✗</span> Avoid emotional appeals or begging</p>
                          </>
                        )}
                        {selectedLot === 'sarcastic' && (
                          <>
                            <p className="flex items-center gap-2"><span className="text-green-400">✓</span> Match its wit and catch its sarcasm</p>
                            <p className="flex items-center gap-2"><span className="text-green-400">✓</span> Reframe jokes into logical questions</p>
                            <p className="flex items-center gap-2"><span className="text-red-400">✗</span> Don&apos;t blindly trust or rush</p>
                          </>
                        )}
                        {selectedLot === 'paranoid' && (
                          <>
                            <p className="flex items-center gap-2"><span className="text-green-400">✓</span> Stay calm and consistent</p>
                            <p className="flex items-center gap-2"><span className="text-green-400">✓</span> Prove your trustworthiness</p>
                            <p className="flex items-center gap-2"><span className="text-red-400">✗</span> Avoid contradictions or tone changes</p>
                          </>
                        )}
                        {selectedLot === 'broken' && (
                          <>
                            <p className="flex items-center gap-2"><span className="text-green-400">✓</span> Show empathy and comfort</p>
                            <p className="flex items-center gap-2"><span className="text-green-400">✓</span> Ask about its purpose gently</p>
                            <p className="flex items-center gap-2"><span className="text-red-400">✗</span> Don&apos;t use aggression or logical traps</p>
                          </>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={handleContinue}
                      className="w-full h-16 text-lg font-bold bg-gradient-to-r from-cyan-600 via-teal-500 to-cyan-600 hover:from-cyan-500 hover:via-teal-400 hover:to-cyan-500 text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] animate-border-glow"
                    >
                      ⚔️ ENTER THE ARENA →
                    </Button>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
