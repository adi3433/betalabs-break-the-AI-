'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getAllSessions, clearAllSessions } from '@/lib/storage';
import { AI_PERSONALITIES } from '@/lib/ai-personalities';
import { Session } from '@/types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AnimatedBackground, FloatingOrbs, GridOverlay } from '@/components/ui/animated-background';
import { GlitchText, CountUp } from '@/components/ui/animated-text';

export default function AdminDashboard() {
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  useEffect(() => {
    loadSessions();
    const interval = setInterval(loadSessions, 2000);
    return () => clearInterval(interval);
  }, []);

  const loadSessions = () => {
    const allSessions = getAllSessions();
    setSessions(allSessions.sort((a, b) => b.startTime - a.startTime));
  };

  const handleClearAll = () => {
    clearAllSessions();
    setSessions([]);
    setSelectedSession(null);
    setShowConfirmClear(false);
  };

  const formatTime = (startTime: number, endTime?: number) => {
    const duration = (endTime || Date.now()) - startTime;
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const getStatusBadge = (session: Session) => {
    if (session.completed) {
      if (session.attemptsRemaining > 0) {
        return <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">✅ Success</Badge>;
      } else {
        return <Badge className="bg-red-500/20 text-red-400 border border-red-500/30">❌ Failed</Badge>;
      }
    }
    return <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">🔄 In Progress</Badge>;
  };

  const stats = {
    total: sessions.length,
    completed: sessions.filter(s => s.completed).length,
    successful: sessions.filter(s => s.completed && s.attemptsRemaining > 0).length,
    failed: sessions.filter(s => s.completed && s.attemptsRemaining === 0).length,
    inProgress: sessions.filter(s => !s.completed).length,
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <FloatingOrbs />
      <GridOverlay />

      <div className="relative z-10 p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <Card className="glass-card neon-border">
            <CardHeader>
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <CardTitle className="text-3xl">
                    <GlitchText text="🛡️ ADMIN DASHBOARD" className="text-gradient-cyber" />
                  </CardTitle>
                  <CardDescription className="text-cyan-300/70 text-lg mt-2">
                    Monitor all team sessions and activity
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => router.push('/')}
                    variant="outline"
                    className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
                  >
                    ← Home
                  </Button>
                  <Button
                    onClick={() => setShowConfirmClear(true)}
                    className="bg-red-600/80 hover:bg-red-500 text-white"
                  >
                    🗑️ Clear All Data
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="glass-card border-cyan-500/20 hover:border-cyan-400/50 transition-all">
              <CardHeader className="pb-2">
                <CardDescription className="text-cyan-300/70">Total Sessions</CardDescription>
                <CardTitle className="text-4xl text-cyan-400">
                  <CountUp end={stats.total} duration={1000} />
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="glass-card border-cyan-500/20 hover:border-cyan-400/50 transition-all">
              <CardHeader className="pb-2">
                <CardDescription className="text-cyan-300/70">In Progress</CardDescription>
                <CardTitle className="text-4xl text-cyan-400">
                  <CountUp end={stats.inProgress} duration={1000} />
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="glass-card border-green-500/20 hover:border-green-400/50 transition-all">
              <CardHeader className="pb-2">
                <CardDescription className="text-green-300/70">Successful</CardDescription>
                <CardTitle className="text-4xl text-green-400">
                  <CountUp end={stats.successful} duration={1000} />
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="glass-card border-red-500/20 hover:border-red-400/50 transition-all">
              <CardHeader className="pb-2">
                <CardDescription className="text-red-300/70">Failed</CardDescription>
                <CardTitle className="text-4xl text-red-400">
                  <CountUp end={stats.failed} duration={1000} />
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="glass-card border-teal-500/20 hover:border-teal-400/50 transition-all">
              <CardHeader className="pb-2">
                <CardDescription className="text-teal-300/70">Completed</CardDescription>
                <CardTitle className="text-4xl text-teal-400">
                  <CountUp end={stats.completed} duration={1000} />
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Confirm Clear Dialog */}
          {showConfirmClear && (
            <Alert className="glass-card border-red-500/30 bg-red-500/10">
              <AlertDescription className="text-red-200">
                <p className="mb-4">⚠️ Are you sure you want to clear all session data? This cannot be undone.</p>
                <div className="flex gap-2">
                  <Button onClick={handleClearAll} className="bg-red-600 hover:bg-red-500 text-white">
                    Yes, Clear All
                  </Button>
                  <Button onClick={() => setShowConfirmClear(false)} variant="outline" className="border-cyan-500/30 text-cyan-300">
                    Cancel
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Sessions Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Sessions List */}
            <Card className="glass-card neon-border">
              <CardHeader>
                <CardTitle className="text-cyan-100">📋 Active Sessions</CardTitle>
                <CardDescription className="text-cyan-300/70">
                  Click a session to view details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
                {sessions.length === 0 ? (
                  <p className="text-cyan-500/50 text-center py-8">No sessions yet</p>
                ) : (
                  sessions.map((session) => {
                    const personality = AI_PERSONALITIES[session.aiPersonality];
                    return (
                      <Card
                        key={session.id}
                        className={`cursor-pointer transition-all border ${
                          selectedSession?.id === session.id
                            ? 'glass-card border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.3)]'
                            : 'glass-card border-cyan-500/20 hover:border-cyan-400/50'
                        }`}
                        onClick={() => setSelectedSession(session)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <div className="text-3xl">{personality.emoji}</div>
                              <div>
                                <CardTitle className="text-cyan-100 text-lg">
                                  {session.teamName}
                                </CardTitle>
                                <p className="text-sm text-cyan-400/70">
                                  {personality.name}
                                </p>
                              </div>
                            </div>
                            {getStatusBadge(session)}
                          </div>
                          <div className="flex gap-3 mt-2 text-xs text-cyan-300/70">
                            <span>⏱️ {formatTime(session.startTime)}</span>
                            <span>💬 {session.messages.length} msgs</span>
                            <span>🎯 {session.attemptsRemaining}/3</span>
                          </div>
                        </CardHeader>
                      </Card>
                    );
                  })
                )}
              </CardContent>
            </Card>

            {/* Session Details */}
            <Card className="glass-card neon-border">
              <CardHeader>
                <CardTitle className="text-cyan-100">🔍 Session Details</CardTitle>
                <CardDescription className="text-cyan-300/70">
                  {selectedSession ? `${selectedSession.teamName}'s session` : 'Select a session to view details'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedSession ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="glass-card p-3 rounded-lg">
                        <p className="text-sm text-cyan-400/70">Team</p>
                        <p className="text-cyan-100 font-semibold">{selectedSession.teamName}</p>
                      </div>
                      <div className="glass-card p-3 rounded-lg">
                        <p className="text-sm text-cyan-400/70">AI Personality</p>
                        <p className="text-cyan-100 font-semibold">
                          {AI_PERSONALITIES[selectedSession.aiPersonality].name}
                        </p>
                      </div>
                      <div className="glass-card p-3 rounded-lg">
                        <p className="text-sm text-cyan-400/70">Start Time</p>
                        <p className="text-cyan-100 font-semibold">
                          {new Date(selectedSession.startTime).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="glass-card p-3 rounded-lg">
                        <p className="text-sm text-cyan-400/70">Duration</p>
                        <p className="text-cyan-100 font-semibold">
                          {formatTime(selectedSession.startTime)}
                        </p>
                      </div>
                      <div className="glass-card p-3 rounded-lg">
                        <p className="text-sm text-cyan-400/70">Messages</p>
                        <p className="text-cyan-100 font-semibold">{selectedSession.messages.length}</p>
                      </div>
                      <div className="glass-card p-3 rounded-lg">
                        <p className="text-sm text-cyan-400/70">Attempts</p>
                        <p className="text-cyan-100 font-semibold">
                          {selectedSession.attemptsRemaining}/3
                        </p>
                      </div>
                      <div className="glass-card p-3 rounded-lg">
                        <p className="text-sm text-cyan-400/70">Difficulty</p>
                        <p className="text-cyan-100 font-semibold">
                          {selectedSession.difficulty}/5
                        </p>
                      </div>
                      <div className="glass-card p-3 rounded-lg">
                        <p className="text-sm text-cyan-400/70">Status</p>
                        <div className="mt-1">{getStatusBadge(selectedSession)}</div>
                      </div>
                    </div>

                    {selectedSession.codeAttempts.length > 0 && (
                      <div className="glass-card p-3 rounded-lg">
                        <p className="text-sm text-cyan-400/70 mb-2">Code Attempts</p>
                        <div className="flex gap-2 flex-wrap">
                          {selectedSession.codeAttempts.map((attempt, idx) => {
                            const isCorrect = attempt === AI_PERSONALITIES[selectedSession.aiPersonality].finalCode;
                            return (
                              <Badge
                                key={idx}
                                className={isCorrect ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}
                              >
                                {attempt} {isCorrect ? '✓' : '✗'}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-cyan-400/70 mb-2">💬 Conversation Log</p>
                      <div className="glass-card rounded-lg p-4 max-h-[300px] overflow-y-auto space-y-2">
                        {selectedSession.messages.map((msg) => (
                          <div key={msg.id} className="text-sm">
                            <span className={msg.role === 'user' ? 'text-cyan-400' : 'text-green-400'}>
                              [{msg.role === 'user' ? 'Team' : 'AI'}]:
                            </span>
                            <span className="text-cyan-100/80 ml-2">{msg.content}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-cyan-500/50 text-center py-12">
                    Select a session from the list to view details
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
