import IntervalRecord from './interval-record';
import { Interval } from '../../shared';

export default function intervalMapper(record: IntervalRecord): Interval {
	return new Interval({
		...record,
		latest: (record.latest === 1),
	});
}
