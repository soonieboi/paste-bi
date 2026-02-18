import { Router } from 'express';
import { handleFollowUp } from '../claude.js';
import { sessionStore } from '../store.js';
import type { FollowUpRequest, FollowUpResponse, ErrorResponse } from '../../../shared/types.js';

export const followupRouter = Router();

followupRouter.post('/followup', async (req, res) => {
  try {
    const { sessionId, question } = req.body as FollowUpRequest;

    if (!sessionId || !question) {
      const error: ErrorResponse = { error: 'Session ID and question are required' };
      return res.status(400).json(error);
    }

    const session = sessionStore.get(sessionId);

    if (!session) {
      const error: ErrorResponse = { error: 'Session not found' };
      return res.status(404).json(error);
    }

    const conversationHistory = session.followUps.map((fu) => ({
      role: fu.role,
      content: fu.content,
    }));

    const result = await handleFollowUp(
      session.rawData,
      session.analysis,
      conversationHistory,
      question
    );

    session.followUps.push({
      role: 'user',
      content: question,
      timestamp: new Date(),
    });

    session.followUps.push({
      role: 'assistant',
      content: result.answer,
      timestamp: new Date(),
    });

    if (result.updatedAnalysis) {
      session.analysis = result.updatedAnalysis;
    }

    sessionStore.set(sessionId, session);

    const response: FollowUpResponse = {
      answer: result.answer,
      updatedAnalysis: result.updatedAnalysis,
    };

    res.json(response);
  } catch (error) {
    console.error('Follow-up error:', error);
    const errorResponse: ErrorResponse = {
      error: error instanceof Error ? error.message : 'Follow-up failed',
    };
    res.status(500).json(errorResponse);
  }
});
