import { timezones } from './timezones';
import { Timezone } from '../../shared';

export function getTzById(id: number): Timezone | undefined {
	return timezones.find((tz) => tz.timeZoneId === id);
}
