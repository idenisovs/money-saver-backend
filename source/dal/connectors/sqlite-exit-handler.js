/**
 * Created by I.Denisovs on 16.19.6.
 */

var log = require('log4js').getLogger('db');
var db;

function exitHandler(connector)
{
    db = connector;

    return handler;
}

module.exports = exitHandler;

function handler()
{
    process.removeListener('exit', handler);
    process.removeListener('SIGINT', handler);

    log.info('Closing database...');

    db.close(closeDone);
}

function closeDone(err)
{
    if (err)
    {
        log.error(err);
    }

    log.info('Done!');

    process.exit(0);
}

