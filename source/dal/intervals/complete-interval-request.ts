import IntervalRecord from './interval-record';
import intervalMapper from './interval-mapper';

export default function completeIntervalRequest(resolve: Function, reject: Function) {
	return (err: Error, result: IntervalRecord|IntervalRecord[]) => {
		if (err) {
			return reject(err);
		}

		if (Array.isArray(result)) {
			resolve(result.map(intervalMapper));
		} else {
			resolve(intervalMapper(result));
		}
	}
}