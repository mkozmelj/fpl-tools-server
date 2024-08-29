import axios from 'axios';
import { Request, Response } from 'express';
import redisClient from '../redis-client';
import { Player } from '../types/player';
import { getColorBasedOnTeam } from '../utils/getColorBasedOnTeam';
import { Team } from '../types/team';

export async function fetchData(_: Request, res: Response) {
  const { data } = await axios.get(`${process.env.API_URL}/bootstrap-static`);
  if (data) {
    try {
      redisClient.set(
        'players',
        JSON.stringify(
          data.elements.map((player: Player) => ({
            ...player,
            goal_involvements: player.goals_scored + player.assists,
          })),
        ),
      );
      redisClient.set(
        'teams',
        JSON.stringify(
          data.teams.map((team: Team) => ({
            ...team,
            color: getColorBasedOnTeam(team.code),
          })),
        ),
      );
      res.status(200).send();
    } catch (error: unknown) {
      res.status(500).send({ error: (error as Error).message });
    }
  } else {
    res.status(400).send({ error: 'No data' });
  }
}
