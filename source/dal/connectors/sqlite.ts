import { existsSync } from 'fs';

import { getLogger } from 'log4js';
import { Database as SQLite, OPEN_READWRITE } from 'sqlite3';

import enableForeignKeys from './enable-foreign-keys';
import config from '../../config';

const log = getLogger('db');

export default function connectSqlite() {
	if (!config.DATABASE) {
		log.fatal('DATABASE must be set!');
		process.exit(1);
	}

	if (!existsSync(config.DATABASE)) {
		log.fatal('Database file is not found at the given path - %s', config.DATABASE);
		process.exit(1);
	}

	log.debug('Connecting to %s...', config.DATABASE);

	const db = new SQLite(config.DATABASE, OPEN_READWRITE, (err) => {
		if (err) {
			log.fatal('Failed to open database "%s": %s', config.DATABASE, err.message);
			process.exit(1);
		}
	});

	enableForeignKeys(db).then(() => {
		log.debug('%s connected!', config.DATABASE);
	})

	return db;
}