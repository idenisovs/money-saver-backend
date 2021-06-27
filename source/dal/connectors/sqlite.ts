import enableForeignKeys from './enable-foreign-keys';

const path = require('path');
const argv = require('../../support/argv');
const SQLite = require('sqlite3').Database;

const log = require('log4js').getLogger('db');

const DEFAULT_PATH = path.join(global.basedir, '..', 'finance.db');

const databasePath = argv.database || process.env.DATABASE || DEFAULT_PATH;

log.debug('Connecting to %s...', databasePath);

const db = new SQLite(databasePath);

(async () => {
    await enableForeignKeys(db);
})()

export default db;

log.debug('%s connected!', databasePath);