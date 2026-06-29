import { Router } from 'express';
import { getServerStats } from '../services/statsService.js';

const router = Router();

router.get('/', async (_req, res) => {
  const stats = await getServerStats();
  res.json(stats);
});

export default router;
