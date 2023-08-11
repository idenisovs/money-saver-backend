import log4js from 'log4js';
import sqlite3 from 'sqlite3';

import argv from '../support/argv';
import * as connectors from './connectors';

const log = log4js.getLogger('db');

export default function determineConnector(): sqlite3.Database {
	const databaseType = argv.testable ? 'testable' : 'sqlite';

	log.debug('Determined database type: %s!', databaseType);

	switch (databaseType) {
		case 'testable':
			log.debug('Switching to testable connector!');
			return connectors.testable();
		default:
			log.debug('Switching to default (SQLite3) connector!');
			return connectors.sqlite;
	}
}
