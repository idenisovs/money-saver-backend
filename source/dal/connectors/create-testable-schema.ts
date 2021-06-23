/**
 * This module executes SQL scripts, which creates
 * the schemas in testable database.
 *
 * Please, note, that testable user's login is "user1"
 * and password is "demo1"
 */
import bcrypt from 'bcrypt';
import log4js from 'log4js';
import { Database } from 'sqlite3';

const log = log4js.getLogger('db');

log.debug('Generating hashes!');

const hash1 = bcrypt.hashSync('demo1', 2);
const hash2 = bcrypt.hashSync('uBRrv7kyH', 2);

const sql = {
	users: 'CREATE TABLE users ( id INTEGER PRIMARY KEY ON CONFLICT ROLLBACK AUTOINCREMENT UNIQUE ON CONFLICT ROLLBACK, login TEXT UNIQUE ON CONFLICT ROLLBACK NOT NULL ON CONFLICT ROLLBACK, password TEXT NOT NULL ON CONFLICT ROLLBACK, email TEXT, timezone NUMERIC NOT NULL ON CONFLICT ROLLBACK DEFAULT (0), language NUMERIC DEFAULT en NOT NULL ON CONFLICT ROLLBACK, last DATE DEFAULT 0);',
	intervals: 'CREATE TABLE intervals (id INTEGER PRIMARY KEY AUTOINCREMENT, start DATE NOT NULL ON CONFLICT ROLLBACK, "end" DATE NOT NULL ON CONFLICT ROLLBACK, sum DOUBLE DEFAULT (0), userId TEXT REFERENCES users (id) ON DELETE CASCADE NOT NULL ON CONFLICT ROLLBACK, latest BOOLEAN DEFAULT 0);',
	payments: 'CREATE TABLE payments (id INTEGER UNIQUE PRIMARY KEY ON CONFLICT ROLLBACK AUTOINCREMENT, time DATETIME NOT NULL ON CONFLICT ROLLBACK DEFAULT (strftime(\'%s\', \'now\') * 1000), date DATE DEFAULT (strftime(\'%Y-%m-%d\', \'now\')), sum DECIMAL NOT NULL ON CONFLICT ROLLBACK, userId TEXT REFERENCES users (id) ON DELETE CASCADE NOT NULL ON CONFLICT ROLLBACK);',
	createUser: 'INSERT INTO users (login, password, email, timezone, language) ' +
		'VALUES ' +
		'(\'user1\', \'' + hash1 + '\', \'abc@def.com\', 41, \'ru\'),' +
		'(\'user2\', \'' + hash2 + '\', \'qwe@rty.com\', 42, \'ru\')'
};

export default function createTestableSchema(db: Database): Promise<void> {
    return new Promise((resolve) => {
        log.debug('Creating schemas...');

        db.serialize(executeSQL);

        function executeSQL() {
            db.run(sql.users, check);
            db.run(sql.intervals, check);
            db.run(sql.payments, check);
            db.run(sql.createUser, done)
        }

        function check(err: Error) {
            if (err) {
                log.error(err);
                process.exit(1);
            }
        }

        function done(err: Error) {
            check(err);

            log.debug('Schemas created!');

            resolve();
        }
    });
}