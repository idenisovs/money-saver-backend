import path from 'path';
import { getLogger } from 'log4js';
import { Database as SQLite } from 'sqlite3';

import enableForeignKeys from './enable-foreign-keys';
import argv from '../../support/argv';

const log = getLogger('db');

const DEFAULT_PATH = path.join(global.basedir, '..', 'finance.db');

const databasePath = argv.database || process.env.DATABASE || DEFAULT_PATH;

log.debug('Connecting to %s...', databasePath);

const db = new SQLite(databasePath);

(async () => {
	await enableForeignKeys(db);
})();

export default db;

log.debug('%s connected!', databasePath);
