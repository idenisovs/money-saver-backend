import { getLogger } from 'log4js';
import { Database as SQLite } from 'sqlite3';

import enableForeignKeys from './enable-foreign-keys';
import config from '../../config';

const log = getLogger('db');

export default function connectSqlite() {
	if (!config.DATABASE) {
		throw new Error('DATABASE must be set!');
	}

	log.debug('Connecting to %s...', config.DATABASE);

	const db = new SQLite(config.DATABASE);

	enableForeignKeys(db).then(() => {
		log.debug('%s connected!', config.DATABASE);
	})

	return db;
}