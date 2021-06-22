import moment from 'moment';
import dal from '../../dal';
import { User } from '../../shared';

export async function getYears(user: User): Promise<number[]> {
    const intervals = await dal.intervals.getAll(user);

    const years = new Set<number>();

    for (let interval of intervals) {
        years.add(moment(interval.start).year());
    }

    return Array.from(years);
}