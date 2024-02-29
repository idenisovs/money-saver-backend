import dal from '../../dal';
import { DAY } from '../../shared/constants';

export async function getActiveUsersCount(): Promise<number> {
	const last31days = new Date(Date.now() - DAY * 31);

	const result = await dal.users.getCountByTime(last31days);

	return result.count;
}
