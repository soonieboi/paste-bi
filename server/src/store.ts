import type { Session } from '../../shared/types.js';

const sessions = new Map<string, Session>();

export const sessionStore = {
  get: (id: string): Session | undefined => sessions.get(id),
  
  set: (id: string, session: Session): void => {
    sessions.set(id, session);
  },
  
  delete: (id: string): boolean => sessions.delete(id),
  
  has: (id: string): boolean => sessions.has(id),
};
