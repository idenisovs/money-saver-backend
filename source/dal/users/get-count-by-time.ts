import db from '../db';
import done from '../done';

const sql = 'SELECT count(id) AS count FROM users WHERE last >= $timestamp';

export default function getUsersCountByTime(timestamp: number): Promise<{ count: number }> {
	return new Promise((resolve, reject) => {
		const params = { $timestamp: timestamp };

		db.get(sql, params, done<{ count: number }>(resolve, reject));
	});
}
