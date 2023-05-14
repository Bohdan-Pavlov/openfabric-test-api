import dotenv from 'dotenv';

dotenv.config();

const DB_USER = process.env.DB_USER || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.tdahf7b.mongodb.net/?retryWrites=true&w=majority`;

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

export const config = {
	mongo: {
		url: DB_URL,
	},
	server: {
		port: SERVER_PORT,
	},
};
