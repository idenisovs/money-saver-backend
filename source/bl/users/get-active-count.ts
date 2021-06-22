import moment from 'moment';
import dal from '../../dal';

export async function getActiveUsersCount(): Promise<number> {
	const last31days = moment().subtract(31, 'days').valueOf();

	const result = await dal.users.getCountByTime(last31days);

	return result.count;

}