import { Interval } from '../../../shared';

export default function makeInterlaceErrorMessage(intervalRequest: Interval, latestInterval: Interval) {
	const newInt = intervalRequest.start;
	const latInt = latestInterval.start;
	return `New interval ${newInt} should not be set before latest ${latInt}`;
}
