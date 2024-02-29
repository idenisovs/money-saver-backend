import db from '../db';
import done from '../done';

const sql = 'SELECT count(id) AS count FROM users WHERE last >= $last31dayDate';

export default function getUsersCountByTime(last31dayDate: Date): Promise<{ count: number }> {
	return new Promise((resolve, reject) => {
		const params = {
			$last31dayDate: last31dayDate.toISOString()
		};

		db.get(sql, params, done<{ count: number }>(resolve, reject));
	});
}
