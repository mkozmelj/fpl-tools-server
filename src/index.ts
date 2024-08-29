import express, { Request, Response } from 'express';
import cors from 'cors';
import { playersRouter } from './routes/players';
import { dataRouter } from './routes/data';
import dotenv from 'dotenv';
import { teamsRouter } from './routes/teams';

// Load environment variables from .env file
dotenv.config();

// Create an instance of an Express application
const app = express();

// Set the port number
const port = process.env.PORT ?? 3000;

// Use CORS middleware
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Basic route handling
app.use('/players', playersRouter);
app.use('/data', dataRouter);
app.use('/teams', teamsRouter);

// Set timeout for all routes
app.use('*', (_: Request, res: Response) => {
  setTimeout(
    () => {
      res.status(408).send();
    },
    +(process.env.TIMEOUT ?? 60000),
  );
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
