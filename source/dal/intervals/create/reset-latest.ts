import log4js from 'log4js';
import db from '../../db';

const log = log4js.getLogger('create-interval');

export default function resetLatestInterval(userId: number): Promise<void> {
	return new Promise((resolve, reject) => {
		log.debug('Resetting latest field!');

		const sql = 'UPDATE intervals SET latest = 0 WHERE userId = $userId';

		const params = { $userId: userId };

		db.run(sql, params, (err: Error) => {
			if (err) {
				log.error(err);
				reject(err)
			} else {
				log.debug('Reset done!');
				resolve();
			}
		});
	})
}