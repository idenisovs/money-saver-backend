import log4js from 'log4js';
import sqlite3 from 'sqlite3';

const log = log4js.getLogger('db');

export default function exitHandler(connector: sqlite3.Database) {
    return function handler() {
        process.removeListener('exit', handler);
        process.removeListener('SIGINT', handler);

        log.info('Closing database...');

        connector.close(closeDone);
    }

    function closeDone(err: Error|null) {
        if (err) {
            log.error(err);
        }

        log.info('Done!');

        process.exit(0);
    }
}


