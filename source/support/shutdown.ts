import { Server } from 'http';

import log4js from './log4js';
import { closeDb } from '../dal/db';

const log = log4js.getLogger('shutdown');

const SHUTDOWN_TIMEOUT = 10000;

let shuttingDown = false;

export default function setupGracefulShutdown(server: Server): void {
	const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];

	signals.forEach((signal) => {
		process.on(signal, () => shutdown(signal, server));
	});
}

async function shutdown(signal: NodeJS.Signals, server: Server): Promise<void> {
	if (shuttingDown) {
		return;
	}

	shuttingDown = true;

	log.info('Received %s, shutting down gracefully...', signal);

	const forceExit = setTimeout(() => {
		log.error('Shutdown timed out after %dms, forcing exit.', SHUTDOWN_TIMEOUT);
		process.exit(1);
	}, SHUTDOWN_TIMEOUT);

	forceExit.unref();

	try {
		await closeHttpServer(server);
		await closeDb();

		clearTimeout(forceExit);

		log.info('Shutdown complete.');

		process.exit(0);
	} catch (err) {
		clearTimeout(forceExit);

		log.error('Error during shutdown:', err);

		process.exit(1);
	}
}

function closeHttpServer(server: Server): Promise<void> {
	const { promise, resolve, reject } = Promise.withResolvers<void>();

	log.debug('Closing HTTP server...');

	server.close((err) => {
		if (err) {
			reject(err);
			return;
		}

		log.info('HTTP server closed!');
		resolve();
	});

	return promise;
}
