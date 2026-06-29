import { Router } from 'express';
import { testConnection } from '../config/database.js';

const router = Router();

router.get('/', async (_req, res) => {
  const dbConnected = await testConnection();

  res.json({
    status: 'ok',
    backend: true,
    database: dbConnected,
    timestamp: new Date().toISOString(),
  });
});

export default router;
