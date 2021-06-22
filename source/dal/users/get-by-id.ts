import db from '../db';
import { User } from '../../shared';
import done from '../done';

let sql = '';

sql += 'SELECT id, login, password, email, timezone, language\n';
sql += 'FROM users\n';
sql += 'WHERE id = $id';

export function getById(userId: number): Promise<User> {
    return new Promise((resolve, reject) => {
        const params = {
            $id: userId
        };

        db.get(sql, params, done<User>(resolve, reject));
    });
}