import log4js from 'log4js';
import sqlite3 from 'sqlite3';
import argv from '../support/argv';
import testableConnector from './connectors/testable';
import sqliteConnector from './connectors/sqlite';
import exitHandler from './connectors/sqlite-exit-handler';

const log = log4js.getLogger('db');

const databaseType = argv.testable ? 'testable' : 'sqlite';

log.debug('Determined database type: %s!', databaseType);

let connector: sqlite3.Database;

switch (databaseType) {
    case 'testable':
        log.debug('Switching to testable connector!');
        connector = testableConnector();
        break;
    default:
        log.debug('Switching to default (SQLite3) connector!');
        connector = sqliteConnector;
}

process.on('exit', exitHandler(connector));
process.on('SIGINT', exitHandler(connector));

export default connector;

