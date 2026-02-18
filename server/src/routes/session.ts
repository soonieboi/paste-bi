import { Router } from 'express';
import { sessionStore } from '../store.js';
import type { ErrorResponse } from '../../../shared/types.js';

export const sessionRouter = Router();

sessionRouter.get('/session/:id', (req, res) => {
  const { id } = req.params;

  const session = sessionStore.get(id);

  if (!session) {
    const error: ErrorResponse = { error: 'Session not found' };
    return res.status(404).json(error);
  }

  res.json(session);
});
