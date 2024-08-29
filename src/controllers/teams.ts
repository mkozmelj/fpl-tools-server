import { Request, Response } from 'express';
import redisClient from '../redis-client';
import { Team } from '../types/team';

export async function getTeams(_: Request, res: Response) {
  try {
    const cachedData = await redisClient.get('teams');
    const data: Team[] | null = cachedData ? JSON.parse(cachedData) : null;

    res.send(data ?? []);
  } catch (error: unknown) {
    // Handle any errors that occurred during the fetch
    res.status(500).json({ error: (error as Error)['message'] });
  }
}
