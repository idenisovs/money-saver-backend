import dal from '../../dal';
import { User } from '../../shared';

export async function getYears(user: User): Promise<number[]> {
	const intervals = await dal.intervals.getAll(user);

	const years = new Set<number>();

	for (const interval of intervals) {
		years.add(interval.start.getFullYear());
	}

	return Array.from(years);
}
