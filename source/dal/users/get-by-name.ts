import log4js from 'log4js';
import db from '../db';
import { User } from '../../shared';
import done from '../done';

const log = log4js.getLogger('get-user-by-name');

let sql = '';

sql += 'SELECT id, login, password, email, timezone, language\n';
sql += 'FROM users\n';
sql += 'WHERE login = $username';

export function getUserByName(username: string): Promise<User> {
    return new Promise((resolve, reject) => {
        log.debug('Requesting user %s...', username);

        const params = { $username: username };

        db.get(sql, params, done<User>(resolve, reject));
    });
}