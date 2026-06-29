import { Router } from 'express';
import { getCurrentHeroes } from '../services/olympiadService.js';

const router = Router();

router.get('/heroes', async (_req, res) => {
  const result = await getCurrentHeroes();
  res.json({
    heroes: result.data,
    mock: result.mock,
  });
});

export default router;
