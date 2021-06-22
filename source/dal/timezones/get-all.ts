import { timezones } from './timezones';
import { Timezone } from '../../shared';

export function getAllTimezones(): Timezone[] {
	return [ ...timezones ];
}