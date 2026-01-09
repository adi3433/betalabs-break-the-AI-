export type AIPersonality = 'arrogant' | 'sarcastic' | 'paranoid' | 'broken';

export interface AIConfig {
  id: AIPersonality;
  name: string;
  description: string;
  emoji: string;
  finalCode: string;
  difficulty: number;
  color: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface Session {
  id: string;
  teamName: string;
  aiPersonality: AIPersonality;
  startTime: number;
  messages: Message[];
  attemptsRemaining: number;
  codeAttempts: string[];
  completed: boolean;
  difficulty: number;
  hintsGiven: number;
}

export interface AdminLog {
  sessionId: string;
  teamName: string;
  personality: string;
  startTime: number;
  endTime?: number;
  success: boolean;
  attempts: number;
  messageCount: number;
}
