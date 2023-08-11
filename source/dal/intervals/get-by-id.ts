import db from '../db';
import { Interval, User } from '../../shared';
import done from '../done';
import IntervalRecord from './interval-record';
import intervalMapper from './interval-mapper';

const sql = 'SELECT id, start, end, sum, latest FROM intervals WHERE id = $id AND userId = $userId';

export async function getById(intervalId: number, user: User): Promise<Interval> {
	return new Promise((resolve, reject) => {
		const params = {
			$id: intervalId,
			$userId: user.id,
		};

		db.get(sql, params, done<IntervalRecord, Interval>(resolve, reject, intervalMapper));
	});
}
