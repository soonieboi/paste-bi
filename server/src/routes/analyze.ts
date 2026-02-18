import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { analyzeData } from '../claude.js';
import { sessionStore } from '../store.js';
import type { AnalyzeRequest, AnalyzeResponse, ErrorResponse, Session } from '../../../shared/types.js';

export const analyzeRouter = Router();

analyzeRouter.post('/analyze', async (req, res) => {
  try {
    const { data } = req.body as AnalyzeRequest;

    if (!data || typeof data !== 'string' || data.trim().length === 0) {
      const error: ErrorResponse = { error: 'No data provided' };
      return res.status(400).json(error);
    }

    const analysis = await analyzeData(data);
    const sessionId = uuidv4();

    const session: Session = {
      id: sessionId,
      rawData: data,
      analysis,
      followUps: [],
      createdAt: new Date(),
    };

    sessionStore.set(sessionId, session);

    const response: AnalyzeResponse = {
      sessionId,
      analysis,
    };

    res.json(response);
  } catch (error) {
    console.error('Analysis error:', error);
    const errorResponse: ErrorResponse = {
      error: error instanceof Error ? error.message : 'Analysis failed',
    };
    res.status(500).json(errorResponse);
  }
});
