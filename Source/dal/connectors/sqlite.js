/**
 * Created by I.Denisovs on 16.19.6.
 */

var util = require('util');
var argv = require('../../support/argv');
var config = require('../../config.json');
var log = require('log4js').getLogger('db');
var SQLite = require('sqlite3').Database;

if (!util.isUndefined(argv.database))
{
    config.db = argv.database;
}

log.debug('Connecting to %s...', config.db);

var db = new SQLite(config.db);

db.run('PRAGMA foreign_keys = ON', done);

module.exports = db;

log.debug('%s connected!', config.db);

process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);

function done(error)
{
    if (error)
    {
        return log.error(error);
    }

    log.debug('Foreign key support shall be enabled now!\n');
}

function exitHandler()
{
    removeExitListener();

    log.info('Closing database...');

    db.close(function(err) {
        if (!err)
        {
            log.info('Done!');
        }

        process.exit(0);
    });
}

function removeExitListener()
{
    process.removeListener('exit', exitHandler);
    process.removeListener('SIGINT', exitHandler);
}