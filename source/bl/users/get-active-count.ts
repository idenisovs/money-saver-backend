import moment from 'moment';
import dal from '../../dal';

export function getActiveUsersCount(success: Function, error: Function) {
	const last31days = moment().subtract(31, 'days').valueOf();

	dal.users.getCountByTime(last31days, done);

	function done(err: Error, result: any) {

		if (err) {
			error(err);
		} else {
			success(result);
		}
	}
}