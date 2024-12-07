import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import CommonVariables from './common/common-variables';
import { connectToDb, disconnectFromDb } from './common/db-connection';

dotenv.config();
CommonVariables.init();
let app: Express;

export default function createServer() {
	app = express().use(cors()).use(express.json());
	connectToDb();
	return app;
}

export function destroyApp(event?: string) {
	console.log(`Destroying the app, event: ${event}`);
	try {
		disconnectFromDb();
		process.exit(0);
	} catch (error) {
		console.error('Error destroying the app', error);
	}
}

process.on('SIGINT', () => destroyApp('SIGINT'));
process.on('SIGTERM', () => destroyApp('SIGTERM'));
process.on('SIGQUIT', () => destroyApp('SIGQUIT'));
process.on('SIGUSR2', () => destroyApp('SIGUSR2'));
process.on('exit', () => console.log('exit called'));
