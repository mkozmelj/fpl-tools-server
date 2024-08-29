import express from 'express';
import { fetchData } from '../controllers/data';

const dataRouter = express.Router();

dataRouter.get('/', fetchData);

export { dataRouter };
