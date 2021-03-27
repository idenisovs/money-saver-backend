const path = require('path');
const argv = require('../../support/argv');
const SQLite = require('sqlite3').Database;

const log = require('log4js').getLogger('db');

const DEFAULT_PATH = path.join(basedir, '..', 'finance.db');

const databasePath = argv.database || process.env.DATABASE || DEFAULT_PATH;

log.debug('Connecting to %s...', databasePath);

const db = new SQLite(databasePath);

db.run('PRAGMA foreign_keys = ON', done);

module.exports = db;

log.debug('%s connected!', databasePath);

function done(error) {
    if (error) {
        return log.error(error);
    }

    log.debug('Foreign key support shall be enabled now!\n');
}
