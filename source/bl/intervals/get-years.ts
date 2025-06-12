import dal from '../../dal';
import { User } from '../../shared';

export async function getYears(user: User): Promise<string[]> {
	const intervals = await dal.intervals.getAll(user);

	const years = new Set<string>();

	for (const interval of intervals) {
		const [year] = interval.start.split('-');

		years.add(year);
	}

	return Array.from(years);
}
