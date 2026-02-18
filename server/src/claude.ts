import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
import type { AnalysisResult } from '../../shared/types.js';

dotenv.config();

const client = new Anthropic();

const ANALYSIS_SYSTEM_PROMPT = `You are a data analysis expert. Analyze the provided data and return insights in a strict JSON format.

Your response MUST be valid JSON matching this exact schema:
{
  "chartType": "bar" | "line" | "pie" | "scatter",
  "chartData": [...],
  "chartConfig": { "xKey": string, "yKey": string, "title": string },
  "insights": string[],
  "anomalies": string[],
  "summary": string
}

Guidelines:
- Choose the most appropriate chart type for the data:
  - "bar": For categorical comparisons
  - "line": For time series or trends
  - "pie": For proportions/percentages (max 8 slices)
  - "scatter": For correlations between two numeric variables
- chartData should be an array of objects ready for Recharts
- For pie charts, use "name" and "value" keys
- For bar/line/scatter, use descriptive keys matching the data
- Provide 3-5 actionable insights as bullet points
- Identify any anomalies or outliers in the data
- Summary should be a brief 2-3 sentence overview
- ONLY return the JSON, no markdown or explanation`;

const FOLLOWUP_SYSTEM_PROMPT = `You are a data analysis assistant helping users understand their data.
You have access to the original data and previous analysis. Answer questions clearly and concisely.
If the question requires updating the visualization, include an "updatedAnalysis" field with the new chart configuration.
Otherwise, just provide a helpful text answer.

For answers requiring updated analysis, respond with JSON:
{
  "answer": "your explanation",
  "updatedAnalysis": { ...same schema as original analysis... }
}

For simple answers, respond with just:
{
  "answer": "your explanation"
}`;

export async function analyzeData(rawData: string): Promise<AnalysisResult> {
  const message = await client.messages.create({
    model: 'claude-3-5-haiku-20241022',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: `Analyze this data and provide visualization recommendations:\n\n${rawData}`,
      },
    ],
    system: ANALYSIS_SYSTEM_PROMPT,
  });

  const content = message.content[0];
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude');
  }

  try {
    // Strip markdown code blocks if present
    let text = content.text.trim();
    if (text.startsWith('```json')) {
      text = text.slice(7);
    } else if (text.startsWith('```')) {
      text = text.slice(3);
    }
    if (text.endsWith('```')) {
      text = text.slice(0, -3);
    }
    text = text.trim();
    
    const result = JSON.parse(text) as AnalysisResult;
    return result;
  } catch (e) {
    console.error('Failed to parse response:', content.text);
    throw new Error('Failed to parse Claude response as JSON');
  }
}

export async function handleFollowUp(
  rawData: string,
  previousAnalysis: AnalysisResult,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
  question: string
): Promise<{ answer: string; updatedAnalysis?: AnalysisResult }> {
  const contextMessage = `Original data:\n${rawData}\n\nPrevious analysis:\n${JSON.stringify(previousAnalysis, null, 2)}`;

  const messages: Anthropic.MessageParam[] = [
    { role: 'user', content: contextMessage },
    { role: 'assistant', content: 'I have the data and analysis context. What would you like to know?' },
    ...conversationHistory.map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    })),
    { role: 'user', content: question },
  ];

  const message = await client.messages.create({
    model: 'claude-3-5-haiku-20241022',
    max_tokens: 4096,
    messages,
    system: FOLLOWUP_SYSTEM_PROMPT,
  });

  const content = message.content[0];
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude');
  }

  try {
    return JSON.parse(content.text);
  } catch {
    return { answer: content.text };
  }
}
