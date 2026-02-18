import type { AnalyzeResponse, FollowUpResponse, Session } from '@shared/types'

const API_BASE = '/api'

export async function analyzeData(data: string): Promise<AnalyzeResponse> {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Analysis failed')
  }

  return response.json()
}

export async function askFollowUp(sessionId: string, question: string): Promise<FollowUpResponse> {
  const response = await fetch(`${API_BASE}/followup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, question }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Follow-up failed')
  }

  return response.json()
}

export async function getSession(id: string): Promise<Session> {
  const response = await fetch(`${API_BASE}/session/${id}`)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Session not found')
  }

  return response.json()
}
