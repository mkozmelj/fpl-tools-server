import express from 'express';
import { getTeams } from '../controllers/teams';

const teamsRouter = express.Router();

teamsRouter.get('/', getTeams);

export { teamsRouter };
