import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { analyzeRouter } from './routes/analyze.js';
import { sessionRouter } from './routes/session.js';
import { followupRouter } from './routes/followup.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// API routes
app.use('/api', analyzeRouter);
app.use('/api', sessionRouter);
app.use('/api', followupRouter);

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok' });
});

// Serve static files from React build in production
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

// Handle React routing - serve index.html for all non-API routes
app.get('*', (_, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 PasteBI server running on http://localhost:${PORT}`);
});
