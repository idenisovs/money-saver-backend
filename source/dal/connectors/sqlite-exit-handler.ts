import log4js from 'log4js';
import sqlite3 from 'sqlite3';

const log = log4js.getLogger('db');

let isClosed = false;

export default function exitHandler(db: sqlite3.Database) {
	return function handler() {
		if (isClosed) {
			return;
		}

		isClosed = true;

		process.removeListener('exit', handler);
		process.removeListener('SIGINT', handler);

		log.info('Closing database...');

		db.close(closeDone);
	};

	function closeDone(err: Error | null) {
		if (err) {
			log.error(err);
		}

		log.info('Done!');

		process.exit(0);
	}
}
