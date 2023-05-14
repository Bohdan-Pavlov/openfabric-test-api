import dotenv from 'dotenv';
import express, { Express } from 'express';
import mongoose from 'mongoose';

import errorHandler from './middlewares/error-handling.middleware';
import router from './routes';
import { config } from './config';

dotenv.config();
const app: Express = express();

app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

mongoose
	.connect(config.mongo.url, { retryWrites: true })
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.log(error);
	});

app.listen(config.server.port, () => console.log(`Server running on http://localhost:${config.server.port}`));
