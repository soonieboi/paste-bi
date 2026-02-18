export interface ChartConfig {
  xKey: string;
  yKey: string;
  title: string;
}

export interface AnalysisResult {
  chartType: 'bar' | 'line' | 'pie' | 'scatter';
  chartData: Record<string, unknown>[];
  chartConfig: ChartConfig;
  insights: string[];
  anomalies: string[];
  summary: string;
}

export interface Session {
  id: string;
  rawData: string;
  analysis: AnalysisResult;
  followUps: FollowUpMessage[];
  createdAt: Date;
}

export interface FollowUpMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AnalyzeRequest {
  data: string;
}

export interface AnalyzeResponse {
  sessionId: string;
  analysis: AnalysisResult;
}

export interface FollowUpRequest {
  sessionId: string;
  question: string;
}

export interface FollowUpResponse {
  answer: string;
  updatedAnalysis?: AnalysisResult;
}

export interface ErrorResponse {
  error: string;
}
