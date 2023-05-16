import dotenv from 'dotenv';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { DATABASE_CONNECTED_SUCCESSFULLY, DATABASE_CONNECTION_ERROR } from './constants';
import { errorHandler } from './middlewares';
import { router } from './routes';
import { config } from './config';

dotenv.config();
const app: Express = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use(errorHandler);

async function start(): Promise<void> {
	try {
		await mongoose.connect(config.mongo.url, { retryWrites: true });
		console.log(DATABASE_CONNECTED_SUCCESSFULLY);
		app.listen(config.server.port, () => console.log(`Server is running on http://localhost:${config.server.port}`));
	} catch (e) {
		console.log(DATABASE_CONNECTION_ERROR);
	}
}

start();
