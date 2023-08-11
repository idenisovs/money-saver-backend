import { Database } from 'sqlite3';
import log4js from 'log4js';

const log = log4js.getLogger('db');

export default function enableForeignKeys(db: Database): Promise<void> {
	return new Promise(((resolve) => {
		db.run('PRAGMA foreign_keys = ON', (err: Error) => {
			if (err) {
				log.error(err);
			}

			log.debug('Foreign key support shall be enabled now!\n');

			resolve();
		});
	}));
}
