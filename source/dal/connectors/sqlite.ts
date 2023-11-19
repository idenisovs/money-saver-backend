import path from 'path';
import { getLogger } from 'log4js';
import { Database as SQLite } from 'sqlite3';

import enableForeignKeys from './enable-foreign-keys';
import argv from '../../support/argv';

const log = getLogger('db');

export default function connectSqlite() {
	const defaultPath = path.join(global.basedir, '..', 'finance.db');
	const databasePath = argv.database || process.env.DATABASE || defaultPath;
	log.debug('Connecting to %s...', databasePath);

	const db = new SQLite(databasePath);

	enableForeignKeys(db).then(() => {
		log.debug('%s connected!', databasePath);
	})

	return db;
}