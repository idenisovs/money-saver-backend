const argv = require('yargs').argv;
const log = require('log4js').getLogger('db');

const databaseType = determineDatabaseType();

log.debug('Determined database type: %s!', databaseType);

let connector, exitHandler;

switch (databaseType)
{
    case 'testable':
        log.debug('Switching to testable connector!');
        connector = require('./connectors/testable');
        exitHandler = require('./connectors/sqlite-exit-handler');
        break;
    default:
        log.debug('Switching to default (SQLite3) connector!');
        connector = require('./connectors/sqlite');
        exitHandler = require('./connectors/sqlite-exit-handler');
}

process.on('exit', exitHandler(connector));
process.on('SIGINT', exitHandler(connector));

module.exports = connector;

function determineDatabaseType()
{
    if (argv.testable)
    {
        return 'testable';
    }

    return 'sqlite';
}

