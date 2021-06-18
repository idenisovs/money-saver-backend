import { format } from 'util';
import getDate from './get-date';
import { Interval } from '../../../shared';

const interlaceError = 'New interval should not be set (%s) before latest (%s)!';

export default function makeInterlaceErrorMessage(intervalRequest: Interval, latestInterval: Interval) {
	const newInt = getDate(intervalRequest.start as number);
	const latInt = getDate(latestInterval.start as number);

	return format(interlaceError, newInt, latInt);
}