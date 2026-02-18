# PasteBI

AI-powered data analysis tool. Paste your CSV, JSON, or tab-separated data and get instant visualizations and insights powered by Claude AI.

## Features

- **AI-Powered Analysis**: Claude automatically chooses the best chart type (bar, line, pie, scatter) and extracts key insights
- **Multiple Data Formats**: Supports CSV, JSON, and tab-separated data
- **Interactive Chat**: Ask follow-up questions to explore your data further
- **Share Results**: Generate unique URLs to share your analysis with anyone
- **Dark Theme**: Clean, modern dark UI with indigo/violet accents

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **AI**: Anthropic Claude (claude-sonnet-4-6)

## Project Structure

```
/client   → Vite React TypeScript app
/server   → Express TypeScript API
/shared   → Shared TypeScript types
```

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Anthropic API key

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd paste-bi
```

2. Install all dependencies:
```bash
npm run install:all
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your Anthropic API key to `.env`:
```
ANTHROPIC_API_KEY=your_api_key_here
PORT=3001
```

### Development

Start both the client and server in development mode:

```bash
npm run dev
```

This will start:
- Frontend at http://localhost:5173
- Backend at http://localhost:3001

### Build

Build both client and server for production:

```bash
npm run build
```

## API Endpoints

### POST /api/analyze
Analyze pasted data and return structured insights.

**Request Body:**
```json
{
  "data": "your CSV, JSON, or tab-separated data"
}
```

**Response:**
```json
{
  "sessionId": "uuid",
  "analysis": {
    "chartType": "bar" | "line" | "pie" | "scatter",
    "chartData": [...],
    "chartConfig": { "xKey": "...", "yKey": "...", "title": "..." },
    "insights": ["insight 1", "insight 2", ...],
    "anomalies": ["anomaly 1", ...],
    "summary": "Brief summary of the data"
  }
}
```

### POST /api/followup
Ask follow-up questions about your data.

**Request Body:**
```json
{
  "sessionId": "uuid",
  "question": "your follow-up question"
}
```

### GET /api/session/:id
Retrieve a saved analysis session.

## License

MIT
