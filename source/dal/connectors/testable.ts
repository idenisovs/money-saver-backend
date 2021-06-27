import log4js from 'log4js';
import sqlite3, { Database } from 'sqlite3';
import createTestableSchema from './create-testable-schema';
import enableForeignKeys from './enable-foreign-keys';

const log = log4js.getLogger('db');

export default function launchTestableDatabase(): Database {
    log.warn('Launching testable database!');

    const db = new sqlite3.Database(':memory:');

    createTestableSchema(db).then(() => enableForeignKeys(db));

    return db;
}