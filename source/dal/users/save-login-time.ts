import { User } from '../../shared';
import done from '../done';

const db = require('../db').default;

const sql = 'UPDATE users SET last = strftime("%s") * 1000 WHERE id = $userId';

export function saveLoginTime(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
        const params = {
            $userId: user.id
        };

        db.run(sql, params, done(resolve, reject));
    });
}