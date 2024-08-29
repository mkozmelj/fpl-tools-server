import express from 'express';
import { getPlayers } from '../controllers/players';

const playersRouter = express.Router();

playersRouter.get('/', getPlayers);

export { playersRouter };
