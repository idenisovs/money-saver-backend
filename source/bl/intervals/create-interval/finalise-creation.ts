import log4js from 'log4js';
import { Interval, User } from '../../../shared';
import dal from '../../../dal';

const log = log4js.getLogger('create-interval');

export default async function finaliseCreate(interval: Interval, user: User): Promise<Interval> {
	const intervalId = await dal.intervals.create(interval, user);

	interval.id = intervalId!;

	log.debug('Interval successfully saved under %d id!', interval.id);

	return interval;
}