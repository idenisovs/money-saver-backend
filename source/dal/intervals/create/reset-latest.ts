import log4js from 'log4js';
import db from '../../db';
import done from '../../done';

const log = log4js.getLogger('create-interval');

export default function resetLatestInterval(userId: number): Promise<void> {
	return new Promise((resolve, reject) => {
		log.debug('Resetting latest field!');

		const sql = 'UPDATE intervals SET latest = 0 WHERE userId = $userId';

		const params = {
			$userId: userId,
		};

		db.run(sql, params, done(resolve, reject));
	});
}
