import { Session } from '@/types';

const STORAGE_KEY = 'break_the_ai_sessions';
const ADMIN_LOG_KEY = 'break_the_ai_admin_log';

export function saveSession(session: Session): void {
  if (typeof window === 'undefined') return;
  
  const sessions = getSessions();
  const index = sessions.findIndex(s => s.id === session.id);
  
  if (index >= 0) {
    sessions[index] = session;
  } else {
    sessions.push(session);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function getSessions(): Session[] {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getSession(sessionId: string): Session | null {
  const sessions = getSessions();
  return sessions.find(s => s.id === sessionId) || null;
}

export function deleteSession(sessionId: string): void {
  if (typeof window === 'undefined') return;
  
  const sessions = getSessions().filter(s => s.id !== sessionId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function getAllSessions(): Session[] {
  return getSessions();
}

export function clearAllSessions(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(ADMIN_LOG_KEY);
}

// Track AI assignment distribution
const AI_DISTRIBUTION_KEY = 'break_the_ai_distribution';

export function getAIDistribution(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  
  const data = localStorage.getItem(AI_DISTRIBUTION_KEY);
  return data ? JSON.parse(data) : { arrogant: 0, sarcastic: 0, paranoid: 0, broken: 0 };
}

export function recordAIAssignment(aiPersonality: string): void {
  if (typeof window === 'undefined') return;
  
  const distribution = getAIDistribution();
  distribution[aiPersonality] = (distribution[aiPersonality] || 0) + 1;
  localStorage.setItem(AI_DISTRIBUTION_KEY, JSON.stringify(distribution));
}
