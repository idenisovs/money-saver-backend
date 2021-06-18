import dal from '../../dal';
import { Interval } from '../../shared';

export default function getByTime(intervalRequest: any, success: Function, error: Function) {
	dal.intervals.getByTime(intervalRequest, done);

	function done(err: Error, interval: Interval) {
		if (err) {
			return error(err);
		}

		success(interval);
	}
}