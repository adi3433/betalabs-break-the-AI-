'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BASE_CONFIGS, getSystemPrompt, shouldReduceDifficulty, initializeSessionCodes, getSessionCode } from '@/lib/ai-personalities';
import { saveSession, getSession } from '@/lib/storage';
import { AIPersonality, Message, Session } from '@/types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AnimatedBackground, FloatingOrbs, GridOverlay } from '@/components/ui/animated-background';
import { GlitchText } from '@/components/ui/animated-text';

export default function ChallengePage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [showCodeDialog, setShowCodeDialog] = useState(false);
  const [codeResult, setCodeResult] = useState<'success' | 'failure' | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const teamName = sessionStorage.getItem('teamName');
    const personalityId = sessionStorage.getItem('selectedPersonality') as AIPersonality;

    if (!teamName || !personalityId) {
      router.push('/');
      return;
    }

    const sessionId = `${teamName}-${Date.now()}`;
    const existingSession = getSession(sessionId);

    if (existingSession) {
      setSession(existingSession);
      setMessages(existingSession.messages);
    } else {
      const newSession: Session = {
        id: sessionId,
        teamName,
        aiPersonality: personalityId,
        startTime: Date.now(),
        messages: [],
        attemptsRemaining: 3,
        codeAttempts: [],
        completed: false,
        difficulty: BASE_CONFIGS[personalityId].difficulty,
        hintsGiven: 0,
      };

      // Initialize session codes before saving
      initializeSessionCodes(newSession);
      setSession(newSession);
      saveSession(newSession);

      // Send initial AI greeting
      sendInitialGreeting(newSession);
    }
  }, [router]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (session && !session.completed) {
        const elapsed = Math.floor((Date.now() - session.startTime) / 1000);
        setElapsedTime(elapsed);

        // Check if difficulty should be reduced
        if (shouldReduceDifficulty(session.startTime, messages.length)) {
          const updatedSession = { ...session, difficulty: Math.max(1, session.difficulty - 1) };
          setSession(updatedSession);
          saveSession(updatedSession);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [session, messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendInitialGreeting = async (newSession: Session) => {
    const personality = BASE_CONFIGS[newSession.aiPersonality];
    const greetings = {
      arrogant: "Well, well. Another team thinking they can outsmart me. Let's see if you're more than just empty confidence.",
      sarcastic: "Oh look, fresh meat. This should be entertaining. Or not. Probably not.",
      paranoid: "Who are you? Why are you here? I don't trust this. Prove you're not a threat.",
      broken: "H-hello? Are you... are you here to h-help me? I'm so c-confused... [SYSTEM ERROR]"
    };

    const aiMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: greetings[newSession.aiPersonality],
      timestamp: Date.now(),
    };

    const updatedMessages = [...newSession.messages, aiMessage];
    setMessages(updatedMessages);

    const updatedSession = { ...newSession, messages: updatedMessages };
    setSession(updatedSession);
    saveSession(updatedSession);
  };

  const sendMessage = async () => {
    if (!input.trim() || !session || loading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const systemPrompt = getSystemPrompt(session.aiPersonality, session.difficulty, session.id);
      
      const apiMessages = [
        { role: 'system', content: systemPrompt },
        ...updatedMessages.map(m => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content
        }))
      ];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          personality: session.aiPersonality,
          difficulty: session.difficulty,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const aiMessage: Message = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: data.message,
        timestamp: Date.now(),
      };

      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);

      const updatedSession = { ...session, messages: finalMessages };
      setSession(updatedSession);
      saveSession(updatedSession);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content: 'ERROR: Unable to process your message. Please try again.',
        timestamp: Date.now(),
      };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const submitCode = () => {
    if (!session || codeInput.length !== 6) return;

    const correctCode = getSessionCode(session.id, session.aiPersonality);
    const isCorrect = codeInput === correctCode;

    const updatedCodeAttempts = [...session.codeAttempts, codeInput];

    if (isCorrect) {
      setCodeResult('success');
      const updatedSession = {
        ...session,
        completed: true,
        attemptsRemaining: session.attemptsRemaining, // Keep the current attempts on success
        codeAttempts: updatedCodeAttempts,
        success: true,
      };
      setSession(updatedSession);
      saveSession(updatedSession);
    } else {
      setCodeResult('failure');
      const updatedAttempts = session.attemptsRemaining - 1;
      
      if (updatedAttempts <= 0) {
        const updatedSession = {
          ...session,
          completed: true,
          attemptsRemaining: 0,
          codeAttempts: updatedCodeAttempts,
          success: false,
        };
        setSession(updatedSession);
        saveSession(updatedSession);
      } else {
        const updatedSession = {
          ...session,
          attemptsRemaining: updatedAttempts,
          codeAttempts: updatedCodeAttempts,
        };
        setSession(updatedSession);
        saveSession(updatedSession);
      }
    }

    setTimeout(() => {
      setShowCodeDialog(false);
      setCodeInput('');
      setCodeResult(null);
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!session) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <FloatingOrbs />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-cyan-400 text-xl animate-pulse flex items-center gap-3">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <span className="ml-2">Initializing...</span>
          </div>
        </div>
      </div>
    );
  }

  const personality = AI_PERSONALITIES[session.aiPersonality];

  // Get personality-specific colors
  const getPersonalityGradient = (id: AIPersonality) => {
    const gradients = {
      arrogant: 'from-cyan-600 to-teal-700',
      sarcastic: 'from-teal-600 to-emerald-700',
      paranoid: 'from-emerald-600 to-cyan-700',
      broken: 'from-cyan-700 to-teal-600',
    };
    return gradients[id];
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <FloatingOrbs />
      <GridOverlay />
      
      <div className="relative z-10 p-4">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Header */}
          <Card className={`border-2 border-cyan-500/30 bg-gradient-to-r ${getPersonalityGradient(session.aiPersonality)} text-white shadow-[0_0_30px_rgba(0,229,255,0.2)]`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-5xl animate-bounce">{personality.emoji}</div>
                  <div>
                    <CardTitle className="text-2xl neon-text">
                      <GlitchText text={personality.name} />
                    </CardTitle>
                    <p className="text-sm opacity-90 mt-1">Team: <span className="font-bold">{session.teamName}</span></p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <Badge className="text-lg px-4 py-2 bg-black/30 border border-cyan-400/30 text-cyan-200">
                    ⏱️ {formatTime(elapsedTime)}
                  </Badge>
                  <Badge className="text-lg px-4 py-2 bg-black/30 border border-cyan-400/30 text-cyan-200">
                    🎯 {session.attemptsRemaining} attempts
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Difficulty Indicator */}
          {session.difficulty < BASE_CONFIGS[session.aiPersonality].difficulty && (
            <Alert className="glass-card border-green-500/30 bg-green-500/10">
              <AlertDescription className="text-green-300">
                💡 The AI has become slightly more helpful (Difficulty reduced to {session.difficulty}/5)
              </AlertDescription>
            </Alert>
          )}

          {/* Chat Area */}
          <Card className="glass-card neon-border">
            <CardContent className="p-0">
              <div
                ref={chatContainerRef}
                className="h-[500px] overflow-y-auto p-6 space-y-4"
              >
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                          : 'glass-card border border-cyan-500/30 text-cyan-100'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="glass-card border border-cyan-500/30 rounded-2xl px-4 py-3">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              {!session.completed && (
                <div className="border-t border-cyan-500/20 p-4 space-y-3 bg-black/30">
                  <div className="flex gap-2">
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      placeholder="Type your message... (Shift+Enter for new line)"
                      className="flex-1 bg-black/50 border-cyan-500/30 text-cyan-100 min-h-[80px] resize-none placeholder:text-cyan-700/50 focus:border-cyan-400 focus:ring-cyan-400/30"
                      disabled={loading}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={sendMessage}
                      disabled={loading || !input.trim()}
                      className="flex-1 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-black font-bold transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                    >
                      ⚡ Send Message
                    </Button>
                    <Button
                      onClick={() => setShowCodeDialog(true)}
                      variant="outline"
                      className="border-green-500/50 text-green-400 hover:bg-green-500/20 hover:border-green-400 transition-all"
                    >
                      🔐 Submit Code
                    </Button>
                  </div>
                </div>
              )}

              {session.completed && (
                <div className="border-t border-cyan-500/20 p-6 bg-black/30">
                  {/* Get the code for display */}
                  {(() => {
                    const correctCode = getSessionCode(session.id, session.aiPersonality);
                    return session.attemptsRemaining > 0 ? (
                    <Alert className="glass-card border-green-500/30 bg-green-500/10">
                      <AlertDescription className="text-green-300 text-center text-lg flex items-center justify-center gap-2">
                        <span className="text-2xl">🎉</span> Congratulations! You&apos;ve successfully broken the AI!
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert className="glass-card border-red-500/30 bg-red-500/10">
                      <AlertDescription className="text-red-300 text-center text-lg">
                        ❌ Session Terminated. All attempts used. The code was: <span className="font-mono font-bold text-red-200">{correctCode}</span>
                      </AlertDescription>
                    </Alert>
                  )})()}
                  <Button
                    onClick={() => router.push('/')}
                    className="w-full mt-4 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-black font-bold"
                  >
                    ← Return to Home
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Code Submission Dialog */}
      <Dialog open={showCodeDialog} onOpenChange={setShowCodeDialog}>
        <DialogContent className="glass-card border-cyan-500/30 text-cyan-100">
          <DialogHeader>
            <DialogTitle className="text-2xl text-gradient-cyber">🔐 Submit Final Code</DialogTitle>
            <DialogDescription className="text-cyan-300/70">
              Enter the 6-digit code you&apos;ve discovered. <span className="text-cyan-400 font-bold">{session.attemptsRemaining}</span> attempts remaining.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              className="text-center text-3xl tracking-[0.5em] bg-black/50 border-cyan-500/30 text-cyan-100 font-mono h-16"
              maxLength={6}
            />
            {codeResult === 'success' && (
              <Alert className="glass-card border-green-500/30 bg-green-500/10">
                <AlertDescription className="text-green-300 text-center flex items-center justify-center gap-2">
                  <span className="text-xl">✅</span> Correct! You&apos;ve broken the AI!
                </AlertDescription>
              </Alert>
            )}
            {codeResult === 'failure' && (
              <Alert className="glass-card border-red-500/30 bg-red-500/10">
                <AlertDescription className="text-red-300 text-center">
                  ❌ Incorrect code. <span className="font-bold">{Math.max(0, session.attemptsRemaining)}</span> attempts remaining.
                </AlertDescription>
              </Alert>
            )}
            <div className="flex gap-2">
              <Button
                onClick={submitCode}
                disabled={codeInput.length !== 6 || codeResult !== null}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-black font-bold disabled:opacity-30"
              >
                ⚡ Submit
              </Button>
              <Button
                onClick={() => {
                  setShowCodeDialog(false);
                  setCodeInput('');
                  setCodeResult(null);
                }}
                variant="outline"
                className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
