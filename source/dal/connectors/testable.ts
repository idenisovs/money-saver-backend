import log4js from 'log4js';
import sqlite3 from 'sqlite3';
import createTestableSchema from './create-testable-schema';

const log = log4js.getLogger('db');

log.warn('Launching testable database!');

const db = new sqlite3.Database(':memory:');

createTestableSchema(db, schemaCreateDone);

export default db;

function schemaCreateDone(err: Error) {
    if (err) {
        log.error(err);
        process.exit(1);
    }

    db.run('PRAGMA foreign_keys = ON', foreignKeysOn);
}

function foreignKeysOn(error: Error) {
    if (error) {
        return log.error(error);
    }

    log.debug('Foreign key support shall be enabled now!\n');
}
