import log4js from 'log4js';
import sqlite3 from 'sqlite3';

const log = log4js.getLogger('db');

let closing: Promise<void> | null = null;

export default function closeDatabase(db: sqlite3.Database): Promise<void> {
	if (closing) {
		return closing;
	}

	const { promise, resolve, reject } = Promise.withResolvers<void>();

	closing = promise;

	log.debug('Closing database...');

	db.close((err: Error | null) => {
		if (err) {
			log.error(err);
			reject(err);
			return;
		}

		log.info('Database closed!');
		resolve();
	});

	return closing;
}
