var argv = require('yargs').argv;
var log = require('log4js').getLogger('db');
var config = require('../config.json');

module.exports = getConnector();

function getConnector()
{
    var databaseType = determineDatabaseType();

    log.debug('Determined database type: %s!', databaseType);

    var connector;

    switch (databaseType)
    {
        case 'testable':
            log.debug('Switching to testable connector!');
            connector = require('./connectors/testable');
            break;
        default:
            log.debug('Switching to default (SQLite3) connector!');
            connector = require('./connectors/sqlite');
    }

    return connector;
}

function determineDatabaseType()
{
    log.debug('argv.testable = %s', argv.testable);

    if (argv.testable)
    {
        return 'testable';
    }

    return 'sqlite';
}

