import { Interval } from '../../../shared';
import { getDateStr } from '../../../shared/utils';

export default function makeInterlaceErrorMessage(intervalRequest: Interval, latestInterval: Interval) {
	const newInt = getDateStr(intervalRequest.start);
	const latInt = getDateStr(latestInterval.start);
	return `New interval ${newInt} should not be set before latest ${latInt}`;
}
