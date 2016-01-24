/**
 * This module encapsulates the basic methods of opening and closing DB connections
 * and provides initialized DB connector.
 *
 * Created by Ga5Xz2 on 13.09.2015..
 */
var util = require('util');
var argv = require('../support/argv');
var config = require('../../config.json');
var log = require('log4js').getLogger('db');
var SQLite = require('sqlite3').Database;

if (!util.isUndefined(argv.database))
{
    config.db = argv.database;
}

log.info('Connecting to %s...', config.db);

var db = new SQLite(config.db);

module.exports = db;

log.info('%s connected!', config.db);

db.run('PRAGMA foreign_keys = ON', done);

process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);

function done(error)
{
    if (error)
    {
        log.error(error);
        return;
    }

    log.info('Foreign key support shall be enabled now!\n');
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