import { DateTime } from 'luxon';

export default function getCurrentDay(date: string, zone = 'Europe/Riga'): number {
	const start = DateTime.fromISO(date, { zone });
	const now = DateTime.local().setZone(zone);
	const days = now.diff(start, 'days').days;
	return Math.ceil(days);
}