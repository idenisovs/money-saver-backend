import IntervalRecord from './interval-record';
import { Interval } from '../../shared';

export default function intervalMapper(record: IntervalRecord): Interval {
	return new Interval({
		...record,
		start: new Date(record.start),
		end: new Date(record.end),
		latest: (record.latest === 1),
	});
}
