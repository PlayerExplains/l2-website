import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import healthRoutes from './routes/health.js';
import rankingsRoutes from './routes/rankings.js';
import statsRoutes from './routes/stats.js';
import castlesRoutes from './routes/castles.js';
import olympiadRoutes from './routes/olympiad.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  })
);
app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/rankings', rankingsRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/castles', castlesRoutes);
app.use('/api/olympiad', olympiadRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`[Server] API running on http://localhost:${PORT}`);
  console.log(`[Server] CORS origin: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
});
