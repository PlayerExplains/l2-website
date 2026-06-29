import { Router } from 'express';
import { getTopPvpPlayers, getTopPkPlayers } from '../services/characterService.js';

const router = Router();

router.get('/top-flag', async (_req, res) => {
  const result = await getTopPvpPlayers(10);
  res.json({
    type: 'flag',
    players: result.data,
    mock: result.mock,
  });
});

router.get('/top-pk', async (_req, res) => {
  const result = await getTopPkPlayers(10);
  res.json({
    type: 'pk',
    players: result.data,
    mock: result.mock,
  });
});

// Legacy paths
router.get('/top-pvp', async (_req, res) => {
  const result = await getTopPvpPlayers(10);
  res.json({ type: 'flag', players: result.data, mock: result.mock });
});

router.get('/pvp', async (_req, res) => {
  const result = await getTopPvpPlayers(10);
  res.json({ type: 'flag', players: result.data, mock: result.mock });
});

router.get('/pk', async (_req, res) => {
  const result = await getTopPkPlayers(10);
  res.json({ type: 'pk', players: result.data, mock: result.mock });
});

export default router;
