/**
 * Created by I.Denisovs on 16.19.6.
 */
const log = require('log4js').getLogger('db');
const SQLite = require('sqlite3').Database;
const createTestableSchema = require('./create-testable-schema');

log.warn('Launching testable database!');

const db = new SQLite(':memory:');

createTestableSchema(db, schemaCreateDone);

module.exports = db;

function schemaCreateDone(err)
{
    if (err)
    {
        log.error(err);
        process.exit(1);
    }

    db.run('PRAGMA foreign_keys = ON', foreignKeysOn);
}

function foreignKeysOn(error)
{
    if (error)
    {
        return log.error(error);
    }

    log.debug('Foreign key support shall be enabled now!\n');
}
