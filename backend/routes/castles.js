import { Router } from 'express';
import { getAllCastles } from '../services/castleService.js';

const router = Router();

router.get('/', async (_req, res) => {
  const result = await getAllCastles();
  res.json({
    castles: result.data,
    mock: result.mock,
  });
});

export default router;
