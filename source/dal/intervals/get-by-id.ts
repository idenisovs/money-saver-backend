import log4js from 'log4js';
import db from '../db';
import { Interval, User } from '../../shared';
import done from '../done';
import IntervalRecord from './interval-record';
import intervalMapper from './interval-mapper';

const log = log4js.getLogger('intervals');

const sql = 'SELECT id, start, end, sum, latest FROM intervals WHERE id = $id AND userId = $userId';

export async function getById(intervalId: number, user: User): Promise<Interval> {
	log.debug('Retrieving from database interval <%d> for user <%d>!', intervalId, user.id);

	return new Promise((resolve, reject) => {
		const params = {
			$id: intervalId,
			$userId: user.id,
		};

		db.get(sql, params, done<IntervalRecord, Interval>(resolve, reject, intervalMapper));
	});
}
