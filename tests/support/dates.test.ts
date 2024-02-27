import { getTimezoneOffset, getDateStr, startOfDay } from '../../source/shared/utils';
import { HOUR } from '../../source/shared/constants';

describe('getDateStr', () => {
	it('returns correct string', () => {
		const d1 = new Date('2024-02-03T12:12:12.999Z');

		const result = getDateStr(d1);

		expect(result).toBe('2024-02-03');
	});
});

describe('findTimezoneOffset', () => {
	it('should be 2 hours in Riga during the Winter time', () => {
		const date = new Date('2021-01-23T12:23:34+02:00');
		const offset = getTimezoneOffset(date, 'Europe/Riga');
		expect(offset/HOUR).toBe(2);
	});

	it('should be 3 hours in Riga during the Summer time', () => {
		const date = new Date('2021-06-23T12:23:34+02:00');
		const offset = getTimezoneOffset(date, 'Europe/Riga');
		expect(offset/HOUR).toBe(3);
	});
});

describe('startOfDay', () => {
	it('should calculate the proper start of day in Riga in Winter', () => {
		const theWinterDayInRiga = new Date('2024-02-27T15:55:55.123+02:00');

		const startOfDayInRigaInUTC = startOfDay(theWinterDayInRiga, 'Europe/Riga');

		expect(startOfDayInRigaInUTC.toISOString()).toBe('2024-02-26T22:00:00.000Z');
	});

	it('should calculate the proper start of day in Los Angeles in Summer', () => {
		const theSummerDayInLA = new Date('2023-06-30T15:55:55.123+02:00');

		const startOfDayInRigaInUTC = startOfDay(theSummerDayInLA, 'America/Los_Angeles');

		expect(startOfDayInRigaInUTC.toISOString()).toBe('2023-06-30T07:00:00.000Z');
	});
});