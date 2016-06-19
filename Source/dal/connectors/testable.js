/**
 * Created by I.Denisovs on 16.19.6.
 */

var util = require('util');
var argv = require('../../support/argv');
var config = require('../../config.json');
var log = require('log4js').getLogger('db');
var SQLite = require('sqlite3').Database;

log.warn('Launching testable database!');

var db = new SQLite(':memory:');

db.run('PRAGMA foreign_keys = ON', foreignKeysOn);

module.exports = db;

process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);

function foreignKeysOn(error)
{
    if (error)
    {
        return log.error(error);
    }

    log.debug('Foreign key support shall be enabled now!\n');
}

function exitHandler()
{
    process.removeListener('exit', exitHandler);
    process.removeListener('SIGINT', exitHandler);

    log.info('Closing database...');

    db.close(closeDone);

    function closeDone(err)
    {
        if (err)
        {
            log.error(err);
        }

        log.info('Done!');

        process.exit(0);
    }
}