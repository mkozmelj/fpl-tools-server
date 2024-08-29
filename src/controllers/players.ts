import { Request, Response } from 'express';
import redisClient from '../redis-client';
import { Player } from '../types/player';

export async function getPlayers(req: Request, res: Response) {
  let { page = 1, limit = 1000 } = req.query;
  const { sortBy = 'id', order = 'asc', all = false, positions } = req.query;

  // Ensure query parameters are correctly typed
  page = parseInt(page as string, 10);
  limit = parseInt(limit as string, 10);
  const positionsArr = positions
    ? (positions as string).split(',').map((value: string) => +value)
    : ([] as number[]);

  try {
    const cachedData = await redisClient.get('players');
    const data: Player[] | null = cachedData ? JSON.parse(cachedData) : null;

    if (data) {
      const sortedData = data.sort((a: Player, b: Player) => {
        const compare =
          a[sortBy as keyof Player]! > b[sortBy as keyof Player]! ? 1 : -1;
        return order === 'asc' ? compare : -compare;
      });

      let filteredData = all
        ? sortedData
        : sortedData.filter((player: Player) => player.minutes > 0);

      filteredData = !positionsArr.length
        ? filteredData
        : filteredData.filter(
            (player) =>
              positionsArr.length && positionsArr.includes(player.element_type),
          );

      // Paginate the data
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      // Respond with paginated and sorted data
      res.json({
        page,
        limit,
        totalItems: filteredData.length,
        totalPages: Math.ceil(filteredData.length / limit),
        data: paginatedData,
      });
    } else {
      res.send([]);
    }
  } catch (error: unknown) {
    // Handle any errors that occurred during the fetch
    res.status(500).json({ error: (error as Error)['message'] });
  }
}
